const slugify = require('slugify')

exports.getIDFromSlug =(slug = '') => {
  const match = slug.match(/([0-9]+)-(.+)/i)
  if (match && match.length > 2) {
    return [parseInt(match[1]), match[2]]
  }

  return []
}

exports.getSlugFromString = (str = '') => {
  return slugify(str.toLowerCase())
}
