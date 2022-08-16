#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const axios = require('axios').default;
const posts = require('../src/app/news/news.json');
const routes = ['', 'news', 'sponsors', 'sponsors/options', 'sponsors/contact-us', 'contact-us', 'programs/minecraft', 'programs/fll/explore', 'programs/fll/challenge', 'programs/ftc', 'programs/frc'];
const sitemap = [...routes, ...posts.map(post => `news/${post.title.split(' ').join('-')}`)];
const oldSitemap = fs.readFileSync(path.join(__dirname, '../src/assets/sitemap.xml'), 'utf8');
const newSitemap =
  `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemap.map(route =>
    `<url>
        <loc>https://4h-botsmiths.github.io/wesbite/${route}</loc>
      </url>`).join('\n')}
    </urlset>`;
if (oldSitemap !== newSitemap) {
  fs.writeFileSync(path.join(__dirname, '../src/assets/sitemap.xml'), newSitemap);
  axios.get('https://www.bing.com/ping?sitemap=https://4h-botsmiths.github.io/wesbite/assets/sitemap.xml');
  axios.get('https://www.google.com/ping?sitemap=https://4h-botsmiths.github.io/wesbite/assets/sitemap.xml');
  process.exit();
}
process.exit(1);
