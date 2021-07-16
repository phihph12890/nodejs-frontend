import 'owl.carousel';
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import {
    parseRequestUrl,
    $$,
    onLoadCartNumber,
    productSearch
} from "./utils";
import ProductPage from "./pages/product";
import ProductDetailPage from "./pages/product-detail";
import CategoryPage from "./pages/category"
import ProductAddPage from './pages/ProductAddPage';
import ProductManagerPage from './pages/ProductManagerPage';
import ProductEditPage from './pages/ProductEditPage';
import ContactPage from './pages/contact';
import CategoryAddPage from './pages/CategoryAddPage';
import CategoryManagerPage from './pages/CategoryManagerPage';
import CategoryEditPage from './pages/CategoryEditPage';
import UserManagerPage from './pages/UserManagerPage';
import SignupPage from './pages/signup';
import SigninPage from './pages/signin';
import UserAddPage from './pages/UserAddPage';
import UserEditPage from './pages/UserEditPage';
import Error404Page from './pages/Error404Page';
import ShopCartPage from './pages/ShopCart';
import ProductSearchPage from './pages/productSearch';
import OrderPage from './pages/orderPage';
import OrderManagerPage from './pages/OrderManagerPage';
import OrderEditPage from './pages/OrderEditPage';
import OrderDetailPageAdmin from './pages/OrderDetailPageAdmin';
import orderDetail from './component/orderDetail';
import OrderDetailPage from './pages/orderDetailPage';

const routes = {
    '/': ProductPage,
    '/home': HomePage,
    '/about': AboutPage,
    '/contact': ContactPage,
    '/product': ProductPage,
    '/product/:id': ProductDetailPage,
    '/category/:id': CategoryPage,
    '/addproduct': ProductAddPage,
    '/listproduct': ProductManagerPage,
    '/editproduct/:id': ProductEditPage,
    '/addcategory': CategoryAddPage,
    '/listcategory': CategoryManagerPage,
    '/editcategory/:id': CategoryEditPage,
    '/listuser': UserManagerPage,
    '/adduser': UserAddPage,
    '/edituser/:id': UserEditPage,
    '/signup': SignupPage,
    '/signin': SigninPage,
    '/error404': Error404Page,
    '/shopcart': ShopCartPage,
    '/search/:id': ProductSearchPage,
    '/order': OrderPage,
    '/listorder': OrderManagerPage,
    '/editorder/:id': OrderEditPage,
    '/orderdetailadmin/:id': OrderDetailPageAdmin,
    '/orderdetail/:id': OrderDetailPage,
}

const router = async () => {
    const { resource, id } = parseRequestUrl();
    const parseUrl = (resource ? `/${resource}` : '/') + (id ? `/:id` : '');
    console.log(parseUrl);
    const page = routes[parseUrl] ? routes[parseUrl] : Error404Page;
    // console.log(routes[parseUrl].render());
    document.querySelector('#content').innerHTML = await page.render();

    if (page.afterRender) {
        await page.afterRender();
    }

    await $('.owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true
    });
    onLoadCartNumber();
}

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);