#!/usr/bin/env node
//@ts-check
const fs = require('fs');
const path = require('path');
const axios = require('axios').default;

const myArgs = process.argv.slice(2);

if (myArgs.length < 2) {
  console.log('Usage: <image url> <sub folder> [image name] [image description]');
  process.exit(1);
}

// fileUrl: the absolute url of the image or video you want to download
// downloadFolder: the path of the downloaded file on your machine
const downloadFile = async (/** @type {string} */ fileUrl, /** @type {string} */ downloadFolder) => {
  // Get the file name
  const fileName = path.basename(fileUrl.split('?')[0]);

  // The path of the downloaded file on our machine
  const localFilePath = path.resolve(__dirname, '../src/assets/images', downloadFolder, fileName);
  try {
    const response = await axios({
      method: 'GET',
      url: fileUrl,
      responseType: 'stream',
    });

    const w = response.data.pipe(fs.createWriteStream(localFilePath));
    w.on('finish', () => {
      console.log('Successfully downloaded file');
      const map = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/assets/images', downloadFolder, 'map.json'), 'utf-8'));
      const mapEntry = { type: 'file', path: fileName };
      if (myArgs[2]) {
        mapEntry.name = myArgs[2];
        if (myArgs[3]) {
          mapEntry.description = myArgs[3];
        }
      }
      map.unshift(mapEntry);
      fs.writeFileSync(path.resolve(__dirname, '../src/assets/images', downloadFolder, 'map.json'), JSON.stringify(map, null, 2));
      console.log('Successfully updated map');
    });
  } catch (err) {
    throw new Error(err);
  }
};
const copyFile = async (/** @type {string} */ fileDir, /** @type {string} */ downloadFolder) => {
  // Get the file name
  const fileName = path.basename(fileDir);

  // The path of the downloaded file on our machine
  const localFilePath = path.resolve(__dirname, '../src/assets/images', downloadFolder, fileName);
  try {
    fs.copyFileSync(fileDir, localFilePath);
    console.log('Successfully copied file');
    const map = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/assets/images', downloadFolder, 'map.json'), 'utf-8'));
    const mapEntry = { type: 'file', path: fileName };
    if (myArgs[2]) {
      mapEntry.name = myArgs[2];
      if (myArgs[3]) {
        mapEntry.description = myArgs[3];
      }
    }
    map.unshift(mapEntry);
    fs.writeFileSync(path.resolve(__dirname, '../src/assets/images', downloadFolder, 'map.json'), JSON.stringify(map, null, 2));
    console.log('Successfully updated map');

  } catch (err) {
    throw new Error(err);
  }
};
//console.log(path.resolve('../src/assets/images/', 'frc', 'image.png'));
if (myArgs[0].includes('://')) {
  downloadFile(myArgs[0], myArgs[1]);
} else {
  copyFile(myArgs[0], myArgs[1]);
}