import axios from 'axios';
const SERVER = '/carregamentos';

function getTableOptions (url) {
  return axios.get(`${SERVER}/tableOptions`);
}

function getInsertOptions (id, url) {
  return axios.get(`${SERVER}/insertOptions`, { params: {id: id} });
}

function importXLSX (params, data) {
  return axios({
    url: `${SERVER}/importXLSX`,
    method: 'post',
    data: data,
    params: params
  });
}

export {
  getTableOptions,
  getInsertOptions,
  importXLSX
};
