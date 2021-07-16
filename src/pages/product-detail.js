import header from '../component/header';
import banner from '../component/banner';
import footer from '../component/footer';
import { parseRequestUrl, $$, isAuthenticated, prices, clickLogout, addToCart, getTotalItemOnCart, reRender, onLoadCartNumber } from "../utils";
import productAPI from '../api/productAPI';
import categories from '../component/categories';

const ProductDetailPage = {
    async render() {
        const { id } = parseRequestUrl();
        const { data: product } = await productAPI.read(id);

        const { data: relateProduct } = await productAPI.relateProduct(`${product.categoryId}`, id);
        const resultRelateProduct = relateProduct.map(relateProduct => {
            return `
            <div class="group bg-white overflow-hidden shadow-md text-center py-2">
                <div class="py-2 transition duration-500 ease-in-out transform group-hover:scale-90">
                    <a href=""><img class="mx-auto" src="${relateProduct.image}" alt="" width="70%"></a>
                </div>
                <a class="hover:text-yellow-600" href=""><h4 class="text-sm px-2 pt-1 group-hover:text-yellow-600">${relateProduct.name}</h4></a>
                <p class="text-red-500 text-lg font-bold pt-1  italic">${prices(Number(relateProduct.priceSale)).replace('VND', 'Đ')} <span class="text-gray-500 text-sm ml-2 font-bold pt-1  italic line-through">${prices(Number(relateProduct.price)).replace('VND', 'Đ')}</span></p>
                <div class="transition duration-300 ease-in-out pt-2 transform translate-y-24 group-hover:-translate-y-0" >
                    <button class="bg-blue-500 text-white bg-black text-base rounded-md font-bold btn_addCart" data-id="${relateProduct.id}" style="padding: 6px 70px;">THÊM GIỎ HÀNG</button>
                </div>
            </div>
            <hr class="">
            `
        }).join('');
        const checkUserCart = () => {
            if (isAuthenticated() == false) {
                return `
                    <div class="mt-4">
                        <div class="bg-red-500 rounded-lg text-center mt-3" style="width: 430px;">
                            <a href="" onclick="alert('Hãy đăng nhập để mua hàng!')">
                                <p class="text-white font-bold text-lg pt-1">Thêm vào giỏ hàng</p>
                                <p class="text-white font-semibold text-sm mt-1 pb-2">Giao tận nơi hoặc nhận ở cửa hàng</p>
                            </a>
                        </div>
                        <div class="grid grid-cols-2  gap-2 mt-2" style="width: 430px;">
                            <div class="bg-blue-500 rounded-lg text-center ml-1 hover:bg-blue-900">
                                <a href="">
                                    <p class="text-white font-bold text-sm pt-1">TRẢ GÓP % QUA THẺ</p>
                                    <p class="text-white text-xs mt-1 pb-1">Visa, Master Card, JCB</p>
                                </a>
                            </div>
                            <div class="bg-blue-500 rounded-lg text-center mr-1 hover:bg-blue-900">
                                <a href="">
                                    <p class="text-white font-bold text-sm pt-1">ĐĂNG KÝ TRẢ GÓP</p>
                                    <p class="text-white text-xs mt-1 pb-1">Xét duyệt nhanh qua điện thoại</p>
                                </a>
                            </div>
                        </div>
                    </div>
                    `
            } else {
                return `
                    <div class="mt-4">
                        <div class="bg-red-500 rounded-lg text-center mt-3" style="width: 430px;">
                            <button data-id="${product.id}" class="btn_addCart" style="padding: 0 100px;">
                                <p class="text-white font-bold text-lg pt-1">Thêm vào giỏ hàng</p>
                                <p class="text-white font-semibold text-sm mt-1 pb-2">Giao tận nơi hoặc nhận ở cửa hàng</p>
                            </button>
                        </div>
                        <div class="grid grid-cols-2  gap-2 mt-2" style="width: 430px;">
                            <div class="bg-blue-500 rounded-lg text-center ml-1 hover:bg-blue-900">
                                <a href="">
                                    <p class="text-white font-bold text-sm pt-1">TRẢ GÓP % QUA THẺ</p>
                                    <p class="text-white text-xs mt-1 pb-1">Visa, Master Card, JCB</p>
                                </a>
                            </div>
                            <div class="bg-blue-500 rounded-lg text-center mr-1 hover:bg-blue-900">
                                <a href="">
                                    <p class="text-white font-bold text-sm pt-1">ĐĂNG KÝ TRẢ GÓP</p>
                                    <p class="text-white text-xs mt-1 pb-1">Xét duyệt nhanh qua điện thoại</p>
                                </a>
                            </div>
                        </div>
                    </div>
                    `
            }
        }
        return `
            ${await header.render()}
            <div class="content bg-gray-100 pb-8 pt-5">
                <div class=" mx-auto grid grid-cols-4 gap-5" style="width:1200px;">
                    <aside class="col-span-1 bg-gray-100">
                        ${await categories.render()}
                        <div class="mt-8">
                            <img class="shadow-md transition duration-500 ease-in-out transform hover:scale-95" src="https://laptopaz.vn/media/banner/23_Octce2f48fdc627f6f62b233347a2d4e707.jpg" alt="">
                        </div>
                    </aside>
                    <div class="col-span-3 bg-white shadow-md pb-4">
                        <h3 class="font-bold text-lg mt-4 ml-4">${product.name}</h3>
                        <hr class="mt-3">
                        <div class="grid grid-cols-11">
                            <div class="col-span-5" style="width: 400px; height: 350px">
                                <img class="h-full mt-16 mx-auto" src="${product.image}" alt="">
                            </div>
                            <div class="col-span-6 mt-4">
                                <span class="text-red-500 text-3xl font-bold">${prices(Number(product.priceSale)).replace('VND', 'Đ')}</span> <span class="text-lg text-gray-500 font-bold  ml-3 italic line-through">${prices(Number(product.price)).replace('VND', 'Đ')}</span>
                                <p class="text-sm mt-2"><span class="font-semibold">Bảo hành: </span><span class="text-lg font-bold">12 tháng</span></p>
                                <p class="text-sm mt-1"><span class="font-semibold">Số lượng trong kho: </span><span class="text-lg font-bold">20</span></p>
                                <p class="text-sm mt-4"><span class="text-base text-green-500"><i class="fas fa-check-square"></i></span> Hàng Mới Về</p>
                                <p class="text-sm"><span class="text-base text-green-500"><i class="fas fa-check-square"></i></span> Mua hàng trước 15/01/2021 Giảm ngay 1.000.000 vnđ</p>
                                ${checkUserCart()}
                                <div class="mt-5 mb-8">
                                    <button class="text-sm text-white bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-800 showdetail" id="showdetail">Xem đặc điểm và cấu hình chi tiết</button>
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 mt-4">
                            <div>
                                <div class="border border-green-400 rounded-lg relative py-6 ml-10" style="width: 430px;">
                                    <div class="bg-green-400 rounded-full absolute" style="top: -17px; left: 20px;">
                                        <p class="py-1 px-3"><span><i class="fas fa-gift"></i></span> Quà tặng/Khuyến mãi</p>
                                    </div>
                                    <p class="text-sm mt-2 ml-6 text-xs"><span class="text-green-400 text-xs"><i class="fas fa-check-circle"></i></span> Tặng Windows 10 bản quyền theo máy</p>
                                    <p class="text-sm mt-2 ml-6 text-xs"><span class="text-green-400 text-xs"><i class="fas fa-check-circle"></i></span> Miễn phí cân màu màn hình công nghệ cao</p>
                                    <p class="text-sm mt-2 ml-6 text-xs"><span class="text-green-400 text-xs"><i class="fas fa-check-circle"></i></span> Balo thời trang + túi chống sốc cao cấp</p>
                                    <p class="text-sm mt-2 ml-6 text-xs"><span class="text-green-400 text-xs"><i class="fas fa-check-circle"></i></span> Chuột không dây + Bàn di cao cấp chính hãng</p>
                                    <p class="text-sm mt-2 ml-6 text-xs"><span class="text-green-400 text-xs"><i class="fas fa-check-circle"></i></span> Tặng gói cài đặt, bảo dưỡng chăm sóc máy trọn đời</p>
                                    <p class="text-sm mt-2 ml-6 text-xs"><span class="text-green-400 text-xs"><i class="fas fa-check-circle"></i></span> Tặng Voucher giảm giá cho lần mua tiếp theo</p>
                                </div>
                            </div>
                            <div>
                                <div class="border border-gray-500 rounded-lg relative py-4 ml-12" style="width: 350px;">
                                    <h4 class="text-base text-center text-red-500">YÊN TÂM MUA SẮM TẠI LAPTOPAZ</h4>
                                    <p class="text-sm mt-1 ml-3 text-base"><span class="text-yellow-500 text-base mr-2"><i class="fas fa-star"></i></span> Chất lượng sản phẩm là hàng đầu</p>
                                    <p class="text-sm mt-1 ml-3 text-base"><span class="text-yellow-500 text-base mr-2"><i class="fas fa-star"></i></span> Dùng test máy 15 ngày đầu lỗi 1 đổi 1</p>
                                    <p class="text-sm mt-1 ml-3 text-base"><span class="text-yellow-500 text-base mr-2"><i class="fas fa-star"></i></span> Hỗ trợ và hậu mãi sau bán hàng tốt nhất</p>
                                    <p class="text-sm mt-1 ml-3 text-base"><span class="text-yellow-500 text-base mr-2"><i class="fas fa-star"></i></span> Trả góp lãi suất 0% qua thẻ visa</p>
                                    <p class="text-sm mt-1 ml-3 text-base"><span class="text-yellow-500 text-base mr-2"><i class="fas fa-star"></i></span> Giao hàng toàn quốc nhanh nhất</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-100">
                <div class="in4 grid grid-cols-7 gap-5 mx-auto pb-5" style="max-width: 1200px;">
                    <div class="col-span-5 bg-white">
                        <div class="mt-1">
                            <div class="px-4 shadow-md pb-4">
                                <h3 class="font-bold text-lg mt-2">Đặc điểm nổi bật</h3>
                                <hr class="mt-1 mb-2">
                                ${product.description}
                            </div>
                            <div class="py-2 bg-gray-100"></div>
                            <div class="bg-white rounded-t-md shadow-md">
                                <div class="bg-gray-200">
                                    <h3 class="font-bold py-2 px-5">Đánh giá & nhận xét</h3>
                                </div>
                                <div class="px-5">
                                    <div class="flex justify-between">
                                        <p><span class="text-xs mr-2"><i class="fas fa-dot-circle"></i></span> Sản phẩm chất lượng</p>
                                        <p class="text-sm mt-1 italic"><span class=" font-bold">hoangphi, </span> 2020-10-7</p>
                                    </div>
                                    <div class="flex justify-between">
                                        <p><span class="text-xs mr-2"><i class="fas fa-dot-circle"></i></span> Sản phẩm tốt</p>
                                        <p class="text-sm mt-1 italic"><span class=" font-bold">admin, </span> 2020-10-7</p>
                                    </div>
                                    <div class="flex justify-between">
                                        <p><span class="text-xs mr-2"><i class="fas fa-dot-circle"></i></span> Giá cả phù hợp</p>
                                        <p class="text-sm mt-1 italic"><span class=" font-bold">letuan, </span> 2020-10-7</p>
                                    </div>
                                </div>
                                <div class="pb-3 mt-3 bg-gray-200 pt-4">
                                    <div class="grid grid-cols-12 gap-4 ">
                                        <div class="col-span-1">
                                            <a href=""><img class="h-auto ml-5" src="https://scontent-hkg4-1.xx.fbcdn.net/v/t1.0-9/72783406_1871285719684709_7378698143161909248_o.jpg?_nc_cat=108&ccb=2&_nc_sid=09cbfe&_nc_ohc=052ybVltGaYAX8PAk7o&_nc_ht=scontent-hkg4-1.xx&oh=d66a04e615a21a0320cfe4783ae78675&oe=6028FCC0" alt=""></a>
                                        </div>
                                        <div class="col-span-11">
                                            <textarea class="border border-gray-600 px-2 py-1 ml-5" name="" id="" cols="93" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div class="flex justify-end">
                                        <input class="px-5 mt-1 rounded-md bg-red-500 text-white py-1 cursor-pointer mr-8" type="submit" value="Gửi">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-2">
                        <div class="bg-white shadow-md">
                            <h3 class="font-bold text-lg ml-5 pt-2">Thông số kỹ thuật</h3>
                            <hr class="mt-1">
                            <div class="px-2 mt-2">
                                ${product.config}
                            </div>
                        </div>
                        <div class="bg-white mt-5 shadow-md ">
                            <h3 class="font-bold text-lg ml-5 pt-2">Sản phẩm liên quan</h3>
                            <hr class="mt-1">
                            ${resultRelateProduct}
                        </div>
                    </div>
                </div>
            </div>
            ${footer.render()}
            `
    },
    afterRender() {
        $(".showdetail").click(function () {
            $("html,body").animate(
                {
                    scrollTop: 1030,
                },
                500
            );
        });
        clickLogout();
        const btns = $$(".btn_addCart");
        console.log(btns);
        console.log("okkkk");
        btns.forEach(async (btn) => {
            var btn_id = btn.dataset.id;
            btn.addEventListener("click", async () => {
                console.log(btn_id);
                var { data: products } = await productAPI.read(btn_id);
                addToCart(`${products.id}`, `${products.name}`, `${products.image}`, `${products.priceSale}`, `${products.categoryId}`, `${products.category.name}`);
                getTotalItemOnCart();
                onLoadCartNumber();
            })
        })
    }
}
export default ProductDetailPage;