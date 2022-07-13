let formElement = document.querySelector('.popup');
let nameInput = formElement.querySelector('.popup__user-name');
let jobInput = formElement.querySelector('.popup__user-vocation');
let editButton = document.querySelector('.profile__edit-button');
let popupClose = formElement.querySelector('.popup__button_close');

nameInput.value = document.querySelector('.profile__user-name').textContent;
jobInput.value = document.querySelector('.profile__user-vocation').textContent;

function formSubmitHandler(evt) {
    evt.preventDefault();
    document.querySelector('.profile__user-name').textContent = nameInput.value;
    document.querySelector('.profile__user-vocation').textContent = jobInput.value;
    formElement.classList.remove('popup_opened');
}

function openPopup() {
    formElement.classList.add('popup_opened');
}

function closePopup() {
    formElement.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
