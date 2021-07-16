import categoryAPI from "../api/categoryAPI";
import { $$, reRender } from "../utils";

const listCategory = {
    async render() {
        const { data: categories } = await categoryAPI.list();
        return `
        <div class="pb-10">
            <table class="table mx-auto table-hover" style="max-width: 500px">
                <thead>
                    <tr class="text-center">
                        <th scope="col">STT</th>
                        <th scope="col">TÊN DANH MỤC</th>
                        <th class="text-center" colspan="2" scope="col">TUỲ CHỌN</th>
                    </tr>
                </thead>
                <tbody>
                    ${categories.map((category, index) => {
                        return `
                            <tr>
                                <td scope="row"><div>${index + 1}</div></td>
                                <td class="font-semibold"><div class="pt- px-32" style="width: 400px;">${category.name}</div></td>
                                <td style="width: 50px;">
                                    <div><a href="/#/editcategory/${category.id}" class="text-sm px-1 rounded-lg bg-blue-500 hover:bg-blue-700 text-white btn btn-primary"><i class="px-1 far fa-edit"></i></a></div>
                                </td>
                                <td>
                                    <div><button class="text-sm px-1 rounded-lg bg-red-500 hover:bg-red-700 text-white btn btn-danger btn-remove" data-id="${category.id}"><i class="px-1 fas fa-trash-alt"></i></button></div>
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
            const id = btn.dataset.id;
            btn.addEventListener("click", async () => {
                const Confirm = confirm('Bạn có thật sự muốn xoá?');
                if (Confirm) {
                    await categoryAPI.remove(id);
                    reRender(listCategory, '#list-categories');
                }
            })
        })
    }
}
export default listCategory;