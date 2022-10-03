export default class Api {
    constructor() {
        this._baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-51/';
        this._headers = {
            authorization: '38f4a1b9-fdca-415d-86b5-0f7384ead109',
            'Content-Type': 'application/json'
        }
    }

    _fetchNoBody(method, link) {
        return fetch(this._baseUrl + link, {
            method: method,
            headers: this._headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    _fetchBody(method, link, model = {}) {
        return fetch(this._baseUrl + link, {
            method: method,
            headers: this._headers,
            body: JSON.stringify(model)
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    getInitialCards() {
        return this._fetchNoBody('GET', 'cards');
        //return this._fetchBody('POST', 'cards', {name:'aaa', link:'aaa'})
    }

    getUserInformation() {
        return this._fetchNoBody('GET', 'users/me');
    }

    patchUserUpdate(model) {
        return this._fetchBody('PATCH', 'users/me', model);
    }

    postCreateCard(model) {
        return this._fetchBody('POST', 'cards', model);
    }

    deleteCard(cardId) {
        return this._fetchNoBody('DELETE', `cards/${cardId}`);
    }

    putLikeCard(cardId) {
        return this._fetchNoBody('PUT', `cards/${cardId}/likes`);
    }

    deleteLikeCard(cardId) {
        return this._fetchNoBody('DELETE', `cards/${cardId}/likes`);
    }

    patchUserAvatar(model) {
        return this._fetchBody('PATCH', 'users/me/avatar', model);
    }
}