export class Api {
  constructor(url, token){
    this._url = url;
    this._token = token;


  }

  getAllInitialCards(){
    //console.log(`${this._url}cards/`)
    return fetch(`${this._url}cards`, {
      method:"GET",
      headers:{
        authorization: this._token,
        "content-type": "application/json"
      }

    }).then((res)=>{
      if (res.ok){ //true false
        return res.json()// Объекты
      }
      return Promise.reject(`Сервер недостпен!!!Ошибка: ${res.status}`)
      .catch((err)=>{
        console.log(err, "err из getAllCarads")
      })
    })
  }

  addCard(data){
    return fetch(`${this._url}cards/`,{
      method:"POST",
      headers:{
        authorization: this._token,
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((res)=>{
        if (res.ok){ //true false
          return res.json()// Объекты
        }
        return Promise.reject(`Сервер недостпен!!!Ошибка: ${res.status}`)
      .catch((err)=>{
          console.log(err, "err из addCard")
      })
    })
  }

  getInfoProfile(){

    return fetch(`${this._url}users/me`,{
      method:"GET",
      headers:{
        authorization: this._token,
        "content-type": "application/json"
      },
    })
    .then((res)=>{
      if (res.ok){ //true false
        return res.json()// Объекты
      }return Promise.reject(`Сервер недостпен!!!Ошибка: ${res.status}`)

    })
    .then((data)=>{
      return data
    })
    .catch((err)=>{
      console.log(err, "err из getInfoProfile")
    })
  }

  addInfoProfile(data){
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers:{
        authorization: this._token,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
    .then((res)=>{
      if (res.ok){ //true false
        return res.json()// Объекты
      } return Promise.reject(`Сервер недостпен!!!Ошибка: ${res.status}`)
    })
    .then((data)=>{

      return data
    })
    .catch((err)=>{
      console.log(err, "err из catch addInfoProfile");
    })
  }

  addInfoProfileAvatar(data){
     return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers:{
        authorization: this._token,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        avatar:data.avatar
      })
    })
    .then((res)=>{
      if (res.ok){ //true false
        return res.json()// Объекты
      } return Promise.reject(`Сервер недостпен!!!Ошибка: ${res.status}`)
    })
    .then((data)=>{

      return data
    })
    .catch((err)=>{
      console.log(err, "err из catch addInfoProfile");
    })
  }

  deleteCard(id){
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers:{
        authorization: this._token,
        "content-type": "application/json"
      },
    })
    .then((res)=>{
      if (res.ok){ //true false
        return res.json()// Объекты
      } return Promise.reject(`Сервер недостпен!!!Ошибка: ${res.status}`)
    })
    .then((data)=>{

      return data
    })
    .catch((err)=>{
      console.log(err, "err из deleteCard")
    })

  }

  putLike(id){
   return fetch(`${this._url}cards/likes/${id}`,{
      method:'PUT',
      headers:{
        authorization: this._token,
        "content-type": "application/json"
      },
    })
    .then((res)=>{
      if (res.ok){ //true false
        return res.json()// Объекты
      } return Promise.reject(`Сервер недостпен!!!Ошибка: ${res.status}`)
    })

  }

  deleteLike(id){
   return fetch(`${this._url}cards/likes/${id}`,{
      method:'DELETE',
      headers:{
        authorization: this._token,
        "content-type": "application/json"
      },
    })
    .then((res)=>{
      if (res.ok){ //true false
        return res.json()// Объекты
      } return Promise.reject(`Сервер недостпен!!!Ошибка: ${res.status}`)
    })

  }
}


