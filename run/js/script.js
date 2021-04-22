$(document).ready(function(){
    $('.carousel__inner').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight : true,
        prevArrow : '<button type="button" class="slick-prev"><img src = "img/slider/chevron-left-solid.png"></button>',
        nextArrow : '<button type="button" class="slick-next"><img src = "img/slider/chevron-right-solid.png"></button>',
        responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                // centerMode: true,
                centerPadding: '40px',
                dots: true,
                autoplay: true,
                focusOnSelect: true,
                autoplaySpeed: 2000,
                adaptiveHeight : false,
              }
            },
            {
              breakpoint: 576,
              settings: {
                arrows: false,
                slidesToShow: 1,
                dots: true,
                autoplay: true,
                focusOnSelect: true,
                autoplaySpeed: 2000,
                adaptiveHeight : false,
              }
            }
          ]
    });


    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content')
          .removeClass('catalog__content_active').eq($(this).index())
          .addClass('catalog__content_active');
    });

    

    function toggleCard(item){
        $(item).each(function(i){
            $(this).on('click', function(e){
                e.preventDefault();
                $('.catalog-item__front').eq(i).toggleClass('catalog-item__front_active');
                $('.catalog-item__back').eq(i).toggleClass('catalog-item__back_active');
            });
        });
    }

    toggleCard('.catalog-item__link');
    toggleCard('.catalog-item__return');

    $('[data-modal=consultation]').on('click', function(){
      $('.overlay, #consultation').fadeIn();
    });
  
    $('.modal__close').on('click', function(){
      $('.overlay, #consultation').fadeOut();
    });


    $('.button_catalog').each(function(i){
      $(this).on('click', function(){
        $('#buy .modal__descr').text(
          $(this)
        .closest('.catalog-item__wrapper')
        .children('.catalog-item__front')
        .children(".catalog-item__title")
        .text()
        );
        $('.overlay, #buy').fadeIn();
        
      });
    });


    function validateForms(formSelector){
      $(formSelector).validate({
        rules: {
          name: "required",
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: "Пожалуйста, введите свое имя",
          phone: "Пожалуйста, введите свой номер телефона",
          email: {
            required: "Пожалуйста, введите свой email",
            email: "Ваш email должен содержать формат: name@domain.com"
          }
        }
      });
  
    }

validateForms('#consultation form');
validateForms('#buy form');
validateForms('#consultation-form');

$('input[name=phone]').mask("+7(999) 999-999");

// request

$('form').submit(function(e){
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "mailer/smart.php",
    data: $(this).serialize()
  }).done(function(){
    $(this).find("input").val("");
    $('#consultation, #buy').fadeOut();
    $('.overlay, #thank').fadeIn();

    $('form').trigger('reset');
  });

  return false;
});

//chevron

  $(window).scroll(function(){
    if($(this).scrollTop() > 1600){
      $('.chevron').fadeIn();
    } else{
      $('.chevron').fadeOut();
    }
  });

  $("a[href=#up]").click(function(){
    var _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });

});

