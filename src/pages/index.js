import "./index.css";

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
    initialCards,
    validationConfig,
    editButton,
    addButton,
    cardTemplate
} from "../utils/constants";

const userInfo = new UserInfo('.profile__user-name', '.profile__user-vocation');
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
    popupWithProfilePopup.setInputValues(data);

    formValidators['popup-form-profile'].resetValidation();

    popupWithProfilePopup.open();
});

addButton.addEventListener('click', () => {
    formValidators['popup-form-card'].resetValidation();
    popupWithCardPopup.open();
});

popupWithProfilePopup.setEventListeners();
popupWithCardPopup.setEventListeners();
popupWithImage.setEventListeners();
cardList.renderItems();