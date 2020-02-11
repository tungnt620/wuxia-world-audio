const slugify = require('slugify')

exports.getSlugFromString = (str) => {
  return slugify(str)
}
