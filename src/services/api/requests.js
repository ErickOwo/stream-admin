import axios from 'axios';

const options = {
  Headers: {
    accept: '*/*',
    'content-Type': 'aplication/json',
  },
};

const getData = async (url) => {
  const response = await axios(url);
  return response.data;
};

const addObject = async (url, body) => {
  const response = await axios.post(url, body, options);
  return response.data;
};

const putObject = async (url, body) => {
  const response = await axios.put(url, body, options);
  return response.data;
};

const getObject = async (url) => {
  const response = await axios(url);
  return response.data;
};

const deleteObject = async (url) => {
  const response = await axios.delete(url);
  return response.data;
};

module.exports = {
  getData,
  addObject,
  putObject,
  getObject,
  deleteObject,
};
