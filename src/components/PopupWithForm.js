import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(selector, submitHandler) {
        super(selector);
        this._form = this._popup.querySelector('.popup__form');
        this._submitHandler = submitHandler;
        this._inputElements = this._form.querySelectorAll('.popup__user');
        this._submit = this._form.querySelector('.popup__submit');
    }

    setInputValues(data) {
        this._inputElements.forEach((input) => {
            input.value = data[input.name];
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._getInputValues());
        })
    }

    close() {
        super.close();
        this._form.reset();
    }

    renderLoading(text = '') {
        if (text) {
            this._submit.textContent = text;
        } else {
            this._submit.textContent = 'Сохранение...';
        }
    }

    _getInputValues() {
        const formDataObject = {};

        this._inputElements.forEach((input) => {
            formDataObject[input.name] = input.value;
        })

        return formDataObject;
    }
}