import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';

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

  // обработчик изменения информации о пользователе
  function handleUpdateUser(props) {
    api.editProfileInfo(props)
      .then(data => {
        setCurrentUser({ name: data.name, description: data.about, avatar: data.avatar, id: data._id });
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  // обработчик изменения аватара
  function handleUpdateAvatar(props) {
    api.editAvatar(props.avatar)
      .then(data => {
        setCurrentUser({ name: data.name, description: data.about, avatar: data.avatar, id: data._id });
        closeAllPopups();
      })
      .catch(err => console.log(err));
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
          <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
          <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
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
