import {popupImage, cardTitleImage, cardBigImage, openPopup} from './index.js';

export default class Card {
    constructor(data, templateSelector) {
        this._title = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = this._templateSelector.content.querySelector('.grid-card').cloneNode(true);
        this._gridCardTitle = cardElement.querySelector('.grid-card__title');
        this._gridCardImage = cardElement.querySelector('.grid-card__image');

        return cardElement;
    }

    _createCard() {
        this._element = this._getTemplate();

        this._gridCardTitle.textContent = this._title;
        this._gridCardImage.src = this._link;
        this._gridCardImage.alt = this._title;

        this._addEventDeleteCardListener();
        this._addLikeActiveListener();
        this._addEventOpenImageListener();

        return this._element;
    }

    _addEventDeleteCardListener() {
        const deleteButton = this._element.querySelector('.grid-card__delete');
        deleteButton.addEventListener('click', () => deleteButton.closest('.grid-card').remove());
    }

    _addLikeActiveListener() {
        const likeActive = this._element.querySelector('.grid-card__like');

        likeActive.addEventListener('click', function (evt) {
            evt.target.classList.toggle('grid-card__like_active');
        });
    }

    _addEventOpenImageListener() {
        const cardBigImage = this._element.querySelector('.grid-card__image');
        cardBigImage.addEventListener('click', () => {
            openPopup(popupImage);
            this._initImagePopup();
        });
    }

    _initImagePopup() {
        cardTitleImage.textContent = this._title;
        cardBigImage.alt = this._title;
        cardBigImage.src = this._link;
    }
}