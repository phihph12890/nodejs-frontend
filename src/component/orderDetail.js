import orderAPI from '../api/orderAPI';
import { parseRequestUrl, $$, prices, clickLogout, addToCart, getTotalItemOnCart, reRender, onLoadCartNumber, onLoadListCart, productSearch, isAuthenticated } from "../utils";
import toast from 'toast-me';

const orderDetail = {
    async render() {
        const { id } = parseRequestUrl();
        const { data: order } = await orderAPI.get(id);
        console.log(order);
        const personalIn4 = () => {
            return `
                <h4 class="text-center text-2xl font-semibold border-b py-2">Thông tin người mua hàng</h4>
                <div class="px-4 mt-4">
                    <div class="">
                        <p class="mt-3"><span class="font-semibold">Họ và tên:</span> <span>${order.name}</span></p>
                        <p class="mt-3"><span class="font-semibold">Địa chỉ:</span> <span>${order.address}</span></p>
                        <p class="mt-3"><span class="font-semibold">SDT:</span> <span>${order.phoneNumber}</span></p>
                        <p class="mt-3"><span class="font-semibold">Email:</span> <span>${order.email}</span></p>
                        <p class="mt-3"><span class="font-semibold">Ngày đặt:</span> <span>${order.create_at}</span></p>
                        <p class="mt-3"><span class="font-semibold">Số sản phẩm:</span> <span>${order.cartNumber}</span></p>
                        <p class="mt-3"><span class="font-semibold">Tổng tiền:</span> <span>${prices(order.totalPrice).replace('VND', 'Đ')}</span></p>
                        <p class="mt-3"><span class="font-semibold">Trạng thái:</span> <span>${order.status}</span></p>
                        <p class="mt-3"><span class="font-semibold">Ghi chú: </span> ${order.note}</p>
                    </div>
                </div>
            `
        }
        const productIn4 = () => {
            const result = order.cart.map((item, index) => {
                return `
                    <tr class="text-center">
                        <td>${index + 1}</td>
                        <td class=" grid grid-cols-4">
                            <img class="col-span-1" src="${item.image}" alt="" width="90">
                            <p class="col-span-3">${item.name}</p>
                        </td>   
                        <td><span class="cart_price_show">${prices(Number(item.price)).replace('VND', 'Đ')}</span><span class="cart_price hidden">${Number(item.price)}</span></td>
                        <td>${item.quantity}</td>
                        <td><span class="cart_cost_show">${prices(Number(item.price) * Number(item.quantity)).replace('VND', 'Đ')}</span><span class="cart_cost hidden ">${Number(item.price) * Number(item.quantity)}</span></td>
                    </tr>
                `
            }).join('');
            return `
                <tbody id="showListOrder">
                        ${result}
                </tbody>
            `
        }
        return `
            <div class="grid grid-cols-6 gap-5" >
                <div class="col-span-2 text-left  ">
                    ${personalIn4()}
                </div>
                <div class="col-span-4 ">
                    <h4 class="text-center text-2xl font-semibold py-2">Thông tin sản phẩm</h4>
                    <table class="mx-auto text-center table table-hover">
                        <thead>
                            <tr class="text-center">
                                <th style="width: 50px">STT</td>
                                <th style="width: 300px">Tên sản phẩm</td>
                                <th style="width: 150px">Đơn giá</td>
                                <th style="width: 100px">Số lượng</td>
                                <th style="width: 150px">Thành tiền</td>
                            </tr>
                        </thead>
                        ${productIn4()}
                    </table>
                </div>
            </div>
        `
    },
    async afterRender() {
        clickLogout();
    }
}
export default orderDetail;