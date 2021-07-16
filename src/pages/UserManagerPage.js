import adminNavbar from "../component/adminNavbar";
import adminFooter from "../component/adminFooter";
import listUser from "../component/listUser";
import adminUserSidebar from "../component/adminUserSidebar";
import { clickLogout } from "../utils";

const UserManagerPage = {
    async render() {
        return `
        <body class="hold-transition sidebar-mini layout-fixed">
            <div class="wrapper">
                <!-- Navbar -->
                ${adminNavbar.render()}
        
                <!-- Main Sidebar Container -->
                ${await adminUserSidebar.render()}
        
                <!-- Content Wrapper. Contains page content -->
                <div class="content-wrapper bg-gray-100">
                    <div class="py-5">
                        <h2 class="text-center font-bold text-xl mb-5">QUẢN TRỊ USER</h2>
                        <div>
                            <div class="text-center">
                                <a href="/#/adduser"><button class="btn btn-primary" type="button">Thêm User</button></a>
                            </div>
                        </div>
                    </div>
                    <div id="list-users">
                        ${await listUser.render()}
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
        return `${await listUser.afterRender()}`
    }
}
export default UserManagerPage;