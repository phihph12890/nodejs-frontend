import categoryAPI from "../api/categoryAPI";
import productAPI from "../api/productAPI";
import { $$, reRender, clickLogout } from "../utils";
import firebase from "../firebase";
import { v4 as uuidv4 } from 'uuid'
import adminNavbar from "../component/adminNavbar";
import adminProductSidebar from "../component/adminProductSidebar";
import adminFooter from "../component/adminFooter";
import listProduct from "../component/listProduct";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import toast from 'toast-me';

const ProductAddPage = {
    async render() {
        const { data: categories } = await categoryAPI.list();
        console.log(categories);
        const resultCate = categories.map(categories => {
            return `
                <option value="${categories.id}">${categories.name}</option>
            `
        })
        return `
        <body class="hold-transition sidebar-mini layout-fixed">
            <div class="wrapper">
                <!-- Navbar -->
                ${adminNavbar.render()}

                <!-- Main Sidebar Container -->
                ${await adminProductSidebar.render()}
        
                <!-- Content Wrapper. Contains page content -->
                <div class="content-wrapper">
                    <div class="container mx-auto pt-5 ">
                        <h3 class="text-center font-bold pb-4 text-xl">THÊM SẢN PHẨM</h3>
                        <form enctype="multipart/form-data" id="form_addProduct">
                            <div class="grid grid-cols-2">
                                <div class="ml-48">
                                    <div class="hidden">
                                        <p>MÃ SẢN PHẨM</p> <input type="text" id="product_id">
                                    </div>
                                    <p class="font-semibold">DANH MỤC SẢN PHẨM</p>
                                    <select class="form-control border border-black px-2" id="product_category" style="width:465px;">
                                        ${resultCate}
                                    </select>
                                    <p class="font-semibold mt-3">TÊN SẢN PHẨM:</p> <textarea class="px-2 form-control checkValidate" id="product_name" cols="60" rows="3" style="width:465px;"></textarea>
                                    <p class="error text-red-500 text-sm font-semibold"></p>
                                    <p class="font-semibold mt-3">ẢNH</p> <input type="file" class="checkValidate" id="product_image">
                                    <p class="error text-red-500 text-sm font-semibold"></p>
                                </div>
                                <div class="ml-24" style="width: 700px;">
                                    <p class="font-semibold">GIÁ TIỀN</p> <input type="number" class="px-2 form-control checkValidate" id="product_price" style="width: 465px; height: 30px;">
                                    <p class="error text-red-500 text-sm font-semibold"></p>
                                    <p class="font-semibold mt-3">GIÁ KHUYẾN MÃI</p> <input type="number" class="px-2 form-control checkValidate" id="product_priceSale" style="width: 465px; height: 30px;">
                                    <p class="error text-red-500 text-sm font-semibold"></p>
                                    <p class="font-semibold mt-3">BẢO HÀNH</p> <input type="text" class="px-2 form-control checkValidate" id="product_guarantee" style="width: 465px; height: 30px;">
                                    <p class="error text-red-500 text-sm font-semibold"></p>
                                    <p class="font-semibold mt-3">SỐ LƯỢNG</p> <input type="number" class="px-2 form-control checkValidate" id="product_quantity" style="width: 465px; height: 30px;">
                                    <p class="error text-red-500 text-sm font-semibold"></p>
                                </div>
                            </div>
                            <div class="mx-auto" style="width:1150px;">
                                <div class="divcheckValidate mt-5">
                                    <p class="font-semibold">CẤU HÌNH</p>
                                    <textarea class="px-2 mx-auto checkValidate" id="product_config" cols="60" rows="5" ></textarea>
                                    <p class="error text-red-500 text-sm font-semibold"></p>
                                </div>
                                <div class="divcheckValidate mt-5">
                                    <p class="font-semibold">ĐẶC ĐIỂM</p> 
                                    <textarea class="px-2 checkValidate" id="product_description" cols="60" rows="5" ></textarea>
                                    <p class="error text-red-500 text-sm font-semibold"></p>
                                </div>
                            </div>
                            <div class="text-center">
                                <input id="btn_add" class="text-center mt-5 px-3 py-2 text-white bg-red-600 rounded-full mt-4 mb-5 font-semibold hover:bg-red-700" type="submit" value="THÊM SẢN PHẨM" >
                            </div>
                        </form>
                    </div>
                    <div>
                        <div class="text-center mt-2 pb-5">
                            <a href="/#/listproduct"><button class="btn btn-primary" type="button">Danh sách sản phẩm</button></a>
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
    afterRender() {
        clickLogout();

        const textarea_product_config = document.querySelector('#product_config');
        ClassicEditor.create(textarea_product_config)
            .then(config => window.editor1 = config)
            .catch(error => console.log(error))
        const textarea_product_description = document.querySelector('#product_description');
        ClassicEditor.create(textarea_product_description)
            .then(description => window.editor2 = description)
            .catch(error => console.log(error))

        $$("#form_addProduct").addEventListener("submit", e => {
            e.preventDefault();

            var sumCheck = 0;
            var checkValidate = $$(".checkValidate");
            var errorValidate = $$(".error");
            console.log(checkValidate);
            for (let i = 0; i < checkValidate.length; i++) {
                if (checkValidate[i].value.trim() == "") {
                    sumCheck += 1;
                    errorValidate[i].innerHTML = "Không được để trống";
                } else {
                    errorValidate[i].innerHTML = "";
                }
            }

            if (sumCheck === 0) {
                textarea_product_config.value = editor1.getData();
                console.log(textarea_product_config.value);

                textarea_product_description.value = editor2.getData();
                console.log(textarea_product_description.value);

                const productImage = $$("#product_image").files[0];
                
                let storageRef = firebase.storage().ref(`images/${productImage.name}`);
                storageRef.put(productImage).then(function () {
                    storageRef.getDownloadURL().then((url) => {
                        const product = {
                            id: uuidv4(),
                            categoryId: $$("#product_category").value,
                            name: $$("#product_name").value,
                            image: url,
                            price: $$("#product_price").value,
                            priceSale: $$("#product_priceSale").value,
                            guarantee: $$("#product_guarantee").value,
                            quantity: $$("#product_quantity").value,
                            config: textarea_product_config.value,
                            description: textarea_product_description.value
                        }
                        productAPI.add(product);
                        reRender(listProduct, '#list-products');
                        window.location.hash = '/listproduct';
                    })
                })
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
        //  thang thu vien uuid de generator ra doan ma khong trung nhau
    }
}
export default ProductAddPage;