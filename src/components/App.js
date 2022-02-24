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
import AddPlacePopup from './AddPlacePopup';

function App() {
  // хуки состояния открытия/закрытия popup
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  // хуки состояния popup с изображением
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });;
  // хуки состояния данных о пользователе
  const [currentUser, setCurrentUser] = React.useState({ name: '', description: '', avatar: '', id: '' });
  // хуки состояния загрузки массива карточек
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    // загрузка массива карточек с сервера
    api.getInitialCards()
      .then(data => {
        setCards(data);
      })
      .catch(err => console.log(err));
  }, []);

  // обработчик клика на лайк
  function handleCardLike(card) {
    // проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser.id);

    // oтправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card.id, isLiked)
      .then(newCard => {
        const newArrayCards = cards.map(item => item._id === card.id ? newCard : item);

        setCards(newArrayCards);
      })
      .catch(err => console.log(err));
  }

  // обработчик удаления карточки
  function handleCardDelete(card) {
    api.deleteCard(card.id)
      .then( _ => {
        const newArrayCards = cards.filter(item => item._id !== card.id);

        setCards(newArrayCards);
      })
      .catch(err => console.log(err));
  }

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

  // обработчик добавления новой карточки
  function handleAddPlaceSubmit(props) {
    api.sendNewCard(props)
      .then(data => {
        setCards([data, ...cards]);
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
          <Main onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete} />
          <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar}
                          isOpen={isEditAvatarPopupOpen}
                          onClose={closeAllPopups} />
          <EditProfilePopup onUpdateUser={handleUpdateUser}
                            isOpen={isEditProfilePopupOpen}
                            onClose={closeAllPopups} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit} />
          <PopupWithForm name="delete-card" title="Вы уверены?" buttonText="Да">
            <input type="hidden" name="card-id" className="form__input-id" />
          </PopupWithForm>
          <ImagePopup card={selectedCard}
                      onClose={closeAllPopups} />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
