let formElement = document.querySelector('.popup');
let nameInput = formElement.querySelector('.popup__user_type_name');
let jobInput = formElement.querySelector('.popup__user_type_vocation');
let editButton = document.querySelector('.profile__edit-button');
let popupClose = formElement.querySelector('.popup__button-close');
let userName = document.querySelector('.profile__user-name');
let userVocation = document.querySelector('.profile__user-vocation');

function formSubmitHandler(evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userVocation.textContent = jobInput.value;
    closePopup();
}

function openPopup() {
    formElement.classList.add('popup_opened');
    nameInput.value = userName.textContent;
    jobInput.value = userVocation.textContent;
}

function closePopup() {
    formElement.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
