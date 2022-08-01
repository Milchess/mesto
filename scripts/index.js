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
let nameInputProfile = popupProfile.querySelector('.popup__user_type_name');
let jobInputProfile = popupProfile.querySelector('.popup__user_type_vocation');

const editButton = document.querySelector('.profile__edit-button');
let userName = document.querySelector('.profile__user-name');
let userVocation = document.querySelector('.profile__user-vocation');

const popupCard = document.querySelector('#popup-card');
const addButton = document.querySelector('.profile__add-button');
let titleCard = document.querySelector('.popup__user_type_denomination');
let linkCard = document.querySelector('.popup__user_type_link-image');

const closeButtons = document.querySelectorAll('.popup__button-close');

const popupImage = document.querySelector('#popup-card-image');
let cardTitleImage = popupImage.querySelector('.popup-card__title');
let cardBigImage = popupImage.querySelector('.popup-card__image');

const cardTemplate = document.querySelector('#grid-card-template').content;
const cardsContainer = document.querySelector('.grid-cards');

function likeCard(card) {
    const likeActive = card.querySelector('.grid-card__like');

    likeActive.addEventListener('click', function () {
        this.classList.toggle('grid-card__like_active');
    });
}

function initImagePopup(title, link) {
    cardTitleImage.textContent = title;
    cardTitleImage.alt = title;
    cardBigImage.src = link;
}

function openImage(card, title, link) {
    const cardBigImage = card.querySelector('.grid-card__image');

    cardBigImage.addEventListener('click', () => {
        openPopup(popupImage);
        initImagePopup(title, link);
    });
}

function deleteCard(card) {
    const deleteButton = card.querySelector('.grid-card__delete');
    deleteButton.addEventListener('click', () => {
        const cardItem = deleteButton.closest('.grid-card');
        cardItem.remove();
    });
}

function closePopup() {
    const popup = document.querySelector('.popup_opened');
    popup.classList.remove('popup_opened');
}

function renderCard(card) {
    cardsContainer.prepend(card);
}

function createCard(title, link) {
    const card = cardTemplate.querySelector('.grid-card').cloneNode(true);

    card.querySelector('.grid-card__title').textContent = title;
    card.querySelector('.grid-card__image').src = link;
    card.querySelector('.grid-card__image').alt = title;

    deleteCard(card);
    likeCard(card);
    openImage(card, title, link);

    return card;
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

for (let initialCard of initialCards) {
    let cardElement = createCard(initialCard.name, initialCard.link);
    renderCard(cardElement);
}

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

popupProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    userName.textContent = nameInputProfile.value;
    userVocation.textContent = jobInputProfile.value;
    closePopup();
});

editButton.addEventListener('click', () => {
    openPopup(popupProfile);
    nameInputProfile.value = userName.textContent;
    jobInputProfile.value = userVocation.textContent;
});

popupCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let cardElement = createCard(titleCard.value, linkCard.value);
    renderCard(cardElement);

    closePopup();
    evt.target.reset();
});

addButton.addEventListener('click', () => openPopup(popupCard));





