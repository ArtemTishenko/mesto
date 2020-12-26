const profileButtonInfoEddit = document.querySelector(
  ".profile__button-info-eddit"
);
const profileButtonAdd = document.querySelector(".profile__button-add");

const popupEditForm = document.querySelector(".popup_type_edit-form");

const popupImg = document.querySelector(".popup_type_img");
const popupButtonCloseImg = document.querySelector("#popup__button-close_img"); // при обращении через id не нужно формировать файловую структуру по БЭМ

const popupCard = document.querySelector(".popup_type_card");

const popupButtonClose = document.querySelector(
  ".popup__button-close_type_eddit-form"
);
const popupButtonCloseCard = document.querySelector(
  ".popup__button-close_type_card"
);

const popupContainerEdditForm = document.querySelector(
  ".popup__container_type_eddit-form"
);
const nameInput = popupContainerEdditForm.querySelector(
  ".popup__field_type_name"
);
const jobInput = popupContainerEdditForm.querySelector(
  ".popup__field_type_job"
);

const popupContainerCard = document.querySelector(
  ".popup__container_type_card"
);
const popupContainerCardName = popupContainerCard.querySelector(
  ".popup__field_type_card-name"
);
const popupContainerCardLink = popupContainerCard.querySelector(
  ".popup__field_type_card-link"
);

const profileInfoNameNode = document.querySelector(".profile__info-name");
const profileInfoJobNode = document.querySelector(".profile__info-job");

const listContainerElement = document.querySelector(".elements");
const templateCard = document.querySelector(".template");

const popupPicture = popupImg.querySelector(".popup__picture");
const popupPictureCaption = popupImg.querySelector(".popup__picture-caption");

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const validationSelect = {
  popupEditForm: ".popup_type_edit-form",
  popupCard: ".popup_type_card",
  popupImg: ".popup_type_img",
};
const formsStates = {
  // false - close, true - open
  popupEditForm: false,
  popupCard: false,
  popupImg: false,
  itemPopup: false,
};
//*****************************Открытие и закрытие popup окон*****************************//

function handleModal(dompopup) {
  const formsList = Object.keys(dompopup);
  formsList.forEach((item) => {
    const domItem = document.querySelector(validationSelect[item]);

    if (domItem) {
      if (!dompopup[item]) {
        domItem.classList.remove("popup_visible");
      } else {
        domItem.classList.add("popup_visible");

        enableValidation(validationConfig); // использована функция проверки валидации для того, что бы в popup окне редактирования профиля кнопка была активна, т.к в input заносится иформация c openPopupEddit form
        closeByOverlay();
      }
    }
  });
  closePopupEscape();
}
function openPopupEdditForm() {
  nameInput.value = profileInfoNameNode.textContent; //подтяжка с profile-info в форму
  jobInput.value = profileInfoJobNode.textContent;
  const openedForms = {
    ...formsStates,
    popupEditForm: true,
  };
  handleModal(openedForms);
}
function openPopupCard() {
  const Example = document.querySelector(validationConfig.formSelectorForm);
  Example.reset();
  const openedForms = {
    ...formsStates,
    popupCard: true,
  };
  handleModal(openedForms);
}
function openPopupImg(event) {
  const eventTargetSrc = event.target.getAttribute("src");
  const eventTargetAlt = event.target.getAttribute("alt");
  const eventTargetCaption = event.target.parentElement.querySelector(
    ".element__caption"
  ).innerHTML;

  popupPicture.setAttribute("src", eventTargetSrc);
  popupPicture.setAttribute("alt", eventTargetAlt);
  popupPictureCaption.textContent = eventTargetCaption;

  const openedForms = {
    ...formsStates,
    popupImg: true,
  };
  handleModal(openedForms);
}
//*************************************************************************************** //
function formSubmitHandler() {
  profileInfoNameNode.textContent = nameInput.value; // Вставляем новые значения с помощью textContent
  profileInfoJobNode.textContent = jobInput.value;
  const closedForms = {
    ...formsStates,
    popupEditForm: false,
  };
  handleModal(closedForms);
}

function addNewCard(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки

  const newCardName = popupContainerCardName.value; // Вставляем название карточки
  const newCardLink = popupContainerCardLink.value; // Вставляем ссылку на картинку для карточки

  const newCarItem = composeCard({ name: newCardName, link: newCardLink });
  listContainerElement.prepend(newCarItem);

  const closedForms = {
    ...formsStates,
    popupCard: false,
  };
  handleModal(closedForms);
}
function renderCard() {
  // функция добавления карточки из массива
  const cardItems = initialCards.map(composeCard);
  listContainerElement.append(...cardItems);
}
function composeCard(item) {
  // Функция клонирования template, добавления картинки и имени карточки
  const newCard = templateCard.content.cloneNode(true);
  const elementCaption = newCard.querySelector(".element__caption");
  const elementImg = newCard.querySelector(".element__img");
  const elementDelete = newCard.querySelector(".element__delete"); //* delete button
  const elementLike = newCard.querySelector(".element__like"); //* like button

  elementCaption.textContent = item.name;
  elementImg.setAttribute("src", `${item.link}`);
  elementImg.setAttribute("alt", `${item.name}`);

  elementDelete.addEventListener("click", clickRemoveButton); //* delete button
  elementLike.addEventListener("click", clickLikeButton); //* like button

  elementImg.addEventListener("click", openPopupImg);

  return newCard;
}
function clickRemoveButton(event) {
  //Функция удления карточки
  event.target.closest(".element").remove();
}
function clickLikeButton(event) {
  //Функция установки like
  event.target.classList.toggle("element__like_active");
}

function closeByOverlay() {
  //*****ЗАКРЫТИЕ на Overlay */
  const overlay = document.querySelectorAll(".popup");
  overlay.forEach(function (itemPopup) {
    const popupContainerForm = itemPopup.querySelector(".popup__container");
    popupContainerForm.addEventListener("click", (event) => {
      event.stopImmediatePropagation();
    });

    itemPopup.addEventListener("click", (event) => {
      const closedForms = {
        ...formsStates,
        itemPopup: false,
      };
      handleModal(closedForms);
    });

    popupContainerForm.addEventListener("click", (event) => {
      event.stopImmediatePropagation();
    });
  });
}

popupButtonCloseCard.addEventListener("click", function () {
  const closedForms = {
    ...formsStates,
    popupCard: false,
  };
  handleModal(closedForms);
});
popupButtonCloseImg.addEventListener("click", function () {
  const closedForms = {
    ...formsStates,
    popupImg: false,
  };
  handleModal(closedForms);
});
// Прикрепляем обработчики к форме: он будет следить за событием “submit” - «отправка»

popupContainerEdditForm.addEventListener("submit", formSubmitHandler);
popupContainerCard.addEventListener("submit", addNewCard);

profileButtonInfoEddit.addEventListener("click", openPopupEdditForm);
profileButtonAdd.addEventListener("click", openPopupCard);
popupButtonClose.addEventListener("click", function () {
  const closedForms = {
    ...formsStates,
    popupEditForm: false,
  };
  handleModal(closedForms);
});

//*****ЗАКРЫТИЕ на Escape */
function closePopupEscape() {
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      const closedForms = {
        ...formsStates, //
        popupEditForm: false,
        popupCard: false,
        popupImg: false,
        overlay: false,
      };
      handleModal(formsStates);
    }
  });
}

renderCard();
