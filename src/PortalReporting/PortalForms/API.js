import axios from 'axios';
import qs from 'qs';

const SERVER = '/forms';

function getOptions () {
  return axios.get(`${SERVER}/options`);
}

function getformByID (id) {
  return axios.get(`${SERVER}/formByGroupID`, { params: { id: id } });
}

function getForm (params) {
  return axios.get(`${SERVER}/getForm`, {
    params: {
      ...params
    },
    paramsSerializer: function (params) {
      return qs.stringify(params, { indices: false });
    }
  });
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
