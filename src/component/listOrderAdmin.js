import orderAPI from '../api/orderAPI';
import { parseRequestUrl, $$, prices, clickLogout, addToCart, getTotalItemOnCart, reRender, onLoadCartNumber, onLoadListCart, productSearch, isAuthenticated } from "../utils";
import toast from 'toast-me';

const listOrderAdmin = {
    async render() {
        const { data: orders } = await orderAPI.list();
        const result = orders.map((item, index) => {
            return `
                <tr class="text-center">
                    <td style="padding: 12px 5px;">${index + 1}</td>
                    <td><span>${item.name}</span></td>   
                    <td><span>${item.phoneNumber}</span></td>
                    <td><span>${prices(item.totalPrice).replace('VND', 'Đ')}</span></td>
                    <td><span>${item.create_at}</span></td>
                    <td>
                        <span>${item.status}</span> <span class="checkStatus"></span>
                        <a href="/#/editorder/${item.id}"><button class="text-sm px-2 border border-gray-600 rounded-lg text-white btn btn-dark" data-id="${item.id}"><i class="fas fa-edit"></i></button></a>
                    </td>
                    <td>
                        <a href = "/#/orderdetailadmin/${item.id}">
                            <button class="text-sm px-2 border border-gray-600 rounded-lg text-white btn btn-primary btn-in4" data-id="${item.id}">
                                <i class="fas fa-info-circle"></i>
                            </button>
                        </a>
                    </td>
                    <td><div><button class="text-sm px-1 border border-gray-600 rounded-lg text-white btn btn-danger btn-remove" data-id="${item.id}"><i class="px-1 fas fa-trash-alt"></i></button></div></td>
                </tr>   
            `
        }).join('');
        if (orders.length == 0) {
            return `
                <div class="text-center text-4xl font-semibold pt-32 pb-4">Chưa có đơn hàng nào <i class="far fa-frown"></i></div>
            `
        } else {
            return `
            <div class="mx-auto" style="max-width:1200px;">
                <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Họ và tên</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col">Ngày đặt hàng</th>
                        <th scope="col">Trạng thái</th>
                        <th colspan="2" scope="col" >Tuỳ chọn</th>
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
        const { data: orders } = await orderAPI.list();
        console.log(orders);
        const checkStatus = $$(".checkStatus");
        for (let i = 0; i < orders.length; i++) {
            if (orders[i].status == "ĐÃ HOÀN THÀNH") {
                checkStatus[i].innerHTML = ` <i class="text-green-500 text-lg fas fa-check"></i>`;
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
                        reRender(listOrderAdmin, '#list_order_admin');
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
        const btn_edit = $$(".btn-dark");
        console.log(btn_edit);
        btn_edit.forEach(async (btn_edit) => {
            const id = btn_edit.dataset.id;
            const { data: theOrderEdit } = await orderAPI.get(id);
            if (theOrderEdit.status == "ĐÃ HOÀN THÀNH") {
                btn_edit.style.display = "none";
            }
        })
    }
}
export default listOrderAdmin;