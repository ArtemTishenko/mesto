
export class Card {
  constructor(itemData, cardSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._item = itemData; // данные с сервера о карточке
    this._name = this._item.name;
    this._link = this._item.link;
    this._cardId = this._item._id;
    this._ownerId = this._item.owner._id;
    this._likes = itemData.likes;
    this._cardSelector = cardSelector;
    this._cardElement = document.querySelector(this._cardSelector);

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;// popupDelete
    this._handleLikeClick = handleLikeClick;


  }



  _getTemplate() {// возвращает шаблон разметки карточки
    const cardElement = this._cardElement
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }
  _clickLikeButton() {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }
  _clickRemoveButton() {
    this._element.remove();
  }
  _checkIdCard(id){
    if (id === "eb737b551021d96d37fd06c4"){
      this.showDeleteButtonCard()
    }else{
      this._cardElement.content.querySelector(".element__delete").classList.remove("element__delete_visible")//удаления свойства visible у корзинки карточки
    }
  }
  showDeleteButtonCard(){
    this._cardElement.content.querySelector(".element__delete").classList.add("element__delete_visible")
  }


  _checkLike(){ //true/false

    return this._likes.some((like)=>{
      return like._id === "eb737b551021d96d37fd06c4"
    })
  }

  addLike(){
    this._element.querySelector(".element__like").classList.add("element__like_active");
  }
  removeLike(){
    this._element.querySelector(".element__like").classList.remove("element__like_active");
  }
  countLikes(dataCardLikes){
    const counterElemnt = this._element.querySelector(".element__counter");
    counterElemnt.textContent = dataCardLikes.length;

  }
  checkMylike(){
    if(this._checkLike()){// если true - мой лайк есть/ false -моего лайк нет
      this.addLike()
    }else{
      this.removeLike()
    }
  }
  _likeLoaderWrapper = (dataCard, element, checkMyLike)=>{
    this._handleLikeClick(dataCard, element, checkMyLike)
      .then(({likes})=>{

        this._likes = likes
      })
  }
  _setEventListeners() {// вызов слушателей: лайк, удаление, popupImg ->(open modal -> добавление слушателя клика по overlay)

    const elementDelete = this._element.querySelector(".element__delete");

    const elementLike = this._element.querySelector(".element__like");
    const elementImg = this._element.querySelector(".element__img");

    elementDelete.addEventListener("click", () => {

      const element = this._element;
      this._handleDeleteClick(this._item,element); // в popupDelete передается data-объект с сервера, element- DOM разметка нового экземпляра карточки
    });

    elementLike.addEventListener("click", () => {
      this._likeLoaderWrapper(this._item, this , this._checkLike())
    });

    elementImg.addEventListener("click", () =>{
      this._handleCardClick(this._link, this._name
      )
    });

  }
  generateCard() {
    this._element = this._getTemplate(); // клонирование шаблона карточки
    this._element.querySelector(".element__caption").textContent = this._name;
    this._element.setAttribute("id",this._cardId)
    this._element
      .querySelector(".element__img")
      .setAttribute("src", `${this._link}`);
    this._element
      .querySelector(".element__img")
      .setAttribute("alt", `${this._name}`);

    this._checkIdCard(this._ownerId)
    this.showDeleteButtonCard(this._item)


    this._setEventListeners();
    ///this._setLikeCard2(this._likes);
    //this.setLikeCard(this._likes);
    this.countLikes(this._likes);
    this.checkMylike();
    return this._element;
  }

  render;


}


