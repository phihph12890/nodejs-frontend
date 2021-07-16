import jwt_decode from "jwt-decode";
import productAPI from "./api/productAPI";
import toast from 'toast-me';

export const parseRequestUrl = () => {
    const url = window.location.hash.toLowerCase();

    const request = url.split('/'); 
    // console.log(request);
    return {
        resource: request[1],
        id: request[2],
        action: request[3]
    }
}
export const $$ = selector => {
    let elements = document.querySelectorAll(selector);
    return elements.length == 1 ? elements[0] : [...elements];
}
export const reRender = async (component, position = "") => {
    // position = #list-products 
    // component = ListProduct -> #list-product
    if (position) {
        console.log(component)
        $$(position).innerHTML = await component.render();
        console.log(position)
    } else {
        $$("#content").innerHTML = await component.render();
    }
    await component.afterRender();
}
export const prices = (x) => {
    return x = x.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND'
    });
}
export const authenticated = ({ accessToken }) => {
    const user = jwt_decode(accessToken);
    if (typeof window !== 'undefined') {
        return localStorage.setItem('user', JSON.stringify(user));
    }
}
export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false
    }
    if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'))
    } else {
        return false
    }
}
export const logout = () => {
    if (localStorage.getItem('user')) {
        return localStorage.removeItem('user');
    }
}
export const clickLogout = () => {
    if (document.querySelector('#logout') != undefined) {
        document.querySelector('#logout').onclick = () => {
            logout();
            localStorage.removeItem('cartNumber');
            localStorage.removeItem('cart');
            localStorage.removeItem('totalPrice');
            window.location.hash = '/signin';
        }
    }
}
export const addToCart = (id, name, image, price, cateId, cate_name) => {
    let cartStorage = localStorage.getItem('cart');
    let screenCart = null;
    if (cartStorage == null) {
        screenCart = [];
    } else {
        screenCart = JSON.parse(cartStorage);
        console.log(screenCart);
    }

    let item = {
        id: id,
        name: name,
        image: image,
        price: price,
        cateId: cateId,
        cate_name: cate_name
    };

    let existed = screenCart.findIndex(ele => ele.id == item.id);
    if (existed == -1) {
        item.quantity = 1;
        screenCart.push(item);
    } else {
        console.log(screenCart);
        screenCart[existed].quantity++;
    }
    console.log(item);
    localStorage.setItem('cart', JSON.stringify(screenCart));
    toast(
        'Thêm vào giỏ hàng thành công!',
        { duration: 2500 },
        {
            // label: 'Confirm',
            action: () => alert('Cool!'),
            class: 'my-custom-class', // optional, CSS class name for action button
        },
    );
}

export const getTotalItemOnCart = () => {
    let cartStorage = localStorage.getItem('cart');
    let screenCart = null;
    if (cartStorage == null) {
        screenCart = [];
    } else {
        screenCart = JSON.parse(cartStorage);
    }
    let totalItems = 0
    screenCart.forEach(element => {
        totalItems += element.quantity;
    });
    localStorage.setItem('cartNumber', totalItems);
    return totalItems;
}
export const productSearch = () => {
    if($$('#btn_search')){
        $$("#btn_search").addEventListener("click", function (e) {
            e.preventDefault();
            
            const textSearch = $$("#inputSearch").value;
            window.location.hash = `/search/${textSearch}`;
        })
    }
}

export const onLoadCartNumber = () => {
    let cartNumber = localStorage.getItem('cartNumber');
    $$("#totalCart").textContent = cartNumber;
}




