export class UserInfo {
  constructor({ profileNameSelector, profileJobSelector}, api) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileJob = document.querySelector(profileJobSelector);
    this._api = api;
  }
  getUserInfo() {

    const profile = {
      name: this._profileName.textContent,
      about: this._profileJob.textContent,
    };
    return profile;
  }
  setUserInfo(data) {
    // console.log(this._api, "this._api");
    // console.log(data);
    //  this._api.addInfoProfile(data)
    //  this._api.getInfoProfile()
    //  .then((data)=>{
    this._profileName.textContent = data.name;
    this._profileJob.textContent = data.about;
  //      console.log(data,"data_setUserInfo");
  //  })

  }
}
