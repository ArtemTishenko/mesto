
export class Card {
  constructor(itemData, cardSelector, handleCardClick, handleDeleteClick) {
    this._item = itemData;
    this._name = this._item.name;
    this._link = this._item.link;
    this._cardId = this._item._id;
    this._ownerId = this._item.owner._id;

    this._cardSelector = cardSelector;
    this._cardElement = document.querySelector(this._cardSelector);


    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;// popupDelete


    // this._cardElementLike = this._cardElement.querySelector(".element__like");
    // this._cardImage = this._cardElement.querySelector(".element__img");


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

  _setEventListeners() {// вызов слушателей: лайк, удаление, popupImg ->(open modal -> добавление слушателя клика по overlay)

    const elementDelete = this._element.querySelector(".element__delete");

    const elementLike = this._element.querySelector(".element__like");
    const elementImg = this._element.querySelector(".element__img");

    elementDelete.addEventListener("click", () => {
      //const data = this._item;
      const element = this._element;
      console.log(element, "прокидываемый элемент")// прокидываем data с сервера в index.js для функции open popupDelete
       console.log(this._item, "нажатая картинка")
      this._handleDeleteClick(this._item,element); // в popupDelete передается data-объект с сервера, element- DOM разметка нового экземпляра карточки
    });

    elementLike.addEventListener("click", () => {
      this._clickLikeButton();
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

    this._setEventListeners();



    // console.log(this._item,"this._item(itemData)");
    // console.log(this._name,"this._name");
    // console.log(this._link,"this._link");
    // console.log(this._cardId, "this._cardId");
    // console.log(this._ownerId, "this._ownerId");
    // console.log('_____________________________________');
    // console.log(this._element, "this._cardElement");
   // console.log(this._cardElementTrash, "this._cardElementTrash");


    return this._element;
  }

  render;


}


