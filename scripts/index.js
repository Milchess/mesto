let popupProfile = document.querySelector('#popup-profile');
let nameInput = popupProfile.querySelector('.popup__user_type_name');
let jobInput = popupProfile.querySelector('.popup__user_type_vocation');
let editButton = document.querySelector('.profile__edit-button');
let popupCloseProfile = popupProfile.querySelector('#popup-close-profile');
let userName = document.querySelector('.profile__user-name');
let userVocation = document.querySelector('.profile__user-vocation');

let popupCard = document.querySelector('#popup-card');
let addButton = document.querySelector('.profile__add-button');
let popupCloseCard = popupCard.querySelector('#popup-close-card');

let likeActives = document.querySelectorAll('.grid-card__like');

for (let likeActive of likeActives) {
    likeActive.addEventListener('click', activeLike);
}

function activeLike() {
    this.classList.add('grid-card__like_active');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userVocation.textContent = jobInput.value;
    closePopupProfile();
}

function openPopupProfile() {
    popupProfile.classList.add('popup_opened');
    nameInput.value = userName.textContent;
    jobInput.value = userVocation.textContent;
}

function closePopupProfile() {
    popupProfile.classList.remove('popup_opened');
}

function openPopupCard() {
    popupCard.classList.add('popup_opened');
}

function closePopupCard() {
    popupCard.classList.remove('popup_opened');
}

popupProfile.addEventListener('submit', formSubmitHandler);
popupCard.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopupProfile);
addButton.addEventListener('click', openPopupCard);
popupCloseProfile.addEventListener('click', closePopupProfile);
popupCloseCard.addEventListener('click', closePopupCard);
