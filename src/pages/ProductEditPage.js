import categoryAPI from "../api/categoryAPI";
import productAPI from "../api/productAPI";
import { $$, parseRequestUrl, reRender, clickLogout } from "../utils";
import firebase from "../firebase";
import { v4 as uuidv4 } from 'uuid'
import adminNavbar from "../component/adminNavbar";
import adminProductSidebar from "../component/adminProductSidebar";
import adminFooter from "../component/adminFooter";
import listProduct from "../component/listProduct";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import toast from 'toast-me';

const ProductEditPage = {
    async render() {
        const { id } = parseRequestUrl();
        const { data: product } = await productAPI.read(id);
        console.log(product);

        const { data: categories } = await categoryAPI.listEdit(product.categoryId);
        console.log(categories);
        const resultCate = categories.map(categories => {
            return `
                <option value="${categories.id}" >
                    ${categories.name}
                </option>
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
                        <h3 class="text-center font-bold pb-4 text-xl">SỬA SẢN PHẨM</h3>
                        <form enctype="multipart/form-data" id="form_editProduct">
                            <div class="grid grid-cols-2 mt-4">
                                <div class="ml-48">
                                    <div class="hidden">
                                        <p>MÃ SẢN PHẨM</p> <input type="text" id="product_id" value ="${product.id}">
                                    </div>
                                    <p class="font-semibold">DANH MỤC SẢN PHẨM</p>
                                    <select class="border border-blac px-2 form-control" id="product_category" style="width:465px;">
                                        <option value="${product.categoryId}" >
                                            ${product.category.name}
                                        </option>
                                        ${resultCate}
                                    </select>
                                    <p class="font-semibold mt-3">TÊN SẢN PHẨM:</p> <textarea class="px-2 form-control checkValidate" id="product_name" cols="60" rows="2" style="width:465px;">${product.name}</textarea>
                                    <p class="error text-red-500 text-sm"></p>
                                    <p class="font-semibold mt-3">ẢNH</p> <img class="w-32 h-auto" src="${product.image}" alt="">
                                    <input type="file" class="px-2 mt-1" id="product_image">
                                </div>
                                <div class="ml-24">
                                    <p class="font-semibold">GIÁ TIỀN</p> <input type="number" class="px-2 form-control checkValidate" id="product_price" value ="${product.price}" style="width: 465px; height: 30px;">
                                    <p class="error text-red-500 text-sm"></p>
                                    <p class="font-semibold mt-5">GIÁ KHUYẾN MÃI</p> <input type="number" class="px-2 form-control checkValidate" id="product_priceSale" value ="${product.priceSale}"  style="width: 465px; height: 30px;">
                                    <p class="error text-red-500 text-sm"></p>
                                    <p class="font-semibold mt-5">BẢO HÀNH</p> <input type="text" class="px-2 form-control checkValidate" id="product_guarantee" value ="${product.guarantee}"  style="width: 465px; height: 30px;">
                                    <p class="error text-red-500 text-sm"></p>
                                    <p class="font-semibold mt-5">SỐ LƯỢNG</p> <input type="number" class="px-2 form-control checkValidate" id="product_quantity" value ="${product.quantity}"  style="width: 465px; height: 30px;">
                                    <p class="error text-red-500 text-sm"></p>
                                </div>
                            </div>
                            <div class="mx-auto" style="width:1150px;">
                                <p class="font-semibold mt-5">CẤU HÌNH</p> <textarea class="px-2 checkValidate" id="product_config" cols="60" rows="5">${product.config}</textarea>
                                <p class="error text-red-500 text-sm"></p>
                                <p class="font-semibold mt-5">ĐẶC ĐIỂM</p> <textarea class="px-2 checkValidate" id="product_description" cols="60" rows="5">${product.description}</textarea>
                                <p class="error text-red-500 text-sm"></p>
                            </div>
                            <div class="text-center">
                                <input class="text-center mt-5 px-3 py-2 text-white bg-red-600 rounded-full mt-4 mb-5 font-semibold hover:bg-red-700" type="submit" value="CẬP NHẬT" >
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
    async afterRender() {
        clickLogout();
        const { id } = parseRequestUrl();
        const { data: product } = await productAPI.read(id);

        const textarea_product_config = document.querySelector('#product_config');
        ClassicEditor.create(textarea_product_config)
            .then(config => window.editor1 = config)
            .catch(error => console.log(error))

        const textarea_product_description = document.querySelector('#product_description');
        ClassicEditor.create(textarea_product_description)
            .then(description => window.editor2 = description)
            .catch(error => console.log(error))

        $$('#form_editProduct').addEventListener("submit", function (e) {
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
                if ($$("#product_image").files.length == 0) {
                    const newProduct = {
                        ...product,
                        categoryId: $$("#product_category").value,
                        name: $$("#product_name").value,
                        image: `${product.image}`,
                        price: $$("#product_price").value,
                        priceSale: $$("#product_priceSale").value,
                        guarantee: $$("#product_guarantee").value,
                        quantity: $$("#product_quantity").value,
                        config: textarea_product_config.value,
                        description: textarea_product_description.value
                    }
                    console.log("old", product);
                    console.log("new", newProduct);
                    productAPI.update(id, newProduct);
                    reRender(listProduct, '#list-products');
                    window.location.hash = '/listproduct';
                } else {
                    const productImage = $$("#product_image").files[0];
                    let storageRef = firebase.storage().ref(`images/${productImage.name}`);
                    storageRef.put(productImage).then(function () {
                        storageRef.getDownloadURL().then((url) => {
                            const newProduct = {
                                ...product,
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
                            console.log("old", product);
                            console.log("new", newProduct);
                            productAPI.update(id, newProduct);
                            reRender(listProduct, '#list-products');
                            window.location.hash = '/listproduct';
                        })
                    })
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