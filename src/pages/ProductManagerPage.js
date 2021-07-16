import productAPI from "../api/productAPI";
import adminNavbar from "../component/adminNavbar";
import adminProductSidebar from "../component/adminProductSidebar";
import adminFooter from "../component/adminFooter";
import listProduct from "../component/listProduct";
import { clickLogout } from "../utils";

const ProductManagerPage = {
    async render() {
        return `
        <body class="hold-transition sidebar-mini layout-fixed">
            <div class="wrapper">
                <!-- Navbar -->
                ${adminNavbar.render()}
        
                <!-- Main Sidebar Container -->
                ${await adminProductSidebar.render()}
        
                <!-- Content Wrapper. Contains page content -->
                <div class="content-wrapper">
                    <div class="py-5">
                        <h2 class="text-center font-bold text-xl mb-5">QUẢN TRỊ SẢN PHẨM</h2>
                        <div>
                            <div class="text-center">
                                <a href="/#/addproduct"><button class="btn btn-primary" type="button">Thêm sản phẩm</button></a>
                            </div>
                        </div>
                    </div>
                    <div id="list-products">
                        ${await listProduct.render()}
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
        return `${await listProduct.afterRender()}`
    }
}
export default ProductManagerPage;