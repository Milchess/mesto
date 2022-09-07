export default class FormValidator {
    constructor(config, popup) {
        this._config = config;
        this._form = popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll(this._config.inputSelector);
    }

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._toggleInputError(inputElement);
                this._toggleButtonState();
            })
        })
    }

    _showInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.classList.add(this._config.errorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
    }

    _toggleInputError(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _toggleButtonState() {
        const buttonSubmit = this._form.querySelector(this._config.submitButtonSelector);
        if (!this._form.checkValidity()) {
            buttonSubmit.classList.add(this._config.inactiveButtonClass);
            buttonSubmit.disabled = true;
        } else {
            buttonSubmit.classList.remove(this._config.inactiveButtonClass);
            buttonSubmit.disabled = false;
        }
    }

    enableValidation() {
        this._setEventListeners();
    }

    deletePopupError() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
            this._toggleButtonState();
        })
    }
}