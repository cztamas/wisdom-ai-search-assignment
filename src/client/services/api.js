import axios from 'axios';
import config from './config';

export const search = async searchTerm => {
  const { data: searchResult } = await axios.get(
    `${config.apiUrl}/search?searchTerm=${searchTerm}`
  );
  return searchResult;
};

export const click = async ({ title, type }) => {
  await axios.post(`${config.apiUrl}/click`, { title, type });
};
