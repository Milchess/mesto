import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._cardTitleImage = this._popup.querySelector('.popup-card__title');
        this._cardBigImage = this._popup.querySelector('.popup-card__image');
    }

    open(item) {
        super.open();

        this._cardTitleImage.textContent = item.name;
        this._cardBigImage.src = item.link;
        this._cardBigImage.alt = item.name;
    }
}