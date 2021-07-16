import authAPI from "../api/auth";
import { parseRequestUrl, $$, reRender, clickLogout } from "../utils";
import { v4 as uuidv4 } from 'uuid'
import adminNavbar from "../component/adminNavbar";
import adminUserSidebar from "../component/adminUserSidebar";
import adminFooter from "../component/adminFooter";
import listUser from "../component/listUser";
import toast from 'toast-me';

const UserEditPage = {
    async render() {
        const { id } = parseRequestUrl();
        const { data: user } = await authAPI.read(id);
        console.log(user);
        return `
        <body class="hold-transition sidebar-mini layout-fixed">
            <div class="wrapper">
                <!-- Navbar -->
                ${adminNavbar.render()}

                <!-- Main Sidebar Container -->
                ${await adminUserSidebar.render()}
        
                <!-- Content Wrapper. Contains page content -->
                <div class="content-wrapper">
                    <div class="container mx-auto pt-5 ">
                        <h3 class="text-center font-bold pb-5 pt-4 text-xl">SỬA USER</h3>
                        <form id="form_editUser">
                            <div>
                                <div class="" style="margin-left:530px;">
                                    <p class="mb-2 font-semibold"><i class="fas fa-user-tag mr-2"></i>Full Name</p><input class="px-2 py-1 rounded-md form-control checkValidate" style="width:330px;" type="text" id="fullname" value="${user.name}">
                                    <p class="error text-red-500 text-sm font-semibold"></p>
                                    <p class="mb-2 mt-4 font-semibold"><i class="fas fa-user-circle mr-2"></i>Email</p><input class="px-2 py-1 rounded-md checkValidate border" style="width:330px;" type="email" id="email" value="${user.email}" disabled>
                                    <p class="error text-red-500 text-sm font-semibold"></p>
                                </div>
                                
                            </div>
                            <div class=""style="margin-left:530px;">
                                <p class=" mt-4 font-semibold"><i class="fas fa-user-shield mr-2"></i>Quyền hạn</p>
                                <select id="permission" class="w-64 mt-2 h-10 rounded-md form-control" style="width:330px;">
                                    <option value="customer">Khách hàng</option>
                                    <option value="admin">Quản trị</option>
                                </select>
                            </div>
                            <div id="alert" class="mt-3 text-center mx-auto" style="width: 350px;" role="alert"></div>
                            <div class="text-center mt-3">
                                <input class="mb-4 px-5 py-1 rounded-lg font-semibold bg-blue-500 btn btn-primary" type="submit" value="THAY ĐỔI" id="btn_signup" style="margin-top: 20px;">
                            </div>
                        </form>
                    </div>
                <div>
                <div class="text-center mt-2">
                    <a href="/#/listuser"><button class="btn btn-primary" type="button">Tất cả USER </button></a>
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
        const { data: user } = await authAPI.read(id);
        console.log(user);
        $$("#form_editUser").addEventListener("submit", e => {
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
                const newUser = {
                    ...user,
                    name: $$('#fullname').value,
                    permission: $$("#permission").value
                }

                authAPI.update(id, newUser)
                    .then(() => {
                        toast(
                            'Sửa thông tin thành công!',
                            { duration: 2500 },
                            {
                                // label: 'Confirm',
                                action: () => alert('Cool!'),
                                class: 'my-custom-class', // optional, CSS class name for action button
                            },
                        );
                        reRender(listUser, '#list-users');
                        window.location.hash = '/listuser';
                    })
                    .catch(error => {
                        $$('#alert').innerHTML = `
                                <div class="alert bg-red-400 text-white">
                                    ${error.response.data}
                                </div>
                                `;
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
    }
    //  thang thu vien uuid de generator ra doan ma khong trung nhau
}

export default UserEditPage;