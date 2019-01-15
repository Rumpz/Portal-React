import axios from 'axios';

const SERVER = '/mainpage';

function getGraphic (data) {
  return axios.get(`${SERVER}/graphic`, {params: {page: data}});
}

function getOptions () {
  return axios.get(`${SERVER}/options`);
}

export {
  getGraphic,
  getOptions
};
