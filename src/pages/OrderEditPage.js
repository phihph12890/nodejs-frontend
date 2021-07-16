import categoryAPI from "../api/categoryAPI";
import orderAPI from "../api/orderAPI";
import { $$, parseRequestUrl, reRender } from "../utils";
import firebase from "../firebase";
import { v4 as uuidv4 } from 'uuid'
import adminNavbar from "../component/adminNavbar";
import listOrderAdmin from "../component/listOrderAdmin";
import adminOrderSidebar from "../component/adminOrderSidebar";
import adminFooter from "../component/adminFooter";
import listCategory from "../component/listCategory";
import { isAuthenticated, logout, clickLogout } from "../utils";
import toast from 'toast-me';

const OrderEditPage = {
    async render() {
        const { id } = parseRequestUrl();
        const { data: order } = await orderAPI.get(id);
        console.log(order);

        return `
        <body class="hold-transition sidebar-mini layout-fixed">
            <div class="wrapper">
                <!-- Navbar -->
                ${adminNavbar.render()}

                <!-- Main Sidebar Container -->
                ${await adminOrderSidebar.render()}
        
                <!-- Content Wrapper. Contains page content -->
                <div class="content-wrapper">
                    <div class="container mx-auto pt-5 text-center">
                        <h3 class="text-center font-bold pb-4 text-xl">SỬA TRẠNG THÁI ĐƠN HÀNG</h3>
                        <form enctype="multipart/form-data" class="text-center" id="form_editOrder">
                            <p class="mt-10 font-semibold">Trạng thái: </p> 
                            <select class="form-control mx-auto mt-2" name="" id="status" style="width:200px;">
                                <option value="CHƯA DUYỆT">CHƯA DUYỆT</option>
                                <option value="ĐÃ DUYỆT">ĐÃ DUYỆT</option>
                                <option value="ĐÃ HOÀN THÀNH">ĐÃ HOÀN THÀNH</option>
                            </select>
                            <p class="error text-red-500 text-sm font-semibold"></p>
                            <input type="submit" value="Sửa trạng thái" name="btn_themdm" class="px-3 py-2 text-white bg-red-600 rounded-full mt-4 mb-5 font-semibold hover:bg-red-700">
                        </form>
                    </div>
                <div>
                <div class="text-center mt-2">
                    <a href="/#/listorder"><button class="btn btn-primary" type="button">Tất cả đơn hàng</button></a>
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
        const { data: order } = await orderAPI.get(id);
        console.log(order);

        $$('#form_editOrder').addEventListener("submit", function (e) {
            e.preventDefault();

            const newStatus = {
                ...order,
                status: $$("#status").value,
            }
            console.log("old", order);
            console.log("new", newStatus);
            orderAPI.update(id, newStatus);
            reRender(listOrderAdmin, '#list_order_admin');
            window.location.hash = '/listorder';

        })
    }
}
export default OrderEditPage;