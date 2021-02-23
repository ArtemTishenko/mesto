export class UserInfo {
  constructor({ profileNameSelector, profileJobSelector, profileAvatarButton}) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileJob = document.querySelector(profileJobSelector);
    this._profileAvatarButton = document.querySelector(profileAvatarButton)


  }
  getUserInfo() {

    const profile = {
      name: this._profileName.textContent,
      about: this._profileJob.textContent,
      //avatar: this._profileAvatarButton.style.backgroundImage
    };
    return profile;
  }
  setUserInfo(data) {

    this._profileName.textContent = data.name;
    this._profileJob.textContent = data.about;

  }

  setUserAvatar(data){
    this._profileAvatarButton.style.backgroundImage =`url(${data.avatar})`;
  }
}
