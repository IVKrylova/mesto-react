import React from 'react';
import { api } from '../utils/api';
import Card from './Card';

function Main(props) {
  // хуки состояния данных о пользователе
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  // хуки состояния загрузки массива карточек
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    // загрузка информации о пользователе с сервера
    api.getUserInfo()
      .then(data => {
        const { name, about, avatar } = data;
        setUserName(name);
        setUserDescription(about);
        setUserAvatar(avatar);
      })
      .catch(err => console.log(err));
  }, []);

  React.useEffect(() => {
    // загрузка массива карточек с сервера
    api.getInitialCards()
      .then(data => {
        setCards(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }}>
          <button onClick={props.onEditAvatar} className="profile__button-edit-avatar" type="button" aria-label="Кнопка редактировать аватар"></button>
        </div>
        <div className="profile__info">
          <div className="profile__list">
            <h1 className="profile__name">{userName}</h1>
            <p className="profile__profession">{userDescription}</p>
          </div>
          <button onClick={props.onEditProfile} className="button-edit button" type="button" id="edit-profile" aria-label="Кнопка редактировать"></button>
        </div>
        <button onClick={props.onAddPlace} className="button-add button" type="button" id="add-card" aria-label="Кнопка добавить"></button>
      </section>
      <section className="elements" aria-label="Блок с карточками мест">
        <ul className="elements__list">
          {cards.map(card => {
            return (
              <Card id={card._id} name={card.name} likes={card.likes} link={card.link} />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
