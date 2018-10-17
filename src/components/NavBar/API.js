import axios from 'axios';
const SERVER = 'http://wdt20731:8080/navbar';

function fetchMenus () {
  return axios.get(`${SERVER}/menus`);
}

export {
  fetchMenus
};
