'use strict';

const path = require('path');
const { readdir, readFile } = require('fs').promises;
const { flatten, last, partition } = require('lodash');
const { map: mapWithConcurrencyLimit } = require('bluebird');

const dataFolderPath = path.join(__dirname, '../../../data');

let fileCacheEntries = [];

const getFilesInFolder = async folderPath => {
  const allItems = await readdir(folderPath, { withFileTypes: true });
  const items = allItems.filter(item => !item.name.startsWith('.'));

  const [folders, files] = partition(items, item => item.isDirectory());

  const filesFromFolders = flatten(
    await Promise.all(folders.map(folder => getFilesInFolder(`${folder.path}/${folder.name}`)))
  );

  return [...files.map(file => `${file.path}/${file.name}`), ...filesFromFolders];
};

exports.initializeCache = async () => {
  const fileCache = new Map();
  const filePaths = await getFilesInFolder(dataFolderPath);

  await mapWithConcurrencyLimit(
    filePaths,
    async filePath => {
      const content = await readFile(filePath, 'utf-8');
      const cacheKey = `file_${filePath.replace(dataFolderPath, '')}`;

      fileCache.set(cacheKey, content.toLowerCase());
    },
    { concurrency: 20 }
  );

  fileCacheEntries = Array.from(fileCache.entries());
};

exports.search = async searchTerm => {
  const matchingEntries = fileCacheEntries.filter(([, content]) =>
    content.includes(searchTerm.toLowerCase())
  );

  return matchingEntries.map(([key]) => ({ id: key, title: last(key.split('/')), type: 'file' }));
};
