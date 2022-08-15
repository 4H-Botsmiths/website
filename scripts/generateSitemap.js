#!/usr/bin/env node
//@ts-check
const fs = require('fs');
const path = require('path');

const posts = require('../src/app/news/news.json');
const routes = ['', 'news', 'sponsors', 'sponsors/options', 'sponsors/contact-us', 'contact-us', 'programs/minecraft', 'programs/fll/explore', 'programs/fll/challenge', 'programs/ftc', 'programs/frc'];

const sitemap = [...routes, ...posts.map(post => `news/${post.title.split(' ').join('-')}`)];

fs.writeFileSync(path.join(__dirname, '../src/assets/sitemap.xml'),
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemap.map(route =>
    `<url>
      <loc>https://4h-botsmiths.github.io/wesbite/${route}</loc>
    </url>`).join('\n')}
</urlset>`);
