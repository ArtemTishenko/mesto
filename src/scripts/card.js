//import {openPopupImg} from '../../src/pages/index.js';
export class Card {
  constructor(item, cardSelector, handleCardClick) {
    this._item = item;
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {// возвращает шаблон разметки карточки
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }
  _clickLikeButton() {
    this._element.querySelector(".element__like").classList.toggle("element__like_active");
  }
  _clickRemoveButton() {
    this._element.remove();
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
    elementImg.addEventListener("click", this._handleCardClick);

  }
  generateCard() {
    this._element = this._getTemplate();// клонирование шаблона карточки
    this._element.querySelector(".element__caption").textContent = this._name;
    this._element.querySelector(".element__img").setAttribute("src", `${this._link}`);
    this._element.querySelector(".element__img").setAttribute("alt", `${this._name}`);

    this._setEventListeners();


    return this._element;
  }
  render
}
