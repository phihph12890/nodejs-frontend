import adminNavbar from "../component/adminNavbar";
import adminFooter from "../component/adminFooter";
import listCategory from "../component/listCategory";
import adminCategorySidebar from "../component/adminCategorySidebar";
import { isAuthenticated, logout, clickLogout } from "../utils";

const CategoryManagerPage = {
    async render() {
        return `
        <body class="hold-transition sidebar-mini layout-fixed">
            <div class="wrapper">
                <!-- Navbar -->
                ${ adminNavbar.render()}
        
                <!-- Main Sidebar Container -->
                ${await adminCategorySidebar.render()}
        
                <!-- Content Wrapper. Contains page content -->
                <div class="content-wrapper">
                    <div class="py-5">
                        <h2 class="text-center font-bold text-xl mb-5">QUẢN TRỊ DANH MỤC</h2>
                        <div>
                            <div class="text-center">
                                <a href="/#/addcategory"><button class="btn btn-primary" type="button">Thêm danh mục</button></a>
                            </div>
                        </div>
                    </div>
                    <div id="list-categories">
                        ${await listCategory.render()}
                    </div>
                </div>
                <!-- /.content-wrapper -->
                ${ adminFooter.render()}
            </div>
            <!-- ./wrapper -->
        </body>
        `
    },
    async afterRender() {
        clickLogout();
        return `${await listCategory.afterRender()}`
        
    }
}
export default CategoryManagerPage;