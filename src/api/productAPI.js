import { axiosClient } from './axiosClient';

export const productAPI = {
    listLimit() {
        const url = `/products?_page=1&_limit=12`;
        return axiosClient.get(url);
    },
    list() {
        const url = `/products?_expand=category`;
        return axiosClient.get(url);
    },
    read(id) {
        const url = `/products/${id}?_expand=category`;
        return axiosClient.get(url);
    },
    relateProduct(categoryId, id) {
        const url = `/products?categoryId=${categoryId}&id_ne=${id}&_limit=4`;
        return axiosClient.get(url);
    },
    add(product) {
        const url = `/products`;
        return axiosClient.post(url, product);
    },
    update(id, data) {
        const url = `/products/${id}`;
        return axiosClient.put(url, data);
    },
    remove(id) {
        const url = `/products/${id}`;
        return axiosClient.delete(url);
    },
    search(textSearch) {
        const url = `/products?name_like=${textSearch}`;
        return axiosClient.get(url);
    },
    filterPrice(price1, price2) {
        const url = `/products?priceSale_gte=${price1}&priceSale_lte=${price2}`;
        return axiosClient.get(url);
    },
    sortPrice(level) {
        const url = `/products?_sort=priceSale&_order=${level}`;
        return axiosClient.get(url);
    },

}
export default productAPI;