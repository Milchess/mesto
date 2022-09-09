import Card from './Card.js';
import FormValidator from './FormValidator.js';

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

const popupProfile = document.querySelector('#popup-profile');
const nameInputProfile = popupProfile.querySelector('.popup__user_type_name');
const jobInputProfile = popupProfile.querySelector('.popup__user_type_vocation');

const editButton = document.querySelector('.profile__edit-button');
const userName = document.querySelector('.profile__user-name');
const userVocation = document.querySelector('.profile__user-vocation');

const popupCard = document.querySelector('#popup-card');
const addButton = document.querySelector('.profile__add-button');
const titleCard = document.querySelector('.popup__user_type_denomination');
const linkCard = document.querySelector('.popup__user_type_link-image');

const popupImage = document.querySelector('#popup-card-image');
const cardTitleImage = popupImage.querySelector('.popup-card__title');
const cardBigImage = popupImage.querySelector('.popup-card__image');

const cardTemplate = document.querySelector('#grid-card-template');
const cardsContainer = document.querySelector('.grid-cards');

const closePopupByClickOnOverLayOrButton = (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close')) {
        closePopup(evt.currentTarget);
    }
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener("keydown", handleEscapePopup);
    popup.removeEventListener('mousedown', closePopupByClickOnOverLayOrButton);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener("keydown", handleEscapePopup);
    popup.addEventListener('mousedown', closePopupByClickOnOverLayOrButton);

}

function handleEscapePopup(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}

function renderCard(card) {
    cardsContainer.prepend(card);
}

function handleCardClick(name, link) {
    cardTitleImage.textContent = name;
    cardBigImage.src = link;
    cardBigImage.alt = name;
    openPopup(popupImage);
}

function createCard(item) {
    const card = new Card(item, cardTemplate, handleCardClick);

    return card.createCard();
}

for (const initialCard of initialCards) {
    const cardElement = createCard(initialCard);
    renderCard(cardElement);
}

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

enableValidation(validationConfig);

popupCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const item = {
        name: titleCard.value,
        link: linkCard.value
    }

    const cardElement = createCard(item);
    renderCard(cardElement);

    closePopup(popupCard);
    evt.target.reset();
});

popupProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    userName.textContent = nameInputProfile.value;
    userVocation.textContent = jobInputProfile.value;
    closePopup(popupProfile);
});

editButton.addEventListener('click', () => {
    nameInputProfile.value = userName.textContent;
    jobInputProfile.value = userVocation.textContent;

    formValidators['popup-form-profile'].resetValidation();

    openPopup(popupProfile);
});

addButton.addEventListener('click', () => {
    formValidators['popup-form-card'].resetValidation();
    openPopup(popupCard);
});
