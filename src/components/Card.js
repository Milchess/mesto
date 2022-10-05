export default class Card {
    constructor(data, template, userId, handlerCardClick, deleteCardClick, handlerLikeClick) {
        this._title = data.name;
        this._link = data.link;
        this._id = data._id;
        this._ownerId = data.owner._id;
        this._userId = userId;
        this._likes = data.likes;
        this._template = template;
        this._handlerCardClick = handlerCardClick;
        this._deleteCardClick = deleteCardClick;
        this._handlerLikeClick = handlerLikeClick;
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
        this._likeQuantity = this._element.querySelector('.grid-card__like-quantity');

        if (this._ownerId !== this._userId) {
            this._element.querySelector('.grid-card__delete').remove();
        }

        this._likeQuantity.textContent = this._likes.length;
        this._gridCardTitle.textContent = this._title;
        this._gridCardImage.src = this._link;
        this._gridCardImage.alt = this._title;

        this._element.id = this._id;
        this._setEventListeners();

        return this._element;
    }

    _addEventDeleteCardListener() {
        this._deleteButton.addEventListener('click', () => {
            this._deleteCardClick(this._element);
        });
    }

    _addLikeActiveListener() {
        this._likeButton.addEventListener('click', () => this._handlerLikeClick(this));
    }

    _setEventListeners() {
        this._addEventDeleteCardListener();
        this._addLikeActiveListener();
        this._gridCardImage.addEventListener('click', () => this._handlerCardClick(this._title, this._link));
    }

    updateLikes(likes) {
        this._likes = likes;
        this._likeQuantity.textContent = likes.length;
    }

    isLiked() {
        return this._likes.some(item => item._id == this._userId)
    }

    addLikeButton() {
        this._likeButton.classList.add('grid-card__like_active');
    }

    removeLikeButton() {
        this._likeButton.classList.remove('grid-card__like_active');
    }
}
