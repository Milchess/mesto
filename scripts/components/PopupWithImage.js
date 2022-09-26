import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
    }

    open(item) {
        super.open();
        const cardTitleImage = this._popup.querySelector('.popup-card__title');
        const cardBigImage = this._popup.querySelector('.popup-card__image');

        cardTitleImage.textContent = item.name;
        cardBigImage.src = item.link;
        cardBigImage.alt = item.name;
    }
}