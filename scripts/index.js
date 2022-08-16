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

const closeButtons = document.querySelectorAll('.popup__button-close');

const popupImage = document.querySelector('#popup-card-image');
const cardTitleImage = popupImage.querySelector('.popup-card__title');
const cardBigImage = popupImage.querySelector('.popup-card__image');

const cardTemplate = document.querySelector('#grid-card-template').content;
const cardsContainer = document.querySelector('.grid-cards');

function addLikeActive(card) {
    const likeActive = card.querySelector('.grid-card__like');

    likeActive.addEventListener('click', function (evt) {
        evt.target.classList.toggle('grid-card__like_active');
    });
}

function initImagePopup(title, link) {
    cardTitleImage.textContent = title;
    cardTitleImage.alt = title;
    cardBigImage.src = link;
}

function addEventOpenImage(card, title, link) {
    const cardBigImage = card.querySelector('.grid-card__image');

    cardBigImage.addEventListener('click', () => {
        openPopup(popupImage);
        initImagePopup(title, link);
    });
}

function addEventDeleteCard(card) {
    const deleteButton = card.querySelector('.grid-card__delete');
    deleteButton.addEventListener('click', () => {
        const cardItem = deleteButton.closest('.grid-card');
        cardItem.remove();
    });
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener("keydown", (evt) => escClosePopup(evt, popup));
    popup.removeEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
    });
}

function renderCard(card) {
    cardsContainer.prepend(card);
}

function createCard(title, link) {
    const card = cardTemplate.querySelector('.grid-card').cloneNode(true);
    const gridCardTitle = card.querySelector('.grid-card__title');
    const gridCardImage = card.querySelector('.grid-card__image');

    gridCardTitle.textContent = title;
    gridCardImage.src = link;
    gridCardImage.alt = title;

    addEventDeleteCard(card);
    addLikeActive(card);
    addEventOpenImage(card, title, link);

    return card;
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener("keydown", (evt) => escClosePopup(evt, popup));
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
    });
    deletePopupError(configValidate, popup);
}

function escClosePopup(evt, popup) {
    if (evt.key === 'Escape') {
        closePopup(popup);
    }
}

for (const initialCard of initialCards) {
    const cardElement = createCard(initialCard.name, initialCard.link);
    renderCard(cardElement);
}

closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    });
});

popupProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    userName.textContent = nameInputProfile.value;
    userVocation.textContent = jobInputProfile.value;
    closePopup(popupProfile);
});

editButton.addEventListener('click', () => {
    openPopup(popupProfile);
    nameInputProfile.value = userName.textContent;
    jobInputProfile.value = userVocation.textContent;

    deletePopupError(configValidate, popupProfile);
});

popupCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const cardElement = createCard(titleCard.value, linkCard.value);
    renderCard(cardElement);

    closePopup(popupCard);
    evt.target.reset();
});

addButton.addEventListener('click', () => openPopup(popupCard));

const configValidate = {
    formSelector: '.popup__form',
    inputSelector: '.popup__user',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

enableValidation(configValidate);