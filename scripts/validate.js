const model = {
    formSelector: '.popup__form',
    inputSelector: '.popup__user',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const enableValidation = (object) => {
    const formList = Array.from(document.querySelectorAll(object.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(object, formElement);
    });
};

const showInputError = (inputErrorClass, errorClass, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = inputElement.validationMessage;
};

const hideInputError = (inputErrorClass, errorClass, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (object, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(object.inputErrorClass, object.errorClass, formElement, inputElement);
    } else {
        hideInputError(object.inputErrorClass, object.errorClass, formElement, inputElement);
    }
};

const setEventListeners = (object, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(object, formElement, inputElement);
            buttonDisabled(object, formElement);
        });
    });
};

const buttonDisabled = (object, formElement) => {
    const buttonSubmit = formElement.querySelector('.popup__submit');
    if (!formElement.checkValidity()) {
        buttonSubmit.classList.add('popup__button_disabled');
        buttonSubmit.disabled = true;
    } else {
        buttonSubmit.classList.remove('popup__button_disabled');
        buttonSubmit.disabled = false;
    }
};

const deletePopupError = (object, popup) => {
    const inputList = Array.from(popup.querySelectorAll(object.inputSelector));
    const formElement = popup.querySelector(object.formSelector);
    inputList.forEach((inputElement) => {
        hideInputError(object.inputErrorClass, object.errorClass, popup, inputElement);
        buttonDisabled(object, formElement);
    });
};

enableValidation(model);