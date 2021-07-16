import { $$, prices, logout, clickLogout, addToCart, getTotalItemOnCart, reRender, onLoadCartNumber, parseRequestUrl, productSearch } from '../utils';
import header from '../component/header';
import banner from '../component/banner';
import footer from '../component/footer';
import productAPI from '../api/productAPI';
import categories from '../component/categories';
import Cart from '../component/Cart';

const ProductSearchPage = {
    async render() {
        try {
            const { id } = parseRequestUrl();
            const { data: products } = await productAPI.search(id);
            var result;
            console.log(products);
            if (products.length == 0) {
                result = `
                    <div class=" text-center absolute mx-48 mt-20">
                        <div class="text-4xl font-semibold">Không tìm thấy sản phẩm <i class="far fa-sad-tear"></i></div>
                        <div><a href="/"><button class="btn btn-primary mt-4">Trang chủ</button></a></div>
                    </div>
                `
            } else {
                result = products.map(product => {
                    return `
                        <div class="group overflow-hidden shadow-md bg-white ">
                                <div class="bg-white overflow-hidden ">
                                    <div class="py-2 transition duration-500 ease-in-out transform group-hover:scale-90">
                                        <a href="/#/product/${product.id}"><img class="mx-auto" src="${product.image}" alt="" width="80%"></a>
                                    </div>
                                    <a href="/#/product/${product.id}"><span class="text-center text-sm pt-1 group-hover:text-yellow-600 px-2">${product.name}</span></a>
                                    <p class="text-red-500 text-lg font-bold py-1">${prices(Number(product.priceSale)).replace('VND', 'Đ')}<span class="text-gray-500 text-base ml-2 font-bold pt-1italic line-through">${prices(Number(product.price)).replace('VND', 'Đ')}</span></p>
                                    <div class="transition duration-300 ease-in-out transform translate-y-24 group-hover:-translate-y-0" >
                                        <button class="bg-blue-500 text-white bg-black text-base font-bold rounded-md btn_addCart" 
                                                style="padding: 6px 50px;" data-id="${product.id}">
                                            THÊM GIỎ HÀNG
                                        </button>
                                    </div>
                                </div>
                        </div>
                            `
                }).join('');
            }
            return `
                    ${await header.render()}
                    <div class="content bg-gray-100 pb-8 pt-4" id="content">
                        <div class=" mx-auto grid grid-cols-4 gap-8 mt-2" style="width:1200px;">
                            <aside class="col-span-1 bg-gray-100">
                                ${await categories.render()}
                                <div id="sticky" class="mt-8">
                                    <img class="shadow-md transition duration-500 ease-in-out transform hover:scale-95" src="https://laptopaz.vn/media/banner/23_Octce2f48fdc627f6f62b233347a2d4e707.jpg" alt="">
                                    <img class="shadow-md mt-10 transition duration-500 ease-in-out transform hover:scale-95" src="https://laptopaz.vn/media/banner/11_Oct876d50f755e454ecda95d81a959c3685.jpg" alt="">
                                </div>
                            </aside>
                            <div class="col-span-3">
                                <div class="grid grid-cols-3 gap-6 gap-y-6 text-center">
                                    ${result}
                                </div>
                            </div>
                        </div>
                    </div>
                    ${footer.render()}
                    `
        } catch (error) {
            console.log(error);
        }
    },
    async afterRender() {
        clickLogout();
        productSearch();
        $$('#sticky').style.position = 'sticky';
        $$('#sticky').style.top = "30px";
        const btns = $$(".btn_addCart");
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
export default ProductSearchPage;