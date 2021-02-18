
window.addEventListener('DOMContentLoaded', () => {

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


});



