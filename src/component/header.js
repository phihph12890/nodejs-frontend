import { isAuthenticated, logout } from "../utils";
import authAPI from "../api/auth";
import Cart from "./cart";

const header = {
    async render() {
        const sessionUser = async () => {
            if (isAuthenticated() == false) {
                return `
                    <div class="ml-5">
                        <a  class="ml-2" href="/#/signin"><span class="text-red-600 text-lg"><i class="fas fa-user"></i></span>
                        <p id="login" class="text-sm font-medium">Login</p></a>
                    </div>
                `
            } else {
                const { data: user } = await authAPI.read(isAuthenticated().sub);
                console.log(user);
                if (user.permission == "admin") {
                    return `
                    <div class="ml-3 group cursor-pointer ">
                        <span class="text-red-600 text-lg" style="margin-left:30px;"><i class="fas fa-user"></i></span>
                        <p class="text-sm font-medium ml-2 relative">Hi <span class="text-blue-600">${user.name}</span></p>
                        <div class="hidden group-hover:block absolute z-50 bg-white rounded-md border border-blue-600" style="top:75px; ">
                            <a href="/#/listproduct"><button class="hover:bg-gray-200 rounded-t-md py-3 text-sm font-semibold text-black hover:text-gray-700" style="padding: 0 55.6px;">Quản trị </button></a><br>
                            <a href="/#/order"><button class="hover:bg-gray-200 border-b border-t rounded-t-md py-3 text-sm font-semibold text-black hover:text-gray-700" style="padding: 0 50.2px;">Đơn hàng</button></a><br>
                            <button class="cursor-pointer hover:bg-gray-200 rounded-b-md px-10 text-sm py-3 font-semibold text-black hover:text-gray-700" style="padding: 0 49px;" id="logout">Đăng xuất</button>
                        </div>
                    </div>
                    `
                } else {
                    return `
                    <div class="ml-3 text-center cursor-pointer group">
                        <span class="mr-4 text-red-600 text-lg text-center" style="margin-left:30px;"><i class="fas fa-user"></i></span>
                        <p class="text-sm font-medium ml-2">Hi <span class="text-blue-600">${user.name}</span></p>
                        <div class="hidden group-hover:block absolute z-50 bg-white rounded-md border border-black"style="top:75px">
                        <a href="/#/order"><button class="hover:bg-gray-200 rounded-t-md py-3 text-sm font-semibold text-black hover:text-gray-700" style="padding: 0 50.2px;">Đơn hàng</button></a><br>
                            <button class="cursor-pointer hover:bg-gray-200 rounded-b-md px-10 text-sm py-3 font-semibold text-black hover:text-gray-700" style="padding: 0 49px;" id="logout">Đăng xuất</button>
                        </div>
                    </div>
                    `
                }
            }
        }
        return /*html */ `
            <div class="header bg-gray-100">
            <div class=" container mx-auto flex py-1 justify-between items-center " style="max-width: 1200px;">
                <div class="">
                    <a href="/"><img class="h-24 w-40" src="https://laptopaz.vn/media/banner/logo_laptopaz%20(2).jpg" alt=""></a>
                </div>
                <div class="">
                    <form>
                        <input class="search-input py-2 px-3 border border-blue-500 text-sm outline-none" id="inputSearch" type="text" placeholder="Bạn muốn tìm sản phẩm gì?" style="width:370px;">
                        <input class="-ml-2 bg-blue-500 border border-blue-500 text-white text-sm px-2 py-2 cursor-pointer" id="btn_search" type="submit" value="Search">
                    </form>
                </div>
                <div class="text-center text-black text-base font-semibold">
                    <p class="text-red-600 text-sm"><span><i class="fas fa-phone-alt"></i></span> HOTLINE</p> 
                    <p class="text-sm ">09865.02468 - 08586.02468</p>
                    
                    <p class="text-sm">Địa chỉ: Số 18, ngõ 121, Thái Hà, Đống Đa, Hà Nội</p>
                    <div class="bg-blue-500 rounded-md text-white mt-1">
                        <a class="mr-8 " href="/#/about">Giới thiệu</a>
                        <a class="" href="/#/contact">Liên hệ</a>
                    </div>
                </div>
                <div class="items-center">
                    <div class="flex">
                        <div class="text-center">
                            <a href="/#/shopcart">
                                <span class="text-red-600 text-lg cursor-pointer"><i class="fas fa-cart-plus"></i></span>
                                <p id="cart" class="text-sm font-medium cursor-pointer">Giỏ hàng</p>
                                <span class="absolute rounded-full px-1.5 bg-red-600 text-sm text-white" id="totalCart" style="top:20px;margin-left:3px"></span>
                            </a>
                        </div>
                        ${await sessionUser()}
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="marquee bg-blue-500 ">
            <div class="mx-auto pt-1" style="width:1200px;">
                <marquee scrollamount = 10 class="text-white font-semibold">
                    <span>Địa chỉ: Số 18, ngõ 121, Thái Hà, Đống Đa, Hà Nội.</span> 
                    <span class="ml-8">Hotline: 09865.02468 - 08586.02468.</span>
                    <span class="ml-8">Email: hotrolaptopaz@gmail.com.</span>
                    <span class="ml-8">Hỗ trợ kỹ thuật: 0989.52.4004</span>
                </marquee>
            </div>
        </div>
        `
    }
}
export default header;