import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  // хуки состояния открытия/закрытия popup
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  // хуки состояния popup с изображением
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});;

  // открытие popup для редактирования аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // открытие popup в profile__info
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // открытие popup для добавления карточки в elements
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // закрытие всех popup
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({...{name: '', link: ''}});
  }

  // открытие popup с изображением
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <body className="site-background">
      <div className="page">
        <Header />
        <Main onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick} />
        <PopupWithForm name="edit-avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <input type="url" className="form__item" id="avatar-url" name="avatar" placeholder="Ссылка на аватар" required />
          <span className="avatar-url-input-error form__input-error"></span>
          <button type="submit" className="form__button">Сохранить</button>
        </PopupWithForm>
        <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <input type="text" className="form__item" id="name" name="name" placeholder="Имя" minlength="2" maxlength="40" required />
          <span className="name-input-error form__input-error"></span>
          <input type="text" className="form__item" id="profession" name="profession" placeholder="О себе" minlength="2" maxlength="200" required />
          <span className="profession-input-error form__input-error"></span>
          <button type="submit" class="form__button">Сохранить</button>
        </PopupWithForm>
        <PopupWithForm name="add-card" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <input type="text" className="form__item" id="place" name="name" placeholder="Название" minlength="2" maxlength="30" required />
          <span className="place-input-error form__input-error"></span>
          <input type="url" className="form__item" id="place-url" name="link" placeholder="Ссылка на картинку" required />
          <span className="place-url-input-error form__input-error"></span>
          <button type="submit" className="form__button">Создать</button>
        </PopupWithForm>
        <PopupWithForm name="delete-card" title="Вы уверены?">
          <input type="hidden" name="card-id" className="form__input-id" />
          <button type="submit" className="form__button">Да</button>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Footer />
      </div>
    </body>
  );
}

export default App;
