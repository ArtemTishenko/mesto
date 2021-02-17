//import {openPopupImg} from '../../src/pages/index.js';
export class Card {
  constructor(item, cardSelector, handleCardClick, api, popupDelete) {
    this._item = item;
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._api = api // приняли экземпляр класса Api
    this._cardElement = document.querySelector(this._cardSelector);
    this._elementDelete = this._element//.querySelector(".element__delete");
    this._popupDelete = popupDelete; // запихнуть из индекса
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

    //this._element.remove();
  }
  _checkMyOwnCards(){
    const idOwnerCard = this._item.owner._id;
    if (idOwnerCard === 'eb737b551021d96d37fd06c4'){
      this._cardElement.content.querySelector(".element__delete").classList.add("element__delete_visible")
      console.log(this._cardElement.content.querySelector(".element__delete").classList, "TRASH")
      console.log(idOwnerCard, "this._item из класса card")

      //добавление свойства visible у корзинки карточки
    }else{
      this._cardElement.content.querySelector(".element__delete").classList.remove("element__delete_visible")//удаления свойства visible у корзинки карточки
    }

  }
  _setEventListeners() {// вызов слушателей: лайк, удаление, popupImg ->(open modal -> добавление слушателя клика по overlay)
    const elementDelete = this._element.querySelector(".element__delete");
    const elementLike = this._element.querySelector(".element__like");
    const elementImg = this._element.querySelector(".element__img");

    elementDelete.addEventListener("click", () => {
      this._clickRemoveButton();
    });
    elementLike.addEventListener("click", () => {
      this._clickLikeButton();
    });
    elementImg.addEventListener("click", () => this._handleCardClick(this._link, this._name));
    this._checkMyOwnCards();
  }
  generateCard() {
    this._element = this._getTemplate(); // клонирование шаблона карточки
    this._element.querySelector(".element__caption").textContent = this._name;
    this._element
      .querySelector(".element__img")
      .setAttribute("src", `${this._link}`);
    this._element
      .querySelector(".element__img")
      .setAttribute("alt", `${this._name}`);

    this._setEventListeners();

    return this._element;
  }

  render;


}


