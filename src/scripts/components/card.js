
export class Card {
  constructor(item, cardSelector, handleCardClick, handleDeleteClick, api) {
    this._item = item;
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._api = api // приняли экземпляр класса Api
    this._cardElement = document.querySelector(this._cardSelector);
    this._handleDeleteClick = handleDeleteClick;
    //this._elementDelete = this._element//.querySelector(".element__delete");

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
  checkIdCard(id){
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
      const data = this._item;
      const element = this._cardElement; console.log(element)// прокидываем data с сервера в index.js для функции open popupDelete
      this._handleDeleteClick(data, element);
      console.log(this._item, "на меня нажали")

    });
    elementLike.addEventListener("click", () => {
      this._clickLikeButton();
    });
    elementImg.addEventListener("click", () => this._handleCardClick(this._link, this._name));

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


