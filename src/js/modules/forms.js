import { post } from "jquery";
import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
    const form = document.querySelectorAll('form'),
        input = document.querySelectorAll('input');

    const messages = {
        loading: 'Загрузка...',
        success: 'Данные переданы успешно',
        failure: 'Что-то пошло не так...'
    };

    checkNumInputs('input[name="user_phone"]');

    async function postData(url, data) {
        document.querySelector('.status').textContent = messages.loading;
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });
        return await res.text();
    }

    const clearInputs = () => {
        input.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = messages.loading;
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === "end") {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }
            postData('assets/server.php', formData)
                .then(res => {
                    statusMessage.textContent = messages.success;
                    console.log(res);
                }).catch(() => {
                    statusMessage.textContent = messages.failure;
                }).finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        });

    });

};

export default forms;