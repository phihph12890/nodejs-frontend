import adminNavbar from "../component/adminNavbar";
import adminFooter from "../component/adminFooter";
import listCategory from "../component/listCategory";
import listOrderAdmin from "../component/listOrderAdmin";
import adminOrderSidebar from "../component/adminOrderSidebar";
import { isAuthenticated, logout, clickLogout } from "../utils";
import orderDetail from "../component/orderDetail";

const OrderDetailPageAdmin = {
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
                        <h2 class="text-center font-bold text-xl">THÔNG TIN ĐƠN HÀNG</h2>
                    </div>
                    <div class="text-center mx-auto" id="order-in4">
                        ${await orderDetail.render()}
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
export default OrderDetailPageAdmin;