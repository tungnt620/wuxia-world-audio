const slugify = require("slugify");
const redis = require("redis");

exports.getIDFromSlug = (slug = "") => {
  const match = slug.match(/([0-9]+)-(.+)/i);
  if (match && match.length > 2) {
    return [parseInt(match[1]), match[2]];
  }

  return [];
};

exports.getSlugFromString = (str = "") => {
  return slugify(str.substring(0, 50).toLowerCase());
};

exports.redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});
