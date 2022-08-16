const enableValidation = (configValidate) => {
    const formList = document.querySelectorAll(configValidate.formSelector);
    formList.forEach((formElement) => {
        setEventListeners(configValidate, formElement);
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

const toggleInputError = (configValidate, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(configValidate.inputErrorClass, configValidate.errorClass, formElement, inputElement);
    } else {
        hideInputError(configValidate.inputErrorClass, configValidate.errorClass, formElement, inputElement);
    }
};

const setEventListeners = (configValidate, formElement) => {
    const inputList = formElement.querySelectorAll(configValidate.inputSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            toggleInputError(configValidate, formElement, inputElement);
            toggleButtonState(configValidate, formElement);
        });
    });
};

const toggleButtonState = (configValidate, formElement) => {
    const buttonSubmit = formElement.querySelector(configValidate.submitButtonSelector);
    if (!formElement.checkValidity()) {
        buttonSubmit.classList.add(configValidate.inactiveButtonClass);
        buttonSubmit.disabled = true;
    } else {
        buttonSubmit.classList.remove(configValidate.inactiveButtonClass);
        buttonSubmit.disabled = false;
    }
};

const deletePopupError = (configValidate, popup) => {
    const inputList = popup.querySelectorAll(configValidate.inputSelector);
    const formElement = popup.querySelector(configValidate.formSelector);
    inputList.forEach((inputElement) => {
        hideInputError(configValidate.inputErrorClass, configValidate.errorClass, popup, inputElement);
        toggleButtonState(configValidate, formElement);
    });
};