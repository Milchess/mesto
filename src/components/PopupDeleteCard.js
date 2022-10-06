import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
    constructor(selector) {
        super(selector);
        this._popupFormDeleteCard = this._popup.querySelector('.popup__form');
    }

    setPopupSubmitAction(handleSubmitClick) {
        this._handleSubmitClick = handleSubmitClick;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupFormDeleteCard.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitClick();
        })
    }
}