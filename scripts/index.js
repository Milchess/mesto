let popupProfile = document.querySelector('#popup-profile');
let nameInput = popupProfile.querySelector('.popup__user_type_name');
let jobInput = popupProfile.querySelector('.popup__user_type_vocation');

let editButton = document.querySelector('.profile__edit-button');
let userName = document.querySelector('.profile__user-name');
let userVocation = document.querySelector('.profile__user-vocation');

let popupCard = document.querySelector('#popup-card');
let addButton = document.querySelector('.profile__add-button');

let popupCloses = document.querySelectorAll('.popup__button-close');
let likeActives = document.querySelectorAll('.grid-card__like');

function closePopup() {
    let popup = document.querySelector('.popup_opened');
    popup.classList.remove('popup_opened');
}

for (let popupClose of popupCloses) {
    popupClose.addEventListener('click', closePopup);
}

for (let likeActive of likeActives) {
    likeActive.addEventListener('click', function () {
        if (this.classList.contains('grid-card__like_active')) {
            this.classList.remove('grid-card__like_active');
        } else {
            this.classList.add('grid-card__like_active');
        }
    });
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

    closePopup();
});

addButton.addEventListener('click', function () {
    popupCard.classList.add('popup_opened');
});




