"use strict";

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        throw new Error("Cannot find module '" + o + "'");
      }

      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function (e) {
        var n = t[o][1][e];
        return s(n ? n : e);
      }, f, f.exports, e, t, n, r);
    }

    return n[o].exports;
  }

  var i = typeof require == "function" && require;

  for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }

  return s;
})({
  1: [function (require, module, exports) {
    function burger() {
      function openMenu() {
        menu.classList.add('active');
      }

      function closeMenu() {
        menu.classList.remove('active');
      }

      var burger = document.querySelector('.hamburger'),
          closeContent = document.querySelector('.menu__close'),
          menu = document.querySelector('.menu'),
          menuLinck = document.querySelectorAll('.menu__link');
      menuLinck.forEach(function (elem) {
        elem.addEventListener('click', function () {
          closeMenu();
        });
      });
      burger.addEventListener('click', openMenu);
      closeContent.addEventListener('click', closeMenu);
    }

    module.exports = burger;
  }, {}],
  2: [function (require, module, exports) {
    // const conFive = require('./five');
    // conFive();
    window.addEventListener('DOMContentLoaded', function () {
      var burger = require('./burger'),
          notifications = require('./notifications'),
          percents = require('./percents'),
          modal = require('./modal/modal');

      burger();
      notifications();
      percents();
      modal();
    });
  }, {
    "./burger": 1,
    "./modal/modal": 4,
    "./notifications": 6,
    "./percents": 7
  }],
  3: [function (require, module, exports) {
    function application(obj) {
      return fetch('https://portfolio-name-default-rtdb.firebaseio.com/application.json', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        obj.id = data.name;
        return obj;
      });
    }

    module.exports = application; // class Application{
    //     static create(obj){
    //         return fetch('https://portfolio-name-default-rtdb.firebaseio.com/application.json', {
    //             method: 'POST',
    //             body: JSON.stringify(obj),
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         })
    //         .then( response => response.json() )
    //         .then(data =>{
    //             obj.id = data.name;
    //             return obj;
    //         })
    //         .then( addLocalStorage(obj) )
    //         .then( Application.renderList(obj) );
    //     }
    //     static renderList(obj){
    //         const applications = getApplicationsFromLocalStorage();
    //         let html = ``;
    //         if(applications.length){
    //             // html = toCard(obj);
    //             applications.map(
    //                 elem => {
    //                     const li = toCard(elem);
    //                     html += li;
    //                 }
    //             ).join(' ');
    //         } else {
    //             html = `<div class="table">Вы пока ничего не спрашивали</div>`;
    //         }
    //         const list = document.querySelector('.table__list');
    //         list.innerHTML = html;
    //     }
    // }
    // function addLocalStorage(obj){
    //     const all = getApplicationsFromLocalStorage();
    //     all.push(obj);
    //     localStorage.setItem('applications', JSON.stringify(all));
    // }
    // function getApplicationsFromLocalStorage(){
    //     return JSON.parse(localStorage.getItem('applications') || '[]'); 
    // }
    // function toCard(obj){
    //     return `
    //         <div>
    //             ${new Date(obj.date).toLocaleDateString()}
    //             ${new Date(obj.date).toLocaleTimeString()}
    //         </div>
    //         <div>${obj.name} ${obj.email}</div>
    //         <br>
    //     `;
    // }
    // module.exports = Application;
  }, {}],
  4: [function (require, module, exports) {
    function modal() {
      // modal
      var isValid = require('./utils'),
          application = require('./application');

      var closeWindow = document.querySelector('.modal-window__close'),
          modal = document.querySelector('.modal'),
          form = document.querySelector('.contacts__form'),
          inpName = form.querySelector('.input-name'),
          inpEmail = form.querySelector('.input-email'),
          inpMessage = form.querySelector('.textarea-message'),
          btnContact = form.querySelector('.contacts__btn');

      function close() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }

      function openModal() {
        modal.classList.add('active');
        var clearTimeout = setTimeout(close, 3000);
        document.body.style.overflow = 'hidden';
        form.reset();
      }

      function btnIsDisabled() {
        btnContact.disabled = !isValid(inpName.value, inpEmail.value);
      } // window.addEventListener('load', application.renderList);


      form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (isValid(inpName.value, inpEmail.value)) {
          var applicate = {
            name: inpName.value.trim(),
            email: inpEmail.value.trim(),
            message: inpMessage.value.trim(),
            date: new Date().toJSON()
          };
          btnContact.disabled = true; // Должны отправить ассинхронный запрос на сервер чтобы сохранить вопрос

          application(applicate).then(function () {
            // console.log(`Обьект`, applicate);
            btnContact.disabled = false;
            openModal();
          });
        }
      });
      inpEmail.addEventListener('input', btnIsDisabled);
      inpName.addEventListener('input', btnIsDisabled);
      closeWindow.addEventListener('click', function () {
        close();
      });
    }

    module.exports = modal;
  }, {
    "./application": 3,
    "./utils": 5
  }],
  5: [function (require, module, exports) {
    function isValid(name, mail) {
      return name.length >= 2 && mail.includes('@');
    }

    module.exports = isValid;
  }, {}],
  6: [function (require, module, exports) {// function notifications(){
    //       //  notifications
    //       const projects = document.querySelectorAll('.projects__item');
    //       projects.forEach(elem => {
    //           elem.addEventListener('click', ()=>{
    //               if(!elem.getAttribute('href')){
    //                   alert('Данный сайт в процессе разработки');
    //               }
    //           });
    //       });
    // }
    // module.exports = notifications;
  }, {}],
  7: [function (require, module, exports) {
    function percents() {
      // percents
      var scales = document.querySelectorAll('.skils-statistics-body__part'),
          percents = document.querySelectorAll('.skils-statistics__percent');
      scales.forEach(function (scale, i) {
        scale.style.width = percents[i].textContent;
      });
    }

    module.exports = percents;
  }, {}]
}, {}, [2]);