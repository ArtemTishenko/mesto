export class UserInfo{
  constructor({profileInfoName, profileInfoJob} ){
    this._profileName = profileInfoName;
    this._profileJob =profileInfoJob;
  }
  getUserInfo(){

    const profile = {
      name:this._profileName.textContent,
      job:this._profileJob.textContent
    };
    return profile
  }
  setUserInfo(data){
    this._profileName.textContent = data.name;
    this._profileJob.textContent = data.job
  }
}

