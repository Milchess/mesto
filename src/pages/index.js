import "./index.css";

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import Popup from '../components/Popup.js';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__user',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const nameInputProfile = document.querySelector('.popup__user_type_name');
const jobInputProfile = document.querySelector('.popup__user_type_vocation');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const cardTemplate = document.querySelector('#grid-card-template');

const userInfo = new UserInfo('.profile__user-name', '.profile__user-vocation');
const popupProfile = new Popup('#popup-profile');
const popupCard = new Popup('#popup-card');
const popupWithImage = new PopupWithImage('#popup-card-image');

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = createCard(item);
        cardList.addItem(card);
    }
}, '.grid-cards');

const popupWithCardPopup = new PopupWithForm('#popup-card', (item) => {
    cardList.addItem(createCard({name: item.denomination, link: item.link}));
    popupWithCardPopup.close();
});

const popupWithProfilePopup = new PopupWithForm('#popup-profile', (item) => {
    userInfo.setUserInfo(item);
    popupWithProfilePopup.close();
});

const formValidators = {};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        const formName = formElement.getAttribute('name');

        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

function createCard(item) {
    const card = new Card(item, cardTemplate, () => popupWithImage.open(item));

    return card.createCard();
}

enableValidation(validationConfig);

editButton.addEventListener('click', () => {
    const data = userInfo.getUserInfo();
    nameInputProfile.value = data.user;
    jobInputProfile.value = data.vocation;

    formValidators['popup-form-profile'].resetValidation();

    popupProfile.open();
});

addButton.addEventListener('click', () => {
    formValidators['popup-form-card'].resetValidation();
    popupCard.open();
});

popupWithProfilePopup.setEventListeners();
popupWithCardPopup.setEventListeners();
popupProfile.setEventListeners();
popupCard.setEventListeners();
popupWithImage.setEventListeners();
cardList.renderItems();