import axios from 'axios';
const SERVER = 'http://wdt20731:8080/dump/columns';

function getOptions () {
  return axios.get(`${SERVER}/options`);
}

function columnsByID (data) {
  return axios.get(`${SERVER}/columnsByID`, {params: {id: data}});
}

function exportXLS (data) {
  let url = `${SERVER}/exportXLS`;
  return axios({
    url: url,
    type: 'get',
    params: data
  });
}

export {
  exportXLS,
  getOptions,
  columnsByID
};
