import categoryAPI from "../api/categoryAPI";
import productAPI from "../api/productAPI";
import { $$, parseRequestUrl, reRender } from "../utils";
import firebase from "../firebase";
import { v4 as uuidv4 } from 'uuid'
import adminNavbar from "../component/adminNavbar";
import adminCategorySidebar from "../component/adminCategorySidebar";
import adminFooter from "../component/adminFooter";
import listCategory from "../component/listCategory";
import { isAuthenticated, logout, clickLogout } from "../utils";
import toast from 'toast-me';

const ProductEditPage = {
    async render() {
        const { id } = parseRequestUrl();
        const { data: category } = await categoryAPI.read(id);
        console.log(category);

        return `
        <body class="hold-transition sidebar-mini layout-fixed">
            <div class="wrapper">
                <!-- Navbar -->
                ${adminNavbar.render()}

                <!-- Main Sidebar Container -->
                ${await adminCategorySidebar.render()}
        
                <!-- Content Wrapper. Contains page content -->
                <div class="content-wrapper">
                    <div class="container mx-auto pt-5 text-center">
                        <h3 class="text-center font-bold pb-4 text-xl">SỬA DANH MỤC</h3>
                        <form enctype="multipart/form-data" class="text-center" id="form_editCategory">
                            <p class="mt-10 font-semibold">Tên Danh mục: </p> <input type="text" id="category_name" class="border border-black pl-2 mt-2 py-2 text-2xl checkValidate" value="${category.name}" style="width:400px" > <br>
                            <p class="error text-red-500 text-sm font-semibold"></p>
                            <input type="submit" value="Sửa Danh mục" name="btn_themdm" class="px-3 py-2 text-white bg-red-600 rounded-full mt-4 mb-5 font-semibold hover:bg-red-700">
                        </form>
                    </div>
                <div>
                <div class="text-center mt-2">
                    <a href="/#/listcategory"><button class="btn btn-primary" type="button">Tất cả danh mục</button></a>
                </div>
            </div>
            </div>
        
                <!-- /.content-wrapper -->
                ${adminFooter.render()}
            </div>
            <!-- ./wrapper -->
        </body>
        `
    },
    async afterRender() {
        clickLogout();
        const { id } = parseRequestUrl();
        const { data: category } = await categoryAPI.read(id);
        const { data: categories } = await categoryAPI.list();
        console.log(categories);

        $$('#form_editCategory').addEventListener("submit", function (e) {
            e.preventDefault();

            var sumCheck = 0;
            var checkValidate = $$(".checkValidate");
            var errorValidate = $$(".error");
            console.log(checkValidate);
            if (checkValidate.value.trim() == "") {
                sumCheck += 1;
                errorValidate.innerHTML = "Không được để trống";
            } else {
                errorValidate.innerHTML = "";
            }
            var check = 0;
            categories.forEach(element => {
                if (checkValidate.value.trim() == element.name) {
                    check += 1;
                }
            });

            if (sumCheck === 0) {
                if (check === 0) {
                    const newCategory = {
                        ...category,
                        name: $$("#category_name").value,
                    }
                    console.log("old", category);
                    console.log("new", newCategory);
                    categoryAPI.update(id, newCategory);
                    reRender(listCategory, '#list-categories');
                    window.location.hash = '/listcategory';
                } else {
                    errorValidate.innerHTML = "Tên danh mục đã tồn tại";
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
    }
}
export default ProductEditPage;