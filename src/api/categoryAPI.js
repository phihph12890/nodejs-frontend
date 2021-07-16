import { axiosClient } from './axiosClient';

export const categoryAPI = {
    list() {
        const url = `/categories`;
        return axiosClient.get(url);
    },
    read(id) {
        const url = `/categories/${id}`;
        return axiosClient.get(url);
    },
    listEdit(id) {
        const url = `/categories?id_ne=${id}`;
        return axiosClient.get(url);
    },
    add(category) {
        const url = `/categories`;
        return axiosClient.post(url, category);
    },
    update(id, data) {
        const url = `/categories/${id}`;
        return axiosClient.put(url, data);
    },
    remove(id) {
        const url = `/categories/${id}`;
        return axiosClient.delete(url);
    }
}
export default categoryAPI;