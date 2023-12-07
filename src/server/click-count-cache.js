'use strict';

exports.createCache = () => {
  const clickCounts = new Map();
  const getCount = key => clickCounts.get(key) || 0;

  return {
    getCount,
    incrementCount: key => {
      clickCounts.set(key, getCount(key) + 1);
    },
  };
};
