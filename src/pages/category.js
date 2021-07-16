import header from '../component/header';
import banner from '../component/banner';
import footer from '../component/footer';
import categories from '../component/categories';
import productAPI from '../api/productAPI';
import categoryAPI from '../api/categoryAPI';
import { parseRequestUrl, $$, prices, clickLogout, addToCart, getTotalItemOnCart, reRender, onLoadCartNumber, productSearch } from "../utils";

const CategoryPage = {
    async render() {
        const { id } = parseRequestUrl();
        const { data: category } = await categoryAPI.read(id);
        const resultCate = `${category.name}`;

        const { data: products } = await productAPI.list();
        const result = products.filter(product => product.categoryId == id)
            .map(product => {
                return `<div class="group overflow-hidden shadow-md bg-white ">
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
            console.log(result.length);
        return `
            ${await header.render()}
            ${banner.render()}
            <div class="content bg-gray-100 pb-8" id="content">
                <div class=" mx-auto grid grid-cols-4 gap-8" style="width:1200px;">
                    <aside class="col-span-1 bg-gray-100">
                        ${await categories.render()}
                        <div id="sticky" class="mt-8">
                            <img class="shadow-md transition duration-500 ease-in-out transform hover:scale-95" src="https://laptopaz.vn/media/banner/23_Octce2f48fdc627f6f62b233347a2d4e707.jpg" alt="">
                            <img class="shadow-md mt-10 transition duration-500 ease-in-out transform hover:scale-95" src="https://laptopaz.vn/media/banner/11_Oct876d50f755e454ecda95d81a959c3685.jpg" alt="">
                        </div>
                    </aside>
                    <div class="col-span-3">
                        <h5 class="mt-1"><span><i class="fas fa-laptop"></i> Sản phẩm</span><i class="fas fa-angle-double-right text-xs px-1"></i><span class="text-blue-600 font-semibold text-sm">${resultCate}</span></h5>
                        <div class="grid grid-cols-3 gap-6 gap-y-6 mt-2 text-center">
                            ${result}
                        </div>
                    </div>
                </div>
            </div>
            ${footer.render()}
        `
    },
    afterRender() {
        const { id } = parseRequestUrl();
        const screenCategory = $$(".screenCategory");
        screenCategory.forEach(screenCategory => {
            const screenCategory_id = screenCategory.dataset.id;
            if (id == screenCategory_id) {
                screenCategory.style.backgroundColor = "rgba(147, 197, 253, var(--tw-bg-opacity))";
            }
        })
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

export default CategoryPage;