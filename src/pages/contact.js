import header from '../component/header';
import banner from '../component/banner';
import footer from '../component/footer';
import { $$, prices, logout, clickLogout, productSearch } from '../utils';

const ContactPage = {
    async render() { /*html*/
        return ` 
            ${await header.render()}
            <div class="div-content bg-gray-100 pb-8">
                <div class="content bg-white mx-auto pb-5 px-3 pt-4" style="max-width: 1200px">
                    <div>
                        <h2 class="text-3xl uppercase font-semibold">Liên hệ</h2>
                        <div class="mx-auto mt-4">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.863981044334!2d105.74459841475554!3d21.038127785993286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b991d80fd5%3A0x53cefc99d6b0bf6f!2sFPT%20Polytechnic%20Hanoi!5e0!3m2!1sen!2s!4v1622259329215!5m2!1sen!2s"
                                width="100%s"
                                height="500"
                                style="border: 0"
                                allowfullscreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                    <div>
                        <h2 class="text-2xl uppercase font-semibold text-center mt-4 mb-4">Liên hệ với chúng tôi</h2>
                        <div class="grid grid-cols-2 gap-8 px-20">
                            <div>
                                <div class="shadow-sm">
                                    <img src="https://laptopaz.vn/media/about/2912_IMG_E2367.JPG" alt="" />
                                </div>
                                <h4 class="font-semibold mt-8">CÔNG TY TNHH TIN HỌC CÔNG NGHỆ AZ VIỆT NAM - <span class="text-blue-500">LAPTOP</span><span class="text-red-500">AZ</span></h4>
                                <p class="mt-4">🏪 Địa chỉ: Số 18, ngõ 121, Thái Hà, Đống Đa, TP Hà Nội</p>
                                <p class="mt-4">📲 Kinh doanh: 09865.02468 - 08586.02468</p>
                                <p class="mt-4">📲 Kỹ thuật: 08289.02468 - 0989.52.4004</p>
                                <p class="mt-4">🌐 Website: <a class="hover:text-blue-500" href="">https://laptopaz.vn/</a></p>
                                <p class="mt-4">
                                    <span style="margin-left: 2px"><i class="fas fa-envelope"></i></span><span> Email: </span
                                    ><a href="#" class="text-blue-700 hover:text-blue-500"> hotrolaptopaz@gmail.com</a>
                                </p>
                                <p class="mt-4">🔴 Thời gian làm việc: 8h30h - 21h30 tất cả các ngày trong tuần</p>
                            </div>
                            <div class="ml-16">
                                <form action="">
                                    <p class="font-semibold">Tên của bạn</p>
                                    <input class="border mt-2 bg-gray-100 form-control" type="text" style="width: 400px; height: 30px" />
                                    <p class="font-semibold mt-4">Email</p>
                                    <input class="border mt-2 bg-gray-100 form-control" type="email" style="width: 400px; height: 30px" />
                                    <p class="font-semibold mt-4">Số điện thoại</p>
                                    <input class="border mt-2 bg-gray-100 form-control" type="number" style="width: 400px; height: 30px" />
                                    <p class="font-semibold mt-4">Tiêu đề</p>
                                    <input class="border mt-2 bg-gray-100 form-control" type="text" style="width: 400px; height: 30px" />
                                    <p class="font-semibold mt-4">Your message (optional)</p>
                                    <textarea class="border bg-gray-100 form-control" name="" id="" cols="53" rows="4"></textarea>
                                    <button class="bg-blue-600 text-white px-6 py-2 rounded-md mt-3 hover:bg-blue-800">GỬI</button>
                                </form>
                                <div>
                                    <h2 class="font-semibold mt-8">KẾT NỐI VỚI CHÚNG TÔI</h2>
                                    <div class="mt-3">
                                        <a href=""><i class="text-3xl fab fa-facebook-square"></i></a>
                                        <a href=""><i class="text-3xl ml-2 fab fa-instagram-square"></i></a>
                                        <a href=""><i class="text-3xl ml-2 fab fa-facebook-messenger"></i></a>
                                        <a href=""><i class="text-3xl ml-2 fab fa-twitter-square"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ${footer.render()}
        `
    },
    afterRender() {
        clickLogout();
        productSearch();
    }
}
export default ContactPage;