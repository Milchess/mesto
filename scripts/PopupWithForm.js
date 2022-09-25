import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(selector, submitHandler) {
        super(selector);
        this._form = this._popup.querySelector('.popup__form');
        this._submitHandler = submitHandler;
        this._inputElements = this._form.querySelectorAll('.popup__user');
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._getInputValues());

            this.close();
        })
    }

    close() {
        super.close();
        this._form.reset();
    }

    _getInputValues() {
        const formDataObject = {};

        this._inputElements.forEach((input) => {
            formDataObject[input.name] = input.value;
        })

        return formDataObject;
    }
}