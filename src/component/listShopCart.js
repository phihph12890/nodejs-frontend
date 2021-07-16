import { parseRequestUrl, $$, prices, clickLogout, addToCart, getTotalItemOnCart, reRender, onLoadCartNumber, isAuthenticated } from "../utils";
import toast from 'toast-me';

const listShopCart = {
    render() {
        let productOnCart = localStorage.getItem('cart');
        productOnCart = JSON.parse(productOnCart);
        const isCartProduct = () => {
            if (productOnCart == null) {
                return `
                    <div class="text-center text-4xl font-semibold pt-32 pb-4">Bạn chưa thêm sản phẩm nào vào giỏ hàng <i class="far fa-frown"></i></div>
                    <div class="text-center mb-32"><a href="/" class="btn btn-primary">Mua ngay</a></div>
                `
            } else {
                const SessionCart = () => {
                    if (isAuthenticated() == false) {
                        return `
                            <button id="alertOder" class="btn btn-primary">Đặt hàng</button>
                        `
                    } else {
                        return `
                            <button id="btn_order" class="btn btn-primary">Đặt hàng</button>
                        `
                    }
                }
                let result = productOnCart.map((item, index) => {
                    return `
                        <tr class="text-center">
                            <td class="border border-gray-300">${index + 1}</td>
                            <td class="border border-gray-300 flex"><img src="${item.image}" alt="" width="70">
                                <p class="px-2">${item.name}</p>
                            </td>   
                            <td class="border border-gray-300"><span class="cart_price_show">${prices(Number(item.price))}</span><span class="cart_price hidden">${Number(item.price)}</span></td>
                            <td class="border border-gray-300">
                                <button class="text-sm px-1 border border-gray-600 rounded-lg px-2 text-white btn btn-primary btn_minus" data-id="${item.id}">-</button>
                                <input type="number" class="w-16 pl-4 border border-gray-200 rounded-md cart_quantity" disabled  value="${item.quantity}" />
                                <button class="text-sm px-1 border border-gray-600 rounded-lg px-2 text-white btn btn-primary btn_plus" data-id="${item.id}">+</button>
                            </td>
                            <td class="border border-gray-300"><span class="cart_cost_show">${prices(Number(item.price) * Number(item.quantity)).replace('VND', 'Đ')}</span><span class="cart_cost hidden ">${Number(item.price) * Number(item.quantity)}</span></td>
                            <td class="border border-gray-300"><div><button class="text-sm px-1 border border-gray-600 rounded-lg bg-red-500 hover:bg-red-700 text-white btn btn-danger btn-remove" data-id="${item.id}"><i class="px-1 fas fa-trash-alt"></i></button></div></td>
                        </tr>
                    `
                }).join('');
                return `
                <div class="text-right mb-2"><button id="removeCart" class="btn btn-danger">Xoá giỏ hàng</button></div>
                    <table>
                        <thead>
                            <tr class="text-center">
                                <th class="border border-gray-300" style="width: 50px">STT</td>
                                <th class="border border-gray-300" style="width: 500px">Tên sản phẩm</td>
                                <th class="border border-gray-300" style="width: 150px">Đơn giá</td>
                                <th class="border border-gray-300" style="width: 150px">Số lượng</td>
                                <th class="border border-gray-300" style="width: 150px">Thành tiền</td>
                                <th class="border border-gray-300" style="width: 50px">Xoá</td>
                            </tr>
                        </thead>
                        <tbody id="showListCart">
                            ${result}
                            <tr>
                                <td colspan="2" class="border border-gray-400"></td>
                                <td colspan="4" class="border border-gray-400">
                                    <p class="text-red-500 font-bold my-3 ml-3 text-lg">Tổng tiền: <span id="totalCost"></span></p> 
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="flex justify-end mt-4 pb-4">
                        <a href="/#/"><button class="btn btn-primary mr-4">Tiếp tục mua hàng</button></a>
                        ${SessionCart()}
                    </div>
                `
            }
        }
        return `
            ${isCartProduct()}
        `
    },
    afterRender() {

        var cart_quantity = $$(".cart_quantity");
        var cart_cost = $$(".cart_cost");
        var cart_cost_show = $$(".cart_cost_show");
        var cart_price = $$(".cart_price");
        let listCart = localStorage.getItem('cart');
        listCart = JSON.parse(listCart);
        let cartNumber = localStorage.getItem('cartNumber');


        if (listCart.length == 1) {
            cart_quantity.addEventListener("change", function () {
                totalPrices();
            })
        } else {
            for (let i = 0; i < cart_price.length; i++) {
                cart_quantity[i].addEventListener("change", function () {
                    totalPrices();
                })
            }
        }
        totalPrices();

        function totalPrices() {
            if (listCart.length == 1) {
                cart_cost.innerHTML = (Number(cart_quantity.value) * Number(cart_price.innerHTML));
                cart_cost_show.innerHTML = `${prices((Number(cart_quantity.value) * Number(cart_price.innerHTML)))}`
            } else {
                for (let i = 0; i < cart_cost.length; i++) {
                    cart_cost[i].innerHTML = (Number(cart_quantity[i].value) * Number(cart_price[i].innerHTML));
                    cart_cost_show[i].innerHTML = `${prices((Number(cart_quantity[i].value) * Number(cart_price[i].innerHTML)))}`
                }
            }
            let totalPrice = 0;
            if (listCart.length == 1) {
                totalPrice = Number(cart_cost.innerHTML);
                localStorage.setItem("totalPrice", totalPrice);
            } else {
                for (let i = 0; i < cart_cost.length; i++) {
                    totalPrice += Number(cart_cost[i].innerHTML);
                    localStorage.setItem("totalPrice", totalPrice);
                }
            }
            $$("#totalCost").innerHTML = `${prices(totalPrice)}`;
        }

        const del_btns = document.querySelectorAll('.btn-remove');
        del_btns.forEach(btn => {
            const del_id = btn.dataset.id
            btn.addEventListener("click", function () {
                for (let i = 0; i < listCart.length; i++) {
                    if (listCart[i].id == del_id) {
                        cartNumber -= listCart[i].quantity;
                        console.log(listCart);
                        listCart.splice(i, 1);
                        console.log(listCart);
                        localStorage.setItem("cartNumber", cartNumber);
                        localStorage.setItem("cart", JSON.stringify(listCart));
                        reRender(listShopCart, '#list_cart');
                        onLoadCartNumber();

                        if (listCart.length === 0) {
                            localStorage.removeItem("cart");
                            localStorage.removeItem("cartNumber");
                            localStorage.removeItem("totalPrice");
                            onLoadCartNumber();
                            reRender(listShopCart, '#list_cart');
                            $$("#oderPage").style.display = "none";
                        }
                    }
                }
            })
        })

        $$("#removeCart").addEventListener("click", function () {
            localStorage.removeItem('cart');
            localStorage.removeItem('cartNumber');
            localStorage.removeItem('totalPrice');
            reRender(listShopCart, "#list_cart");
            onLoadCartNumber();
        })

        $$("#btn_order").addEventListener("click", function () {
            $$("#oderPage").classList.toggle('hidden');
        })

        Minus();
        function Minus() {
            const btn_minus = $$(".btn_minus");
            console.log(btn_minus);
            if (btn_minus.length > 1) {
                btn_minus.forEach(btn_minus => {
                    const minus_id = btn_minus.dataset.id;
                    btn_minus.addEventListener("click", function () {
                        for (let i = 0; i < listCart.length; i++) {
                            if (listCart[i].id == minus_id) {
                                if (listCart[i].quantity > 1) {
                                    listCart[i].quantity--;
                                    cartNumber--;
                                } else {
                                    listCart[i].quantity = 1;
                                }
                                console.log(listCart[i]);
                                localStorage.setItem("cartNumber", cartNumber);
                                localStorage.setItem("cart", JSON.stringify(listCart));
                                reRender(listShopCart, '#list_cart');
                            }
                        }
                    })
                })
            } else {
                const minus_id = btn_minus.dataset.id;
                btn_minus.addEventListener("click", function () {
                    for (let i = 0; i < listCart.length; i++) {
                        if (listCart[i].id == minus_id) {
                            if (listCart[i].quantity > 1) {
                                listCart[i].quantity--;
                                cartNumber--;
                            } else {
                                listCart[i].quantity = 1;
                            }
                            console.log(listCart[i]);
                            localStorage.setItem("cartNumber", cartNumber);
                            localStorage.setItem("cart", JSON.stringify(listCart));
                            reRender(listShopCart, '#list_cart');
                        }
                    }
                })
            }
        }
        Plus();
        function Plus() {
            const btn_plus = $$(".btn_plus");
            if (btn_plus.length > 1) {
                btn_plus.forEach(btn_plus => {
                    const minus_id = btn_plus.dataset.id;
                    btn_plus.addEventListener("click", function () {
                        for (let i = 0; i < listCart.length; i++) {
                            if (listCart[i].id == minus_id) {
                                listCart[i].quantity++;
                                cartNumber++;
                                console.log(listCart[i]);
                                localStorage.setItem("cartNumber", cartNumber);
                                localStorage.setItem("cart", JSON.stringify(listCart));
                                reRender(listShopCart, '#list_cart');
                            }
                        }
                    })
                })
            } else {
                const minus_id = btn_plus.dataset.id;
                    btn_plus.addEventListener("click", function () {
                        for (let i = 0; i < listCart.length; i++) {
                            if (listCart[i].id == minus_id) {
                                listCart[i].quantity++;
                                cartNumber++;
                                console.log(listCart[i]);
                                localStorage.setItem("cartNumber", cartNumber);
                                localStorage.setItem("cart", JSON.stringify(listCart));
                                reRender(listShopCart, '#list_cart');
                            }
                        }
                    })
            }
        }
    }
}
export default listShopCart;