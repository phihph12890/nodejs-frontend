import adminNavbar from "../component/adminNavbar";
import adminFooter from "../component/adminFooter";
import listCategory from "../component/listCategory";
import listOrderAdmin from "../component/listOrderAdmin";
import adminOrderSidebar from "../component/adminOrderSidebar";
import { isAuthenticated, logout, clickLogout } from "../utils";

const OrderManagerPage = {
    async render() {
        return `
        <body class="hold-transition sidebar-mini layout-fixed">
            <div class="wrapper">
                <!-- Navbar -->
                ${ adminNavbar.render()}
        
                <!-- Main Sidebar Container -->
                ${await adminOrderSidebar.render()}
        
                <!-- Content Wrapper. Contains page content -->
                <div class="content-wrapper">
                    <div class="py-5">
                        <h2 class="text-center font-bold text-xl mb-5">QUẢN TRỊ ĐƠN HÀNG</h2>
                    </div>
                    <div class="text-center mx-auto" id="list_order_admin">
                        ${await listOrderAdmin.render()}
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
        return `${await listOrderAdmin.afterRender()}`
        
    }
}
export default OrderManagerPage;