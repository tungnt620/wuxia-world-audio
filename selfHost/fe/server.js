const express = require('express')
const next = require('next')
const LRUCache = require('lru-cache')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// NOTE: Our's cache will remove when have new deploy

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 1000 * 1024 * 1024, /* cache size will be 1000 MB using `return n.length` as length() function */
  length: function (n, key) {
    return n.length
  },
  maxAge: 1000 * 60 * 60 * 24 * 30
})

app.prepare()
  .then(() => {
    const server = express()
    // For robots.txt, sitemap.xml file
    server.use(express.static('static/rootFiles'))

    server.get('/', (req, res) => {
      return renderAndCache(req, res, '/home')
    })

    server.get('/sach/:IDAndSlug/', (req, res) => {
      return renderAndCache(req, res, '/book', req.params)
    })

    server.get('/the-loai/:IDAndSlug/', (req, res) => {
      return renderAndCache(req, res, '/cat', req.params)
    })

    // server.get('/the-loai/:slug/', (req, res) => {
    //   return renderAndCache(req, res, '/cat', { slug: req.params.slug })
    // })
    //
    // server.get('/:slug/', (req, res) => {
    //   return renderAndCache(req, res, '/story', { slug: req.params.slug })
    // })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3003, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3003')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey (req) {
  return `${req.path}`
}

async function renderAndCache (req, res, path, query) {
  if (dev) {
    const html = await app.renderToHTML(req, res, path, query)

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html)
      return
    }

    res.send(html)
    return
  }

  const key = getCacheKey(req)

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    //console.log(`serving from cache ${key}`);
    res.setHeader('x-cache', 'HIT')
    res.send(ssrCache.get(key))
    return
  }

  try {
    const html = await app.renderToHTML(req, res, path, query)

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html)
      return
    }

    // Let's cache this page
    ssrCache.set(key, html)

    res.setHeader('x-cache', 'MISS')
    res.send(html)
  } catch (err) {
    await app.renderError(err, req, res, req.path, req.query)
  }
}
