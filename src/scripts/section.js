//import { Card } from "../scripts/card.js";
export class Section{
  constructor({items,renderer}, containerSelector){ //renderer
    this._items = items;
    this._renderer = renderer,
    this._container = containerSelector
  }

  renderCard(item){
      this._renderer(item);
  }

  addItem(elementCard){// принимает DOM элемент и добавляет его в контейнер
    this._container.append(elementCard)
  }
  addNewItem(elementCard){
    this._container.prepend(elementCard)
  }

}



