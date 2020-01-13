const slugify = require('slugify')

exports.getSlugFromString = (str, needAddRandomNumber=false) => {
  return slugify(str)
}
