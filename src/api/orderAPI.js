import { axiosClient } from './axiosClient';

export const orderAPI = {
    list() {
        const url = `/orders`;
        return axiosClient.get(url);
    },
    read(id) {
        const url = `/orders?userId=${id}`;
        return axiosClient.get(url);
    },
    get(id) {
        const url = `/orders/${id}`;
        return axiosClient.get(url);
    },
    add(order) {
        const url = `/orders`;
        return axiosClient.post(url, order);
    },
    update(id, data) {
        const url = `/orders/${id}`;
        return axiosClient.put(url, data);
    },
    remove(id) {
        const url = `/orders/${id}`;
        return axiosClient.delete(url);
    }
}
export default orderAPI;