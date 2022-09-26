export default class Card {
    constructor(data, template, handleCardClick) {
        this._title = data.name;
        this._link = data.link;
        this._template = template;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = this._template.content.querySelector('.grid-card').cloneNode(true);
        this._gridCardTitle = cardElement.querySelector('.grid-card__title');
        this._gridCardImage = cardElement.querySelector('.grid-card__image');

        return cardElement;
    }

    _generateButton() {
        this._likeButton = this._element.querySelector('.grid-card__like');
        this._deleteButton = this._element.querySelector('.grid-card__delete');
    }

    createCard() {
        this._element = this._getTemplate();
        this._generateButton();

        this._gridCardTitle.textContent = this._title;
        this._gridCardImage.src = this._link;
        this._gridCardImage.alt = this._title;

        this._setEventListeners();

        return this._element;
    }

    _addEventDeleteCardListener() {
        this._deleteButton.addEventListener('click', () => this._deleteButton.closest('.grid-card').remove());
    }

    _addLikeActiveListener() {
        this._likeButton.addEventListener('click', function (evt) {
            evt.target.classList.toggle('grid-card__like_active');
        });
    }

    _setEventListeners() {
        this._addEventDeleteCardListener();
        this._addLikeActiveListener();
        this._gridCardImage.addEventListener('click', () => this._handleCardClick(this._title, this._link));
    }
}
