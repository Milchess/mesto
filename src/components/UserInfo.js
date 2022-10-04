export default class UserInfo {
    constructor(nameInputProfile, jobInputProfile, avatar) {
        this._nameInputProfile = document.querySelector(nameInputProfile);
        this._jobInputProfile = document.querySelector(jobInputProfile);
        this._avatar = document.querySelector(avatar);
    }

    getUserInfo() {
        return {
            name: this._nameInputProfile.textContent,
            about: this._jobInputProfile.textContent
        };
    }

    setUserInfo(item) {
        this._nameInputProfile.textContent = item.name;
        this._jobInputProfile.textContent = item.about;
    }

    getUserAvatar(item) {
        this._avatar.src = item.avatar;
    }
}