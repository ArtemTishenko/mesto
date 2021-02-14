export class UserInfo {
  constructor({ profileNameSelector, profileJobSelector}) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileJob = document.querySelector(profileJobSelector);
  }
  getUserInfo() {
    const profile = {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
    };
    return profile;
  }
  setUserInfo(data) {

    this._profileName.textContent = data.name;
    this._profileJob.textContent = data.about;
  }
}
