import axios from 'axios';
const SERVER = '/listagens';

function getAvailables () {
  return axios.get(`${SERVER}/getAvailables`);
}

function getOptions (data) {
  return axios.get(`${SERVER}/getOptions`, {params: {id: data}});
}

function uploadFile (params, data) {
  return axios({
    url: `${SERVER}/upload`,
    method: 'post',
    data: data,
    params: params
  });
}

function exportXLS (data) {
  let url = `${SERVER}/exportXLS`;
  return axios({
    url: url,
    type: 'get',
    params: data,
    responseType: 'arraybuffer'
  });
}

export {
  getAvailables,
  getOptions,
  uploadFile,
  exportXLS
};
