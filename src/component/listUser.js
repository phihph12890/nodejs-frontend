import authAPI from "../api/auth";
import { $$, reRender, isAuthenticated } from "../utils";
import toast from 'toast-me';

const listUser = {
    async render() {
        const { data: users } = await authAPI.list();
        return `
        <div class="pb-10 ">
            <table class="table mx-auto" style="max-width: 900px">
                <thead>
                    <tr class="text-center">
                        <th scope="col">STT</th>
                        <th scope="col">HỌ VÀ TÊN</th>
                        <th scope="col">EMAIL</th>
                        <th scope="col">QUYỀN HẠN</th>
                        <th class="text-center" colspan="2" scope="col">TUỲ CHỌN</th>
                    </tr>
                </thead>
                <tbody>
                    ${users.map((user, index) => {
                        return `
                            <tr>
                                <td scope="row"><div>${index + 1}</div></td>
                                <td><div class="pt-1 px-5" style="width: 200px">${user.name}</div></td>
                                <td><div class="pt-1 px-10">${user.email}</div></td>
                                <td><div class="pt-1 px-10">${user.permission}</div></td>
                                <td style="width: 50px;">
                                    <div><a href="/#/edituser/${user.id}" class="text-sm px-1 border border-gray-600 rounded-lg bg-blue-500 hover:bg-blue-700 text-white btn btn-primary"><i class="px-1 far fa-edit"></i></a></div>
                                </td>
                                <td>
                                    <div><button class="text-sm px-1 border border-gray-600 rounded-lg bg-red-500 hover:bg-red-700 text-white btn btn-danger btn-remove" data-id="${user.id}"><i class="px-1 fas fa-trash-alt"></i></button></div>
                                </td>
                            </tr>
                        `
                    }).join('')}
                </tbody>
            </table>
        </div>
        `
    },
    async afterRender() {
        const btns = document.querySelectorAll(".btn-remove");
        console.log(btns);
        btns.forEach(btn => {
            const id = btn.dataset.id
            btn.addEventListener("click", async () => {
                const { data: user } = await authAPI.read(id);
                console.log(user);
                if (user.permission == "admin") {
                    toast(
                        'Không thể xoá tài khoản của QUẢN TRỊ VIÊN!',
                        { duration: 2500 },
                        {
                            // label: 'Confirm',
                            action: () => alert('Cool!'),
                            class: 'my-custom-class', // optional, CSS class name for action button
                        },
                    );
                } else {
                    const Confirm = confirm('Bạn có thật sự muốn xoá?');
                    if (Confirm) {
                        await authAPI.remove(id);
                        reRender(listUser, '#list-users');
                        toast(
                            'Xoá thành công!',
                            { duration: 2500 },
                            {
                                // label: 'Confirm',
                                action: () => alert('Cool!'),
                                class: 'my-custom-class', // optional, CSS class name for action button
                            },
                        );
                    }
                }
            })
        })
    }
}
export default listUser;