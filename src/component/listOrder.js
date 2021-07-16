import orderAPI from '../api/orderAPI';
import { parseRequestUrl, $$, prices, clickLogout, addToCart, getTotalItemOnCart, reRender, onLoadCartNumber, onLoadListCart, productSearch, isAuthenticated } from "../utils";
import toast from 'toast-me';

const listOrder = {
    async render() {
        const userId = parseInt(isAuthenticated().sub);
        const { data: orders } = await orderAPI.read(userId);
        console.log(orders);
        const result = orders.map((item, index) => {
            return `
                <tr class="text-center">
                    <td>${index + 1}</td>
                    <td><span class="px-2">${item.name}</span></td>   
                    <td><span>${item.phoneNumber}</span></td>
                    <td><span>${prices(item.totalPrice).replace('VND', 'Đ')}</span></td>
                    <td><span>${item.create_at}</span></td>
                    <td><span>${item.status}</span><span class="checkStatus"></span></td>
                    <td>
                        <a href="/#/orderdetail/${item.id}">
                            <button class="text-sm px-2 border border-gray-600 rounded-lg text-white btn btn-primary" data-id="${item.id}">
                                <i class="fas fa-info-circle"></i>
                            </button>
                        </a>
                    </td>
                    <td><div><button class="text-sm px-1 border border-gray-600 rounded-lg text-white btn btn-danger btn-remove" data-id="${item.id}">Del</button></div></td>
                </tr>
            `
        }).join('');
        if (orders.length == 0) {
            return `
                <div class="text-center text-4xl font-semibold pt-32 pb-4">Bạn chưa có đơn hàng nào <i class="far fa-frown"></i></div>
                <div class="text-center mb-32"><a href="/" class="btn btn-primary">Mua ngay</a></div>
            `
        } else {
            return `
            <div>
                <table class="table table-hover">
                    <thead>
                        <tr class="text-center">
                            <th style="width: 50px">STT</td>
                            <th style="width: 300px">Họ và tên</td>
                            <th style="width: 175px">Số điện thoại</td>
                            <th style="width: 175px">Tổng tiền</td>
                            <th style="width: 170px">Ngày đặt hàng</td>
                            <th style="width: 200px">Trạng thái</td>
                            <th colspan="2" style="width: 100px">Tuỳ chọn</td>
                        </tr>
                    </thead>
                    <tbody id="showListOrder">
                        ${result}
                    </tbody>
                </table>
            </div>
        `
        }
    },
    async afterRender() {
        const userId = parseInt(isAuthenticated().sub);
        const { data: orders } = await orderAPI.read(userId);
        console.log(orders);
        const checkStatus = $$(".checkStatus");
        if (checkStatus.length >= 2) {
            for (let i = 0; i < orders.length; i++) {
                if (orders[i].status == "ĐÃ HOÀN THÀNH") {
                    checkStatus[i].innerHTML = ` <i class="text-green-500 text-lg fas fa-check"></i>`;
                } else if (orders[i].status == "ĐÃ DUYỆT") {
                    checkStatus[i].innerHTML = ` <i class=" text-blue-500 text-lg fas fa-smile"></i>`;
                } else {
                    checkStatus[i].innerHTML = ` <i class="text-red-500 text-lg fas fa-frown"></i></i>`;
                }
            }
        } 
        else {
            if (orders.status == "ĐÃ HOÀN THÀNH") {
                checkStatus.innerHTML = ` <i class="text-green-500 text-lg fas fa-check"></i>`;
            } else if (orders.status == "ĐÃ DUYỆT") {
                checkStatus.innerHTML = ` <i class=" text-blue-500 text-lg fas fa-smile"></i>`;
            } else {
                checkStatus.innerHTML = ` <i class="text-red-500 text-lg fas fa-frown"></i></i>`;
            }
        }
        const btns = document.querySelectorAll(".btn-remove");
        console.log(btns);
        btns.forEach(btn => {
            const id = btn.dataset.id
            btn.addEventListener("click", async () => {
                const { data: theOrder } = await orderAPI.get(id);
                if (theOrder.status == "ĐÃ DUYỆT" || theOrder.status == "ĐÃ HOÀN THÀNH") {
                    toast(
                        'Không thể xoá đơn hàng ĐÃ DUYỆT hoặc đơn hàng ĐÃ HOÀN THÀNH!',
                        { duration: 2500 },
                        {
                            // label: 'Confirm',
                            action: () => alert('Cool!'),
                            class: 'my-custom-class', // optional, CSS class name for action button
                        },
                    );
                } else {
                    const Confirm = confirm('Bạn có thật sự muốn xoá?');
                    if (Confirm) {
                        await orderAPI.remove(id);
                        reRender(listOrder, '#list_order');
                        toast(
                            'Xoá thành công!',
                            { duration: 2500 },
                            {
                                // label: 'Confirm',
                                action: () => alert('Cool!'),
                                class: 'my-custom-class', // optional, CSS class name for action button
                            },
                        );
                    }
                }
            })
        })
    }
}
export default listOrder;