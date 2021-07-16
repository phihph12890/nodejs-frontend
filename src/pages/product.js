import { $$, prices, logout, clickLogout, addToCart, getTotalItemOnCart, reRender, onLoadCartNumber, productSearch } from '../utils';
import header from '../component/header';
import banner from '../component/banner';
import footer from '../component/footer';
import productAPI from '../api/productAPI';
import categories from '../component/categories';
import Cart from '../component/Cart';
import toast from 'toast-me';


const ProductPage = {
    async render() {
        try {
            const { data: products } = await productAPI.list();
            const result = products.map(product => {
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
                                <div class="container mx-auto flex">
                                    <select class="form-control rounded-md font-semibold px-3" name="" id="sort" style="width:240px;">
                                        <option value="" selected disabled> --- Sắp xếp sản phẩm --- </option>
                                        <option value="asc">Giá từ thấp đến cao</option>
                                        <option value="desc">Giá từ cao đến thấp</option>
                                    </select>
                                    <select class="form-control rounded-md font-semibold px-2 ml-3" name="" id="filter" style="width:255px;">
                                        <option value="" selected disabled> --- Lọc sản phẩm theo giá --- </option>
                                        <option value="0-1500000">Dưới 15 triệu đồng</option>
                                        <option value="15000000-30000000">15 triệu - 30 triệu</option>
                                        <option value="30000000-40000000">30 triệu - 40 triệu</option>
                                        <option value="40000000-990000000">Trên 40 triệu đồng</option>
                                    </select>
                                </div>
                                <div class="grid grid-cols-3 gap-6 gap-y-6 mt-3 text-center" id="list_product">
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
        productSearch();
        clickLogout();
        $$('#sticky').style.position = 'sticky';
        $$('#sticky').style.top = "30px";

        var sort = $$("#sort");
        console.log(sort);
        sort.addEventListener("change", async () => {
            var valueSort = sort.value;
            const { data: productSort } = await productAPI.sortPrice(valueSort);
            console.log(productSort);
            const resultSort = productSort.map(product => {
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
            $$("#list_product").innerHTML = resultSort;
        })

        var filter = $$("#filter");
        console.log(filter);
        filter.addEventListener("change", async () => {
            var valueFilter = filter.value.split("-");
            console.log(valueFilter);
            const [valueFilter1, valueFilter2] = valueFilter;
            const { data: productFilter } = await productAPI.filterPrice(valueFilter1, valueFilter2);
            const resultFilter = productFilter.map(product => {
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
            $$("#list_product").innerHTML = resultFilter;
        })
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
export default ProductPage;