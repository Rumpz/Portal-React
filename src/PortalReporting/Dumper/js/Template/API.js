import axios from 'axios';
const mainUrl = '/templates';

function findOptions (data) {
  let url = `${mainUrl}/all`;
  return axios.get(url, {params: data});
}

function newTemplate (data) {
  let url = `${mainUrl}`;
  return axios.post(url, data);
}

function updateTemplate (data) {
  let url = `${mainUrl}/${data.id}`;
  return axios.put(url, data);
}

function deleteTemplate (id) {
  let url = `${mainUrl}/${id}`;
  return axios.delete(url);
}

export {
  findOptions,
  newTemplate,
  updateTemplate,
  deleteTemplate
};
