import {closeModal, openModal} from './modal';
import {postData} from '../services/services';
function forms(formSelector, modalTimerId) {
    // Forms
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо,скоро свяжемся',
        failure: 'что-то не так'
    };
    forms.forEach(item => { //применяем bindPostData на каждую form через forEach
        bindPostData(item);
    });




    function bindPostData(form) { //созд функцию bindPostData
        form.addEventListener('submit', (e) => {
            e.preventDefault(); //отменяем стандартное поведение

            const statusMessage = document.createElement('img'); // созд statusMessage для спиннера
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
             display: block;
             margin: 0 auto;
         `;
            form.insertAdjacentElement('afterend', statusMessage); // добавляет statusMessage после form



            const formData = new FormData(form); //formData чтоб конструир. наборы пар ключ-значение

            // const obj = {};                                         //пустой обЪкт
            // formData.forEach(function(value,key) {                  //formData созд key = value для obj
            //     obj[key] = value;
            // });
            const json = JSON.stringify(Object.fromEntries(formData.entries())); // JSON.stringify()преобразует в Json

            postData('http://localhost:3000/requests', json)
                // jQuery метод .text() задает или возвращает текст(удалила)
                .then(data => {
                    console.log(data);
                    showThanksModel(message.success);
                    form.reset();
                    statusMessage.remove();
                })
                .catch(() => { // при ошибке
                    showThanksModel(message.failure);
                })
                .finally(() => { // выполнится при любом условии
                    form.reset();
                });

        });
    }



    function showThanksModel(message) { //функ для модалки
        const prevModalDialog = document.querySelector('.modal__dialog'); //переменная для прошлого мод окна

        prevModalDialog.classList.add('hide'); //прячем мод окно
        openModal('.modal', modalTimerId); //откр нов окно

        const thanksModal = document.createElement('div'); //созд для него div, class 
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
         <div class="modal__content">
             <div class="modal__close" data-close>×</div>
             <div class="modal__title">${message}</div>
         </div>
     `;

        document.querySelector('.modal').append(thanksModal); //доб его в document
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

    fetch('db.json')
        .then(data => data.json())
        .then(res => console.log(res));


}
export default forms;