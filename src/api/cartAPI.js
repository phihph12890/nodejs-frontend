import { axiosClient } from './axiosClient';

export const cartAPI = {
    list() {
        const url = `/carts`;
        return axiosClient.get(url);
    },
    read(id) {
        const url = `/carts/${id}`;
        return axiosClient.get(url);
    },
    add(cart) {
        const url = `/carts`;
        return axiosClient.post(url, cart);
    },
    update(id, data) {
        const url = `/carts/${id}`;
        return axiosClient.put(url, data);
    },
    remove(id) {
        const url = `/carts/${id}`;
        return axiosClient.delete(url);
    }
}
export default cartAPI;