#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const axios = require('axios').default;
/** Remove the first two irrelevant arguments */
const myArgs = process.argv.slice(2);
/** Ensure that all arguments are present */
if (myArgs.length < 2) {
  console.log('Usage: <image url> <sub folder> [image name] [image description]');
  process.exit(1);
}

/**
 * download a file from {@link fileUrl} to {@link downloadFolder}
 * @param {string} fileUrl the link to download
 * @param {string} downloadFolder the folder to save the images in
 */
const downloadFile = async (/** @type {string} */ fileUrl, /** @type {string} */ downloadFolder) => {
  /** The image name to save the file under */
  const fileName = path.basename(fileUrl.split('?')[0]);
  /** The path to save the image in */
  const localFilePath = path.resolve(__dirname, '../src/assets/images', downloadFolder, fileName);
  try {
    /** The link response to pipe */
    const response = await axios({
      method: 'GET',
      url: fileUrl,
      responseType: 'stream',
    });
    /** The writer to save the image */
    const w = response.data.pipe(fs.createWriteStream(localFilePath));
    w.on('finish', () => {
      console.log('Successfully downloaded file');
      /** The map to update */
      const map = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/assets/images', downloadFolder, 'map.json'), 'utf-8'));
      /** The entry to add to {@link map} */
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
/**
 * copy a file from {@link fileDir} to {@link downloadFolder}
 * @param {string} fileDir the link to download
 * @param {string} downloadFolder the folder to save the images in
 */
const copyFile = async (/** @type {string} */ fileDir, /** @type {string} */ downloadFolder) => {
  /** The image name to save the file under */
  const fileName = path.basename(fileDir);
  /** The path to save the image in */
  const localFilePath = path.resolve(__dirname, '../src/assets/images', downloadFolder, fileName);
  try {
    fs.copyFileSync(fileDir, localFilePath);
    console.log('Successfully copied file');
    /** The map to update */
    const map = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/assets/images', downloadFolder, 'map.json'), 'utf-8'));
    /** The entry to add to {@link map} */
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
if (myArgs[0].includes('://')) {
  downloadFile(myArgs[0], myArgs[1]);
} else {
  copyFile(myArgs[0], myArgs[1]);
}
