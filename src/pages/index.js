import "./index.css";

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
    validationConfig,
    editButton,
    addButton,
    cardTemplate,
    avatar
} from "../utils/constants";

import Api from "../components/Api";
import Popup from "../components/Popup";

const api = new Api();

const userInfo = new UserInfo('.profile__user-name', '.profile__user-vocation', '.profile__avatar');
const popupWithImage = new PopupWithImage('#popup-card-image');

const cardList = new Section(
    (item) => {
        const card = createCard(item);
        cardList.addItem(card);
    }, '.grid-cards');

const popupWithCardPopup = new PopupWithForm('#popup-card', (item) => {
    api.setCreateCard(item).then(data => cardList.addItem(createCard(data)));
    popupWithCardPopup.close();
});

const popupWithProfilePopup = new PopupWithForm('#popup-profile', (item) => {
    api.setUserUpdate(item).then(data => userInfo.setUserInfo(data));
    popupWithProfilePopup.close();
});

const popupDeleteCard = new Popup('#popup-delete_card', (item) => {
    api.setDeleteCard(item._id);
    popupDeleteCard.close();
});

const popupAvatar = new PopupWithForm('#popup-avatar', (item) => {
    api.setUserAvatar(item).then(data => userInfo.getUserAvatar(data));
    popupAvatar.close();
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

avatar.addEventListener('click', () => {
    formValidators['popup-form-avatar'].resetValidation();
    popupAvatar.open();
});

popupWithProfilePopup.setEventListeners();
popupWithCardPopup.setEventListeners();
popupWithImage.setEventListeners();
popupAvatar.setEventListeners();
popupDeleteCard.setEventListeners();

api.getInitialCards().then((data) => {
    cardList.renderItems(data);
});

api.getUserInformation().then(data => {
        userInfo.getUserAvatar(data);
        userInfo.setUserInfo(data);
    }
);