import axios from 'axios';
const API_URL = 'http://kirbyvaughn.pythonanywhere.com/'; /* 'http://localhost:8000' http://127.0.0.1:8000/ or  'https://movies-groyce.pythonanywhere.com/'*/

export class APIService {
  constructor() {

  }

  getCustomer(param_pk) {
    const url = `${API_URL}/api/customers/${param_pk}`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::"+jwtToken);
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: {Authorization: `jwt ${jwtToken}`}});
  }

  getCustomerList() {
    const url = `${API_URL}/api/customers/`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::"+jwtToken);
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: headers});

  }

  addNewCustomer(customer){
    const url = `${API_URL}/api/customers/`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.post(url, customer, {headers: headers});
  }

  update(customer){
    const url = `${API_URL}/api/customers/${customer.pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.put(url,customer, {headers: headers});
  }

  deleteCustomer(customer_Pk){
    const url = `${API_URL}/api/customers/${customer_Pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.delete(url, {headers: headers});
  }

  authenticateLogin(credentials) {
    const url = `${API_URL}/auth/`;
    return axios.post(url, credentials);
  }
}
