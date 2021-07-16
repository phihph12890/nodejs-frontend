import { axiosClient } from './axiosClient';
import axios from 'axios';

const authAPI = {
    signup(user) {
        const url = '/signup';
        return axios.post(url, user);
    },
    signin(user) {
        const url = '/signin';
        return axios.post(url, user);
    },
    list() {
        const url = `http://localhost:3001/users`;
        return axios.get(url);
    },
    remove(id) {
        const url = `http://localhost:3001/users/${id}`;
        return axios.delete(url);
    },
    update(id, data) {
        const url = `http://localhost:3001/users/${id}`;
        return axios.put(url, data);
    },
    read(id) {
        console.log(id);
        const url = `http://localhost:3001/users/${id}`;
        return axios.get(url);
    },
}
export default authAPI;