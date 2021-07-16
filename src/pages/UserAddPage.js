import authAPI from "../api/auth";
import { $$, reRender, clickLogout } from "../utils";
import { v4 as uuidv4 } from 'uuid'
import adminNavbar from "../component/adminNavbar";
import adminCategorySidebar from "../component/adminCategorySidebar";
import adminFooter from "../component/adminFooter";
import listUser from "../component/listUser";
import toast from 'toast-me';

const UserAddPage = {
    async render() {
        return `
        <body class="hold-transition sidebar-mini layout-fixed">
            <div class="wrapper">
                <!-- Navbar -->
                ${adminNavbar.render()}

                <!-- Main Sidebar Container -->
                ${await adminCategorySidebar.render()}
        
                <!-- Content Wrapper. Contains page content -->
                <div class="content-wrapper">
                    <div class="container mx-auto pt-5 ">
                        <h3 class="text-center font-bold pb-5 pt-4 text-xl">THÊM USER</h3>
                        <form id="form_addUser">
                            <div class="grid grid-cols-2 ">
                                <div class=" col-span-1" style="margin-left:300px;">
                                    <p class="mb-3 font-semibold"><i class="fas fa-user-tag mr-2"></i>Full Name</p><input class="px-2 py-1 rounded-md checkValidate" style="width:330px;" type="text" id="fullname">
                                    <p class="error text-red-500 text-sm font-semibold"></p>
                                    <p class="mb-3 mt-5 font-semibold"><i class="fas fa-user-circle mr-2"></i>Email</p><input class="px-2 py-1 rounded-md checkValidate" style="width:330px;" type="email" id="email">
                                    <p class="error text-red-500 text-sm font-semibold"></p>
                                </div>
                                <div class="ml-16 col-span-1">
                                    <p class="  mb-3 font-semibold"><i class="fas fa-key mr-2"></i>Password</p><input class="px-2 py-1 rounded-md checkValidate" style="width:330px;" type="password" id="password" minlength="6"> <br>
                                    <p class="error text-red-500 text-sm font-semibold"></p>
                                    <p class=" mt-5  mb-3 font-semibold"><i class="fas fa-key mr-2"></i>Conffirm Password</p><input class="px-2 py-1 rounded-md checkValidate" style="width:330px;" type="password" id="repassword" minlength="6"> <br>
                                    <p class="error text-red-500 text-sm font-semibold"></p>
                                    <p class="errorRepassword text-red-500 text-sm font-semibold"></p>
                                </div>
                            </div>
                            <div class="text-center mt-3">
                                <p class=" mt-5 font-semibold"><i class="fas fa-user-shield mr-2"></i>Quyền hạn</p>
                                <select id="permission" class="w-64 mt-3 h-8 rounded-md">
                                    <option value="customer">Khách hàng</option>
                                    <option value="admin">Quản trị</option>
                                </select>
                            </div>
                            <div id="alert" class="mt-3 text-center mx-auto" style="width: 350px;" role="alert"></div>
                            <div class="text-center mt-3">
                                <input class="mb-4 px-5 py-1 rounded-lg font-semibold bg-blue-500 btn btn-primary" type="submit" value="ĐĂNG KÝ" id="btn_signup" style="margin-top: 20px;">
                            </div>
                        </form>
                    </div>
                <div>
                <div class="text-center mt-2">
                    <a href="/#/listcategory"><button class="btn btn-primary" type="button">Tất cả USER </button></a>
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
        $$("#form_addUser").addEventListener("submit", e => {
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
                    name: $$('#fullname').value,
                    email: $$('#email').value,
                    password: $$('#password').value,
                    permission: $$('#permission').value
                }
                if ($$('#password').value == $$('#repassword').value) {
                    authAPI.signup(newUser)
                        .then(() => {
                            toast(
                                'Đăng ký thành công!',
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
                    $$(".errorRepassword").innerHTML = "Mật khẩu chưa trùng khớp!"
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
    //  thang thu vien uuid de generator ra doan ma khong trung nhau
}

export default UserAddPage;