'use strict';

const axios = require('axios');
const { flatten, range } = require('lodash');
const { omdbApiKey } = require('./config');

const resultPageSize = 10;

const getResultPage = async (searchTerm, page = 1) => {
  const { data: result } = await axios.get(
    `http://www.omdbapi.com/?apikey=${omdbApiKey}&s=${searchTerm}&page=${page}&type=movie`
  );

  if (result.Response === 'False') {
    if (result.Error === 'Movie not found!') {
      return { results: [], resultCount: 0 };
    } else throw new Error(result.Error);
  }

  return { results: result.Search, resultCount: result.totalResults };
};

exports.search = async searchTerm => {
  const { results: firstPageResults, resultCount } = await getResultPage(searchTerm, 1);

  const totalPageCount = Math.ceil(resultCount / resultPageSize);
  const remainingPages = range(2, totalPageCount + 1);

  const remainingPageResults = await Promise.all(
    remainingPages.map(async pageIndex => {
      const { results } = await getResultPage(searchTerm, pageIndex);
      return results;
    })
  );

  const results = [...firstPageResults, ...flatten(remainingPageResults)];
  return results.map(item => ({ title: item.Title, type: 'movie' }));
};
