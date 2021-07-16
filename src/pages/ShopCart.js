import header from '../component/header';
import footer from '../component/footer';
import listShopCart from '../component/listShopCart'
import productAPI from '../api/productAPI';
import categoryAPI from '../api/categoryAPI';
import authAPI from '../api/auth';
import orderAPI from '../api/orderAPI';
import { parseRequestUrl, $$, prices, clickLogout, addToCart, getTotalItemOnCart, reRender, onLoadCartNumber, onLoadListCart, productSearch, isAuthenticated } from "../utils";
import toast from 'toast-me';

const ShopCartPage = {
    async render() {
        return `
            ${await header.render()}
            <div class="div-content bg-gray-100 pb-8">
                <div class="content1 mx-auto" style="max-width: 1200px;">
                    <div class="flex justify-between items-center py-2">
                        <h5 class="py-3"><a href="">Trang chủ</a> <i class="fas fa-angle-double-right text-xs px-1"></i> <a href="">Giỏ hàng</a></h5>
                    </div>
                    <div id="list_cart">
                        ${await listShopCart.render()}
                    </div>
                </div>
            </div>
            <div class="bg-gray-100 hidden" id="oderPage">
                        <div class="mx-auto" style="max-width: 1230px;">
                            <div class=" px-3 pb-5">
                                <form class="grid grid-cols-5 gap-3" id="form_addOder">
                                    <div class="col-span-3 border">
                                        <div class="border-b pt-1 px-3">
                                            <h3 class="text-lg pb-1 font-semibold">1. Khách hàng khai báo thông tin</h3>
                                        </div>
                                        <div class="ml-5">
                                            <h4 class="text-base mt-4 font-semibold">Thông tin người mua</h4>
                                            <p class="text-sm mt-1">Những phần đánh dấu * là bắt buộc</p>
                                            <div class="flex  mt-4">
                                            <p style="min-width: 120px;">Họ tên *</p>
                                            <input type="text" class="form-control checkValidate" id="fullname" placeholder="Nguyễn Văn A" style="width:420px; height:30px;"> 
                                            </div>
                                            <div class="flex mt-4">
                                                <p style="min-width: 120px;">Địa chỉ*</p>
                                                <input type="text" class="form-control checkValidate" id="address" placeholder="Số 165 - Cầu Giấy - Quận Cầu Giấy - Hà Nội" style="width:420px; height:30px;"> 
                                            </div>
                                            <div class="flex mt-4">
                                                <p style="min-width: 120px;">Số điện thoại*</p>
                                                <input type="text" class="form-control checkValidate" id="phoneNumber" placeholder="+84 xxx xxx xxx" style="width:420px; height:30px;"> 
                                            </div>
                                            <div class="flex mt-4">
                                                <p style="min-width: 120px;">Email</p>
                                                <input type="text" class="form-control checkValidate" id="email" placeholder="abc@xyz.com" style="width:420px; height:30px;">
                                            </div>
                                            <div><p class="errorEmail text-red-500 text-sm font-semibold mt-1" style="margin-left: 120px"></p></div>
                                        </div>
                                    </div>
                                    <div class="col-span-2 ">
                                        <div class="">
                                            <div class="border-t border-l border-r pt-1 px-3">
                                                <h3 class="text-lg pb-1 font-semibold">2. Ghi chú cho đơn hàng</h3>
                                            </div>
                                            <div class="p-2 border">
                                                <textarea name="" id="note" rows="3" class="w-full form-control checkValidate"></textarea>
                                            </div>
                                        </div>
                                        <div class="mt-4 ">
                                            <div class="border-t border-l border-r pt-1 px-3">
                                                <h3 class="text-lg pb-1 font-semibold">3. Chọn phương thức thanh toán</h3>
                                            </div>
                                            <div class="p-3 border">
                                                <form class="text-sm" id="form">
                                                    <div><input name="checkPay" type="radio"> Thanh toán tại cửa hàng</div>
                                                    <div class="mt-1"><input name="checkPay" type="radio" checked> Thanh toán khi nhận hàng (COD)</div>
                                                    <div class="mt-1"><input name="checkPay" type="radio" id="radio3" disabled> Thanh toán trực tuyến bằng thẻ ATM, IB, QR Code </div>
                                                    <div class="mt-1"><input name="checkPay" type="radio" id="radio4" disabled> Thanh toán trả góp online</div>
                                                </form>
                                            </div>
                                        </div>
                                        <div class="text-center mt-3">
                                            <input type="submit" class="btn btn-primary py-2" value="GỬI ĐƠN HÀNG">
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
            </div>
            ${footer.render()}
        `
    },
    async afterRender() {
        clickLogout();
        productSearch();

        const userId = parseInt(isAuthenticated().sub);
        const { data: user } = authAPI.read(userId);
        console.log(user);
        var cartStorage = localStorage.getItem('cart');
        cartStorage = JSON.parse(cartStorage);
        console.log(cartStorage);
        var cartNumber = localStorage.getItem('cartNumber');
        cartNumber = Number(cartNumber);
        console.log(cartNumber);

        $$("#removeCart").addEventListener("click", function () {
            localStorage.removeItem('cart');
            localStorage.removeItem('cartNumber');
            localStorage.removeItem('totalPrice');
            reRender(listShopCart, "#list_cart");
            onLoadCartNumber();
            reRender(ShopCartPage);
            
        })
        $$("#form_addOder").addEventListener("submit", e => {
            e.preventDefault();

            var sumCheck = 0;
            var checkValidate = $$(".checkValidate");
            for (let i = 0; i < checkValidate.length; i++) {
                if (checkValidate[i].value.trim() == "") {
                    sumCheck += 1;
                    checkValidate[i].style.border = "2px solid red";
                } else {
                    checkValidate[i].style.border = "none";
                }
            }

            var checkEmail = 0;
            var checkValidateEmail = $$("#email");
            console.log(checkValidateEmail);
            var errorEmail = $$(".errorEmail");
            var validateEmail = /^[A-Za-z0-9_.]{4,32}@([a-zA-Z0-9]{2,12})(.[a-zA-Z]{2,12})+$/;
            if (!validateEmail.test(checkValidateEmail.value)) {
                checkEmail += 1;
            }

            if (sumCheck === 0) {
                if (checkEmail === 0) {
                    var totalPriceStorage = localStorage.getItem('totalPrice');
                    totalPriceStorage = Number(totalPriceStorage);
                    console.log(totalPriceStorage);
                    const order = {
                        userId: userId,
                        name: $$("#fullname").value,
                        address: $$("#address").value,
                        phoneNumber: $$("#phoneNumber").value,
                        email: $$("#email").value,
                        note: $$("#note").value,
                        cart: cartStorage,
                        cartNumber: cartNumber,
                        totalPrice: totalPriceStorage,
                        create_at: moment(new Date()).format('DD-MM-YYYY'),
                        status: "CHƯA DUYỆT",
                    }
                    orderAPI.add(order);
                    toast(
                        'Thêm đơn hàng thành công!',
                        { duration: 2500 },
                        {
                            // label: 'Confirm',
                            action: () => alert('Cool!'),
                            class: 'my-custom-class', // optional, CSS class name for action button
                        },
                    );
                } else {
                    errorEmail.innerHTML = "Email sai định dạng!"
                }
            } else {
                toast(
                    'Hãy điền đầy đủ thông tin!',
                    { duration: 2500 },
                    {
                        // label: 'Confirm',
                        action: () => alert('Cool!'),
                        class: 'my-custom-class', // optional, CSS class name for action button
                    },
                );
            }
        })

        return `${listShopCart.afterRender()}`
    }
}
export default ShopCartPage;