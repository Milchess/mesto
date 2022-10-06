import "./index.css";

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
    validationConfig,
    buttonEditProfile,
    buttonAddCard,
    cardTemplate,
    avatar,
    cardConfig
} from "../utils/constants";

import Api from "../components/Api";
import PopupDeleteCard from "../components/PopupDeleteCard";

let userId = null;
const api = new Api();

const userInfo = new UserInfo('.profile__user-name', '.profile__user-vocation', '.profile__avatar');
const popupWithImage = new PopupWithImage('#popup-card-image');

const cardList = new Section(
    (item) => {
        const card = createCard(item);
        cardList.addItem(card);
    }, '.grid-cards');

const popupWithCardPopup = new PopupWithForm('#popup-card', (item) => {
    popupWithCardPopup.renderLoading();
    api.setCreateCard(item)
        .then(data => {
            cardList.addItem(createCard(data));
            popupWithCardPopup.close();
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
        .finally(() => popupWithCardPopup.renderLoading('Создать'));
});

const popupWithProfilePopup = new PopupWithForm('#popup-profile', (item) => {
    popupWithProfilePopup.renderLoading();
    api.setUserUpdate(item)
        .then(data => {
            userInfo.setUserInfo(data);
            popupWithProfilePopup.close();
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
        .finally(() => popupWithProfilePopup.renderLoading('Сохранить'));
});

const popupDeleteCard = new PopupDeleteCard('#popup-delete_card');

const popupAvatar = new PopupWithForm('#popup-avatar', (item) => {
    popupAvatar.renderLoading();
    api.setUserAvatar(item)
        .then(data => {
            userInfo.getUserAvatar(data);
            popupAvatar.close();
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
        .finally(() => popupAvatar.renderLoading('Сохранить'));
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
    const card = new Card(cardConfig,
        item,
        cardTemplate,
        userId,
        () => popupWithImage.open(item),
        deleteCardClick,
        handlerLikeClick,
    );

    const element = card.createCard();
    if (card.isLiked()) {
        card.addLikeButton();
    }
    return element;
}

function deleteCardClick(card) {
    popupDeleteCard.open();
    popupDeleteCard.setPopupSubmitAction(() => setPopupDeleteSubmitAction(card));
}

function setPopupDeleteSubmitAction(card) {
    api.setDeleteCard(card.id)
        .then(() => {
            card.remove();
            popupDeleteCard.close();
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
}

function handlerLikeClick(card) {
    if (card.isLiked()) {
        api.setDeleteLikeCard(card._id)
            .then(data => {
                card.updateLikes(data.likes);
                card.removeLikeButton();
            })
            .catch(err => console.log(`Ошибка.....: ${err}`));
    } else {
        api.setLikeCard(card._id)
            .then(data => {
                card.updateLikes(data.likes);
                card.addLikeButton();
            })
            .catch(err => console.log(`Ошибка.....: ${err}`));
    }
}

enableValidation(validationConfig);

buttonEditProfile.addEventListener('click', () => {
    const data = userInfo.getUserInfo();
    popupWithProfilePopup.setInputValues(data);

    formValidators['popup-form-profile'].resetValidation();

    popupWithProfilePopup.open();
});

buttonAddCard.addEventListener('click', () => {
    formValidators['popup-form-card'].resetValidation();
    popupWithCardPopup.open();
});

avatar.addEventListener('click', () => {
    formValidators['popup-form-avatar'].resetValidation();
    popupAvatar.open();
});

Promise.all([
    api.getUserInformation(),
    api.getInitialCards()
])
    .then(([dataInformation, card]) => {
        userId = dataInformation._id;
        userInfo.getUserAvatar(dataInformation);
        userInfo.setUserInfo(dataInformation);
        cardList.renderItems(card);
    })
    .catch((err) => {
        console.log(err);
    })

popupWithProfilePopup.setEventListeners();
popupWithCardPopup.setEventListeners();
popupWithImage.setEventListeners();
popupAvatar.setEventListeners();
popupDeleteCard.setEventListeners();