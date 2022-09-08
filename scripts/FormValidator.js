export default class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
        this._inputList = this._form.querySelectorAll(this._config.inputSelector);
        this._buttonSubmit = this._form.querySelector(this._config.submitButtonSelector);
    }

    _generateElement(inputElement) {
        this._inputElement = inputElement;
        this._errorElement = this._form.querySelector(`.${this._inputElement.name}-error`);
    }

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._toggleInputError(inputElement);
                this._toggleButtonState();
            })
        })
    }

    _showInputError() {
        this._inputElement.classList.add(this._config.inputErrorClass);
        this._errorElement.classList.add(this._config.errorClass);
        this._errorElement.textContent = this._inputElement.validationMessage;
    }

    _hideInputError() {
        this._inputElement.classList.remove(this._config.inputErrorClass);
        this._errorElement.classList.remove(this._config.errorClass);
        this._errorElement.textContent = '';
    }

    _toggleInputError(inputElement) {
        this._generateElement(inputElement);
        if (!this._inputElement.validity.valid) {
            this._showInputError();
        } else {
            this._hideInputError();
        }
    }

    _toggleButtonState() {
        if (!this._form.checkValidity()) {
            this._buttonSubmit.classList.add(this._config.inactiveButtonClass);
            this._buttonSubmit.disabled = true;
        } else {
            this._buttonSubmit.classList.remove(this._config.inactiveButtonClass);
            this._buttonSubmit.disabled = false;
        }
    }

    enableValidation() {
        this._setEventListeners();
    }

    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._generateElement(inputElement);
            this._hideInputError();
        })
    }
}