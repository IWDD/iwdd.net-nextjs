/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://iwdd.net',
  changefreq: 'weekly',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}
