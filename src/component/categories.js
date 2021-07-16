import categoryAPI from '../api/categoryAPI';

const categories = {
    async render() {
        const { data: categories } = await categoryAPI.list();
        // console.log(categories);
        const result = categories.map(category => {
            return `
                <li class="screenCategory" data-id="${category._id}">
                    <a href="/#/category/${category._id}"  class="block text-sm font-semibold px-8 py-3 border-b border-l border-r border-gray-300 hover:bg-blue-300 hover:text-white">${category.name}</a>
                </li>
            `
        }).join('')
        return /*html */ `
        <div class=" shadow-lg">
            <h2 class="bg-blue-500 text-white text-base uppercase py-3 px-3 rounded-t-md ">
                <span><i class="fas fa-bars px-4"></i></span>
                <span class="ml-3 font-semibold">Danh mục</span>
            </h2>
            <ul>
                ${result}
            </ul>
        </div>
        `
    }
}
export default categories;