import productAPI from "../api/productAPI";
import { $$, reRender, prices } from "../utils";

const listProduct = {
    async render() {
        const { data: products } = await productAPI.list();
        return `
        <div>
            <table class="table mx-auto ">
                <thead>
                    <tr class="text-center">
                        <th class="text-sm border border-black" scope="col">STT</th>
                        <th class="text-sm border border-black" scope="col">TÊN SẢN PHẨM</th>
                        <th class="text-sm border border-black" scope="col">DANH MỤC</th>
                        <th class="text-sm border border-black" scope="col">ẢNH</th>
                        <th class="text-sm border border-black" scope="col">GIÁ</th>
                        <th class="text-sm border border-black" scope="col">GIÁ KHUYẾN MÃI</th>
                        <th class="text-sm border border-black" scope="col">BẢO HÀNH</th>
                        <th class="text-sm border border-black" scope="col">SỐ LƯỢNG</th>   
                        <th class="text-sm border border-black" class="text-center" colspan="2" scope="col">TUỲ CHỌN</th>
                    </tr>
                </thead>
                <tbody>
                ${products.map((product, index) => {
                    return `
                        <tr>
                            <td class="border border-black font-semibold text-center" scope="row"><div style="width: 30px;" >${index + 1}</div></td>
                            <td class="border border-black font-semibold" style="width: 350px;" ><div>${product.name}</div></td>
                            <td class="border border-black font-semibold text-center">${product.category.name}</td>
                            <td class="border border-black " style="width:200px;"><img class="mx-auto" style="width: 100%; height: auto;" src="${product.image}" alt=""></td>
                            <td class="border border-black text-center text-red-500 font-semibold">${prices(Number(product.price)).replace('VND','Đ')}</td>
                            <td class="border border-black text-center text-red-500 font-semibold">${prices(Number(product.priceSale)).replace('VND','Đ')}</td>
                            <td class="border border-black text-center">${product.guarantee}</td>
                            <td class="border border-black text-center">${product.quantity}</td>
                            <td class=" text-center border border-black" style="width: 50px;">
                                <div style="width: 30px;"><a href="/#/editproduct/${product.id}" class="text-sm px-1 border border-gray-600 rounded-lg bg-blue-500 hover:bg-blue-700 text-white btn btn-primary"><i class="px-1 far fa-edit"></i></a></div>
                            </td>
                            <td class=" text-center border border-black" >
                                <div style="width: 30px;"><button class="text-sm px-1 border border-gray-600 rounded-lg bg-red-500 hover:bg-red-700 text-white btn btn-danger btn-remove" data-id="${product.id}"><i class="px-1 fas fa-trash-alt"></i></button></div>
                            </td>
                        </tr>
                        `
                }).join('')}
                </tbody>
            </table>
        </div>
        `
    },
    async afterRender() {
        const btns = document.querySelectorAll(".btn-remove");
        console.log(btns);
        btns.forEach(btn => {
            const id = btn.dataset.id
            btn.addEventListener("click", async () => {
                const Confirm = confirm('Bạn có thật sự muốn xoá?');
                if(Confirm){
                    await productAPI.remove(id);
                    reRender(listProduct, '#list-products');
                }
            })
        })
    }
    
}
export default listProduct;