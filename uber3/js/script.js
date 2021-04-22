
window.addEventListener('DOMContentLoaded', () => {
    // Burger
    const burger = document.querySelector('.burger'),
          menu = document.querySelector('.menu');

    function burgerActive(){
        burger.classList.add('burger_active');
        menu.classList.add('menu_active');

    }
    function burgerDisabled(){
        burger.classList.remove('burger_active');
        menu.classList.remove('menu_active');
    }


    burger.addEventListener('click', ()=>{

        if(burger.classList.contains('burger_active')){
            burgerDisabled();
        } else {
            burgerActive();
        }

    });

    menu.addEventListener('click', (e)=>{
        if (e.target && e.target.tagName == 'A'){
            burgerDisabled();
        }
    });

    // Modal

    function openModalWindow(){
        modal.style.display = 'block';
        document.documentElement.style.overflow = 'hidden';
    }

    function closeModalWindow(){
        modal.style.display = 'none';
        document.documentElement.style.overflow = '';
    }

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight + 1 >= document.documentElement.scrollHeight){
            openModalWindow();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    const modal = document.querySelector('.modal'),
          promoButton = document.querySelector('.promo_button'),
          subheaderButton = document.querySelector('.subheader_button'),
          link = document.querySelector('.menu_link_form');


    promoButton.addEventListener('click', ()=>{
        openModalWindow();
    });
    subheaderButton.addEventListener('click', ()=>{
        openModalWindow();
    });
    link.addEventListener('click', ()=>{
        openModalWindow();
    });

    
    modal.addEventListener('click', (e)=>{
        if(e.target == modal || e.target.hasAttribute('data-close')){
            closeModalWindow();
        }
    });

    document.addEventListener('keydown', (e)=>{
        if (e.key === "Escape" &&  modal.style.display === "block" ) {
            closeModalWindow();
        }
    });

    window.addEventListener('scroll', showModalByScroll);
    // openModalWindow();

    // ModalRequest 

    function showSanksModal(message){
        const formDialog = document.querySelector('.modal_dialog');
        formDialog.style.display = 'none';
        openModalWindow();

        const sanksModal = document.createElement('div');
        sanksModal.classList.add('modal_dialog');
        sanksModal.innerHTML = `
        <div class="modal_content">
            <div data-close class="modal_close">&times;</div>
            <div class="modal_title">${message}</div>
        </div>
        `;
        document.querySelector('.modal').append(sanksModal);


        setTimeout(()=>{
            closeModalWindow();
            sanksModal.remove();
            formDialog.style.display = 'block';
        },4000);
    }

    const message = {
        "succes" : "Спасибо! Скоро мы с вами свяжемся!",
        "error" : "Что-то пошло не так(((",
        "load" : "icons/spinner.svg",
    };

    const form = document.querySelector('form');

    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const spinner = document.createElement('img');
        spinner.src = message.load;
        spinner.style.cssText = `
            display: block;
            margin: 0 auto;
        `;

        form.append(spinner);


        const formData = new FormData(form);
        const obj = {};
        formData.forEach((elem, i)=>{
            obj[i] = elem;
        });

        fetch('server.php', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-type': 'application/json',
            }
        })
        .then(data =>  data.text())
        .then(data => {
            console.log(data);
            showSanksModal(message.succes);
        })
        .catch(()=> {
            showSanksModal(message.error);
        })
        .finally(
            ()=>{
                form.reset();
                spinner.remove();
            }
        );
    });








});



