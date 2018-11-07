import axios from 'axios';
const SERVER = '/dump/columns';
const DUMPER = 'http://wdt20731:7000/dump/columns';

function getOptions () {
  return axios.get(`${SERVER}/options`);
}

function columnsByID (data) {
  return axios.get(`${SERVER}/columnsByID`, {params: {id: data}});
}

function exportXLS (data) {
  let url = `${DUMPER}/exportXLS`;
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
  columnsByID
};
