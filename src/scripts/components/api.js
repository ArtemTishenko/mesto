export class Api {
  constructor(config){
    this._url = config.url;
    this._headers = config.headers
  }

  getAllCarads(){
    return fetch(this._url,{
      method:"GET",
      headers: this._headers
    }).then((res)=>{
      if (res.ok){ //true false
        return res.json()// Объекты
      }
      return Promise.reject('Сервер недостпен!!!!!!!')
      .catch((err)=>{
        console.log(err, "err из getAllCarads")
      })
    })
  }

  addCard(data){
    return fetch(this._url,{
      method:"POST",
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res)=>{
        if (res.ok){ //true false
          return res.json()// Объекты
        }
        return Promise.reject('Сервер недостпен!!!!!!!')
      .catch((err)=>{
          console.log(err, "err из addCard")
      })
    })
  }

  getInfoProfile(){
    return fetch(this._url,{
      method:"GET",
      headers: this._headers
    }).then((res)=>{
      if (res.ok){ //true false
        return res.json()// Объекты
      }return Promise.reject('Сервер недостпен!!!!!!!')
      .catch((err)=>{
        console.log(err, "err из getAllCarads")
      })
    })
  }

  addInfoProfile(data){
    fetch(this._url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
    .then((res)=>{
      if (res.ok){ //true false
        return res.json()// Объекты
      } return Promise.reject('Сервер недостпен!!!!!!!')
    })
    .then((data)=>{
      console.log(data, "data _api")
      return data
    })
    .catch((err)=>{
      console.log(err, "err из catch addInfoProfile");
    })
  }

  addInfoProfileAvatar(data){
    fetch(this._url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar:data.avatar
      })
    })
    .then((res)=>{
      if (res.ok){ //true false
        return res.json()// Объекты
      } return Promise.reject('Сервер недостпен!!!!!!!')
    })
    .then((data)=>{
      //console.log(data, "data _api addInfoProfileAvatar")
      return data
    })
    .catch((err)=>{
      console.log(err, "err из catch addInfoProfile");
    })
  }

  deleteCard(data){
    fetch(this._url, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res)=>{
      if (res.ok){ //true false
        return res.json()// Объекты
      } return Promise.reject('Сервер недостпен!!!!!!!')
    })
    .catch((err)=>{
      console.log(err, "err из deleteCard")
    })
  }

}




