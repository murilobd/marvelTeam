import axios from 'axios';
import md5 from 'md5';
import { API_URL, PUBLIC_KEY, PRIVATE_KEY } from '@/common/config';

function getHash(ts) {
  return md5(`${ts}${PRIVATE_KEY}${PUBLIC_KEY}`).toLowerCase();
}

function getParams() {
  const ts = new Date() * 1;
  const hash = getHash(ts);
  return `ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
}

const ApiService = {
  getCharacters() {
    return axios.get(`${API_URL}characters?${getParams()}&limit=100`);
  },
  getCharacter(id) {
    return axios.get(`${API_URL}character/${id}?${getParams()}`);
  },
};

export default ApiService;
