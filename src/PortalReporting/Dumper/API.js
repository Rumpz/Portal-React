import axios from 'axios';
const SERVER = '/dump';

function getOptions () {
  return axios.get(`${SERVER}/columns/options`);
}

function columnsByID (data) {
  return axios.get(`${SERVER}/columns/columnsByID`, {params: {id: data}});
}

function exportXLS (data) {
  let url = `${SERVER}/columns/exportXLS`;
  return axios({
    url: url,
    type: 'get',
    params: data,
    responseType: 'arraybuffer'
  });
}

function exportProcedureXLS (data) {
  let url = `${SERVER}/procedure/exportProcedureXLS`;
  return axios({
    url: url,
    type: 'get',
    params: data,
    responseType: 'arraybuffer'
  });
}

export {
  exportXLS,
  getOptions,
  columnsByID,
  exportProcedureXLS
};
