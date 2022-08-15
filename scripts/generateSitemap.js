#!/usr/bin/env node
//@ts-check
const fs = require('fs');
const path = require('path');

const posts = require('../src/app/news/news.json');
const routes = ['home', 'news', 'sponsors', 'contact-us', 'programs/minecraft', 'programs/fll/explore', 'programs/fll/challenge', 'programs/ftc', 'programs/frc'];

const sitemap = [...routes, ...posts.map(post => `news/${post.title.split(' ').join('-')}`)];

fs.writeFileSync(path.join(__dirname, '../src/assets/sitemap.xml'), sitemap.map(route => `https://4h-botsmiths.github.io/wesbite/${route}`).join('\n'));
