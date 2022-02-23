import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  // хуки состояния открытия/закрытия popup
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  // хуки состояния popup с изображением
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });;

  // хуки состояния данных о пользователе
  const [currentUser, setCurrentUser] = React.useState({ name: '', description: '', avatar: '', id: '' });

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

  React.useEffect(() => {
    // загрузка информации о пользователе с сервера
    api.getUserInfo()
      .then(data => {
        const { name, about, avatar, _id } = data;
        setCurrentUser({ name: name, description: about, avatar: avatar, id: _id })
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="site-background">
        <div className="page">
          <Header />
          <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />
          <PopupWithForm name="edit-avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonText="Сохранить">
            <input type="url" className="form__item" id="avatar-url" name="avatar" placeholder="Ссылка на аватар" required />
            <span className="avatar-url-input-error form__input-error"></span>
          </PopupWithForm>
          <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} buttonText="Сохранить">
            <input type="text" className="form__item" id="name" name="name" placeholder="Имя" minLength="2" maxLength="40" required />
            <span className="name-input-error form__input-error"></span>
            <input type="text" className="form__item" id="profession" name="profession" placeholder="О себе" minLength="2" maxLength="200" required />
            <span className="profession-input-error form__input-error"></span>
          </PopupWithForm>
          <PopupWithForm name="add-card" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText="Создать">
            <input type="text" className="form__item" id="place" name="name" placeholder="Название" minLength="2" maxLength="30" required />
            <span className="place-input-error form__input-error"></span>
            <input type="url" className="form__item" id="place-url" name="link" placeholder="Ссылка на картинку" required />
            <span className="place-url-input-error form__input-error"></span>
          </PopupWithForm>
          <PopupWithForm name="delete-card" title="Вы уверены?" buttonText="Да">
            <input type="hidden" name="card-id" className="form__input-id" />
          </PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
