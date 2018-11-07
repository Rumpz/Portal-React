import axios from 'axios';
const SERVER = '/navbar';

function fetchMenus () {
  return axios.get(`${SERVER}/menus`);
}

export {
  fetchMenus
};
