import axios from 'axios';
import config from './config';

export const search = async (searchTerm, pageIndex = 0) => {
  const { data: searchResult } = await axios.get(
    `${config.apiUrl}/search?searchTerm=${searchTerm}&pageIndex=${pageIndex}`
  );
  return searchResult;
};

export const click = async itemId => {
  await axios.post(`${config.apiUrl}/click`, { itemId });
};
