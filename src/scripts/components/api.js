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


}




