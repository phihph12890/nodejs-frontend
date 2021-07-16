import { $$, reRender } from "../utils";
import authAPI from "../api/auth";
import toast from 'toast-me';

const SignupPage = {
    render() {
        return `
        <div class="container mx-auto bg-gray-200 border border-gray-300 mt-24" style="width:600px;" >
            <form action="" id="form_addUser">
                <h2 class="text-center pt-5 text-3xl font-semibold">ĐĂNG KÝ</h2>
                <div class="ml-32 mt-5">
                    <p class="mb-1"><i class="fas fa-user-tag mr-2"></i>Full Name</p><input class="px-2 py-1 rounded-md checkValidate" style="width:330px;" type="text" id="fullname">
                    <p class="error text-red-500 text-sm font-semibold"></p>
                    <p class="mb-1 mt-3"><i class="fas fa-user-circle mr-2"></i>Email</p><input class="px-2 py-1 rounded-md checkValidate" style="width:330px;" type="email" id="email">
                    <p class="error text-red-500 text-sm font-semibold"></p>
                    <p class="mt-3  mb-1"><i class="fas fa-key mr-2"></i>Password</p><input class="px-2 py-1 rounded-md checkValidate" style="width:330px;" type="password" id="password" minlength="6"> <br>
                    <p class="error text-red-500 text-sm font-semibold"></p>
                    <p class="mt-3  mb-1"><i class="fas fa-key mr-2"></i>Conffirm Password</p><input class="px-2 py-1 rounded-md checkValidate" style="width:330px;" type="password" id="repassword" minlength="6"> <br>
                    <p class="error text-red-500 text-sm font-semibold"></p>
                    <p class="errorRepassword text-red-500 text-sm font-semibold mx-auto"></p>
                </div>
                <div id="alert" class="mt-3 text-center mx-auto" style="width: 350px;" role="alert"></div>
                <div class="text-center mt-3">
                    <input class="mb-4 px-5 py-1 rounded-lg font-semibold bg-blue-500 btn btn-primary" type="submit" value="ĐĂNG KÝ" id="btn_signup" style="margin-top: 20px;">
                </div>
                <div class="text-center">
                    <button class="mb-5 px-5 py-1 rounded-lg font-semibold bg-blue-500 mx-auto btn btn-primary"><a href="/" class="hover:text-gray-300">Trở về trang chủ</a></button>
                </div>
                <div class="text-center border-t border-gray-300">
                    <div class="hover:bg-gray-300 py-2"><button class="font-semibold"><a href="/#/signin">Đã có tài khoản? Đăng nhập ngay</a></button></div>
                    
                </div>
            </form>
        </div>
        `
    },
    afterRender() {
        $$('#form_addUser').addEventListener("submit", e => {
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
                    permission: "customer"
                }
                console.log(newUser);
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
                            window.location.hash = '/signin';
                        })
                        .catch(error => {
                            $$('#alert').innerHTML = `
                            <div class="alert bg-red-400 text-white">
                                ${error.response.data}
                            </div>
                        `;
                        })
                } else {
                    $$('.errorRepassword').innerHTML = `
                            <div class="alert">
                                Mật khẩu không trùng khớp!
                            </div>
                        `;
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
export default SignupPage;