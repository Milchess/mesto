export default class Card {
    constructor(config, data, template, userId, handlerCardClick, deleteCardClick, handlerLikeClick) {
        this._config = config;
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
        const cardElement = this._template.content.querySelector(this._config.cardSelector).cloneNode(true);

        this._gridCardTitle = cardElement.querySelector(this._config.titleSelector);
        this._gridCardImage = cardElement.querySelector(this._config.imageSelector);

        return cardElement;
    }

    _generateButton() {
        this._buttonLike = this._element.querySelector(this._config.likeButtonSelector);
        this._buttonDelete = this._element.querySelector(this._config.buttonDeleteSelector);
    }

    createCard() {
        this._element = this._getTemplate();
        this._generateButton();
        this._likeQuantity = this._element.querySelector(this._config.likeQuantitySelector);

        if (this._ownerId !== this._userId) {
            this._buttonDelete.remove();
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
        this._buttonDelete.addEventListener('click', () => {
            this._deleteCardClick(this._element);
        });
    }

    _addLikeActiveListener() {
        this._buttonLike.addEventListener('click', () => this._handlerLikeClick(this));
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
        this._buttonLike.classList.add(this._config.likeActiveSelector);
    }

    removeLikeButton() {
        this._buttonLike.classList.remove(this._config.likeActiveSelector);
    }
}
