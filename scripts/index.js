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

let popupProfile = document.querySelector('#popup-profile');
let nameInput = popupProfile.querySelector('.popup__user_type_name');
let jobInput = popupProfile.querySelector('.popup__user_type_vocation');

let editButton = document.querySelector('.profile__edit-button');
let userName = document.querySelector('.profile__user-name');
let userVocation = document.querySelector('.profile__user-vocation');

let popupCard = document.querySelector('#popup-card');
let addButton = document.querySelector('.profile__add-button');
let titleCard = document.querySelector('.popup__user_type_denomination');
let linkCard = document.querySelector('.popup__user_type_link-image');

let popupCloses = document.querySelectorAll('.popup__button-close');

let popupImage = document.querySelector('#popup-card-image');

const cardTemplate = document.querySelector('#grid-card-template').content;
const cardsContainer = document.querySelector('.grid-cards');

function likeCard(card) {
    let likeActive = card.querySelector('.grid-card__like');

    likeActive.addEventListener('click', function () {
        if (this.classList.contains('grid-card__like_active')) {
            this.classList.remove('grid-card__like_active');
        } else {
            this.classList.add('grid-card__like_active');
        }
    });
}

function initPopup(title, link) {
    popupImage.querySelector('.popup-card__title').textContent = title;
    popupImage.querySelector('.popup-card__image').src = link;
    popupImage.querySelector('.popup-card__image').alt = title;
}

function openImage(card, title, link) {
    let cardImage = card.querySelector('.grid-card__image');

    cardImage.addEventListener('click', function () {
        popupImage.classList.add('popup_opened');
        initPopup(title, link);
    });
}

function deleteCard(card) {
    const deleteButton = card.querySelector('.grid-card__delete');
    deleteButton.addEventListener('click', function () {
        const cardItem = deleteButton.closest('.grid-card');
        cardItem.remove();
    });
}

function clearCardPopup() {
    titleCard.value = '';
    linkCard.value = '';
}

function closePopup() {
    let popup = document.querySelector('.popup_opened');
    popup.classList.remove('popup_opened');

    if (popup.id === 'popup-card') {
        clearCardPopup();
    }
}

function renderCard(card) {
    cardsContainer.prepend(card);
}

function createCard(card, title, link) {
    card.querySelector('.grid-card__title').textContent = title;
    card.querySelector('.grid-card__image').src = link;
    card.querySelector('.grid-card__image').alt = title;

    deleteCard(card);
    likeCard(card);
    openImage(card, title, link);
}

for (let initialCard of initialCards) {
    const cardElement = cardTemplate.querySelector('.grid-card').cloneNode(true);

    createCard(cardElement, initialCard.name, initialCard.link);
    renderCard(cardElement);
}

for (let popupClose of popupCloses) {
    popupClose.addEventListener('click', closePopup);
}

popupProfile.addEventListener('submit', function (evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userVocation.textContent = jobInput.value;
    closePopup();
});

editButton.addEventListener('click', function () {
    popupProfile.classList.add('popup_opened');
    nameInput.value = userName.textContent;
    jobInput.value = userVocation.textContent;
});

popupCard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const cardElement = cardTemplate.querySelector('.grid-card').cloneNode(true);

    createCard(cardElement, titleCard.value, linkCard.value);
    renderCard(cardElement);

    closePopup();
    titleCard.value = '';
    linkCard.value = '';
});

addButton.addEventListener('click', function () {
    popupCard.classList.add('popup_opened');
});





