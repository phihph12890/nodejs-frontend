import { type } from "jquery";
import { isAuthenticated } from "../utils";


const Cart = {
    render() {
        const sessionCart = () => {
            if (isAuthenticated() == false) {
                return `
                    <div class="text-center">
                        <a href="/#/shopcart">
                            <span class="text-red-600 text-lg cursor-pointer"><i class="fas fa-cart-plus"></i></span>
                            <p class="text-sm font-medium cursor-pointer alert-cart2">Giỏ hàng</p>
                            <span class="absolute rounded-full px-1.5 bg-red-600 text-sm text-white" id="totalCart" style="top:20px;margin-left:3px"></span>
                        </a>
                    </div>
                `
            } else {
                return `
                    <div class="text-center">
                        <a href="/#/shopcart">
                            <span class="text-red-600 text-lg cursor-pointer"><i class="fas fa-cart-plus"></i></span>
                            <p id="cart" class="text-sm font-medium cursor-pointer">Giỏ hàng</p>
                            <span class="absolute rounded-full px-1.5 bg-red-600 text-sm text-white" id="totalCart" style="top:20px;margin-left:3px"></span>
                        </a>
                    </div>
                `
            }
        }
        return `
            <div>
                ${sessionCart()}
            </div>
        `
    },
    afterRender() {
        
    }
}
export default Cart;