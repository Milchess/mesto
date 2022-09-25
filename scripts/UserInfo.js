export default class UserInfo {
    constructor(nameInputProfile, jobInputProfile) {
        this._nameInputProfile = document.querySelector(nameInputProfile);
        this._jobInputProfile = document.querySelector(jobInputProfile);
    }

    getUserInfo() {
        return {
            user: this._nameInputProfile.textContent,
            vocation: this._jobInputProfile.textContent
        };
    }

    setUserInfo(item) {
        this._nameInputProfile.textContent = item.user;
        this._jobInputProfile.textContent = item.vocation;
    }
}