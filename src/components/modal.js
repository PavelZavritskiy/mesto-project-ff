//Открытие Popups
function openPopup  (obj) {
  obj.classList.add('popup_is-opened');
  obj.addEventListener('click', handleOverlayClick);
  document.addEventListener('keydown', handleEsc);
};

//Закрытие Popups
function closePopup (obj) {
  obj.classList.remove('popup_is-opened');
  obj.removeEventListener('click', handleOverlayClick);
  document.removeEventListener('keydown', handleEsc);
};

//Закрытие Popups нажатием на оверлей
function handleOverlayClick (evt) {
  const evtTarget = evt.target;
  if (evt.target.classList.contains('popup_is-opened')) {
    closePopup(evtTarget);
  };
};

//Закрытие по Esc
function handleEsc (evt) {
  evt.stopPropagation();
  if (evt.code === "Escape") {
    const openPopup = document.querySelector('.popup_is-opened');
    closePopup (openPopup);
  };
};

export { openPopup, closePopup, };