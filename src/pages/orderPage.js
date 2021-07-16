import header from '../component/header';
import footer from '../component/footer';
import listShopCart from '../component/listShopCart';
import listOrder from '../component/listOrder';
import authAPI from '../api/auth';
import productAPI from '../api/productAPI';
import categoryAPI from '../api/categoryAPI';
import orderAPI from '../api/orderAPI';
import { parseRequestUrl, $$, clickLogout, addToCart, getTotalItemOnCart, reRender, onLoadCartNumber, onLoadListCart, productSearch, isAuthenticated } from "../utils";
import toast from 'toast-me';

const OrderPage = {
    async render() {
        return `
            ${await header.render()}
            <div class="div-content bg-gray-100 pb-8">
                <div class="content1 mx-auto" style="max-width: 1200px;">
                    <div class="">
                        <h5 class="py-3"><a href="">Trang chủ</a> <i class="fas fa-angle-double-right text-xs px-1"></i> <a href="">Đơn hàng đã đặt</a></h5>
                    </div>
                    <div id="list_order">
                        ${ await listOrder.render()}
                    </div>
                </div>
            </div>
            ${footer.render()}
        `
    },
    async afterRender() {
        clickLogout();
        productSearch();
        return `${await listOrder.afterRender()}`
    }
}
export default OrderPage;