(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),e.addEventListener("click",n),document.addEventListener("keydown",r)}function t(e){e.classList.remove("popup_is-opened"),e.removeEventListener("click",n),document.removeEventListener("keydown",r)}function n(e){var n=e.target;e.target.classList.contains("popup_is-opened")&&t(n)}function r(e){e.stopPropagation(),"Escape"===e.code&&t(document.querySelector(".popup_is-opened"))}var o,c,a,i={baseUrl:"https://mesto.nomoreparties.co/wff-cohort-19",headers:{authorization:"82b84f8c-4240-4eeb-b59d-6d0035180658","Content-Type":"application/json"}};function u(e){return 200==e.status?e.json():Promise.reject("Ошибка ".concat(e.status))}function l(e,t,n){var r;e.classList.contains("card__like-button_is-active")?(r=t,fetch("".concat(i.baseUrl,"/cards/like/").concat(r._id),{headers:i.headers,method:"DELETE"}).then((function(e){return u(e)}))).then((function(t){e.classList.remove("card__like-button_is-active"),n(t.likes.length)})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(i.baseUrl,"/cards/like/").concat(e._id),{headers:i.headers,method:"PUT"}).then((function(e){return u(e)}))}(t).then((function(t){e.classList.add("card__like-button_is-active"),n(t.likes.length)})).catch((function(e){console.log(e)}))}function s(e,t,n,r,o){var c=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),a=c.querySelector(".card__image"),i=c.querySelector(".card__like-button"),u=c.querySelector(".card__like-counter");a.src=t.link,a.alt=t.name,c.querySelector(".card__title").textContent=t.name;var l=function(e){u.textContent=e};t.likes.some((function(t){return t._id===e}))&&i.classList.add("card__like-button_is-active");var s=c.querySelector(".card__delete-button");return t.owner._id===e?s.addEventListener("click",(function(){n(t,c)})):s.remove(),i.addEventListener("click",(function(e){r(e.target,t,l)})),c.addEventListener("click",o),l(t.likes.length),c}function d(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}function p(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.removeAttribute("disabled"),t.classList.remove(n.inactiveButtonClass)):(t.setAttribute("disabled",!0),t.classList.add(n.inactiveButtonClass))}function f(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));n.forEach((function(n){d(e,n,t)})),p(n,e.querySelector(t.submitButtonSelector),t)}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var m={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__input-type-error",errorClass:"popup__input-error_active"},y=document.querySelector(".places__list"),v=document.querySelector(".profile__edit-button"),h=document.querySelector(".popup_type_edit"),S=document.querySelector(".profile__add-button"),b=document.querySelector(".popup_type_new-card"),q=document.querySelectorAll(".popup__close"),g=document.querySelector(".popup_type_image"),E=g.querySelector(".popup__caption"),L=g.querySelector(".popup__image"),k=document.querySelector('form[name="edit-profile"]'),C=k.querySelector(".popup__input_type_name"),A=k.querySelector(".popup__input_type_description"),x=document.querySelector('form[name="new-place"]'),U=x.querySelector(".popup__input_type_card-name"),P=x.querySelector(".popup__input_type_url"),w=document.querySelector(".profile__info"),T=w.querySelector(".profile__title"),j=w.querySelector(".profile__description"),O=document.querySelector('form[name="delete-card"]'),B=document.querySelector(".popup_type_delete-card"),D=document.querySelector(".popup_type_edit-avatar"),I=document.querySelector('form[name="edit-avatar"]'),M=I.querySelector(".popup__input_type_avatar"),N=document.querySelector(".profile__image");function J(e,t){t.querySelector(".popup__button").textContent=t!==B?e?"Сохранение...":"Сохранить":e?"Удаление...":"Да"}function H(e){N.style.backgroundImage="url(".concat(e,")")}function V(e){H(e.avatar),T.textContent=e.name,j.textContent=e.about}function z(t,n){c=t,a=n,e(B)}function $(t){t.target.classList.contains("card__image")&&(E.textContent=t.target.alt,L.alt=t.target.alt,L.src=t.target.currentSrc,e(g))}document.querySelectorAll(".popup").forEach((function(e){e.classList.add("popup_is-animated")})),Promise.all([fetch("".concat(i.baseUrl,"/users/me"),{headers:i.headers}).then((function(e){return u(e)})),fetch("".concat(i.baseUrl,"/cards"),{headers:i.headers}).then((function(e){return u(e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=r[0],a=r[1];o=c._id,V(c),a.forEach((function(e){"Калининград"!==e.name&&y.prepend(s(o,e,z,l,$))}))})).catch((function(e){console.log(e)})),N.addEventListener("click",(function(t){t.stopPropagation(),f(I,m),I.reset(),e(D)})),I.addEventListener("submit",(function(e){!function(e){var n;e.preventDefault(),J(!0,D),(n={avatar:M.value},fetch("".concat(i.baseUrl,"/users/me/avatar"),{headers:i.headers,method:"PATCH",body:JSON.stringify({avatar:n.avatar})}).then((function(e){return u(e)}))).then((function(e){H(e.avatar),t(D),I.reset()})).catch((function(e){console.log(e)})).finally((function(){J(!1,D)}))}(e)})),v.addEventListener("click",(function(t){t.stopPropagation(),k.reset(),f(k,m),C.value=T.textContent,A.value=j.textContent,e(h)})),k.addEventListener("submit",(function(e){!function(e){var n;e.preventDefault(),J(!0,h),(n={name:C.value,about:A.value},fetch("".concat(i.baseUrl,"/users/me"),{headers:i.headers,method:"PATCH",body:JSON.stringify({name:n.name,about:n.about})}).then((function(e){return u(e)}))).then((function(e){V(e),t(h),I.reset()})).catch((function(e){console.log(e)})).finally((function(){J(!1,h)}))}(e)})),S.addEventListener("click",(function(t){t.stopPropagation(),x.reset(),f(x,m),e(b)})),x.addEventListener("submit",(function(e){!function(e){var n;e.preventDefault(),J(!0,b),(n={name:U.value,link:P.value},fetch("".concat(i.baseUrl,"/cards"),{headers:i.headers,method:"POST",body:JSON.stringify({name:n.name,link:n.link})}).then((function(e){return u(e)}))).then((function(e){y.prepend(s(o,e,z,l,$)),t(b),x.reset()})).catch((function(e){console.log(e)})).finally((function(){J(!1,b)}))}(e)})),O.addEventListener("submit",(function(e){var n,r;e.preventDefault(),n=c,r=a,J(!0,B),function(e){return fetch("".concat(i.baseUrl,"/cards/").concat(e._id),{headers:i.headers,method:"DELETE"}).then((function(e){return u(e)}))}(n).then((function(){r.remove(),t(B)})).catch((function(e){console.log(e)})).finally((function(){J(!1,B)}))})),q.forEach((function(e){e.addEventListener("click",(function(e){t(e.target.closest(".popup"))}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);p(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?d(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.classList.add(r.errorClass),o.textContent=n}(e,t,t.validationMessage,n)}(e,o,t),p(n,r,t)}))}))}(t,e)}))}(m)})();