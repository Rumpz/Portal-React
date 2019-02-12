import axios from 'axios';
const SERVER = '/reporting';

function fetchReports (url) {
  return axios.get(`${SERVER}/all`);
}

function byCategory (data) {
  return axios.get(`${SERVER}/byCategory`, {params: {category: data}});
}

function getReport (data) {
  return axios.get(`${SERVER}/getReport`, {params: {id: data}});
}

function getByfilter (data) {
  return axios.get(`${SERVER}/byFilter`, {params: {filters: data}});
}

export {
  fetchReports,
  byCategory,
  getReport,
  getByfilter
};
