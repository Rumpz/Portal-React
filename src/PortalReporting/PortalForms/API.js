import axios from 'axios';

const SERVER = '/forms';

function getOptions () {
  return axios.get(`${SERVER}/options`);
}

function getformByID (id) {
  return axios.get(`${SERVER}/formByGroupID`, { params: { id: id } });
}

function getForm (id) {
  return axios.get(`${SERVER}/getForm`, { params: { id: id } });
}

function updateForm (data) {
  return axios.put(`${SERVER}/update`, { data });
}

function refreshTable (data) {
  return axios.get(`${SERVER}/tableRefresh`, { params: data });
}

export {
  getOptions,
  getformByID,
  getForm,
  updateForm,
  refreshTable
};
