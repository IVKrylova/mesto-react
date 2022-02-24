import React from 'react';
import { api } from '../utils/api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  // подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  /* // хуки состояния загрузки массива карточек
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    // загрузка массива карточек с сервера
    api.getInitialCards()
      .then(data => {
        setCards(data);
      })
      .catch(err => console.log(err));
  }, []); */

  /* // обработчик клика на лайк
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
  } */

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
          <button onClick={props.onEditAvatar} className="profile__button-edit-avatar" type="button" aria-label="Кнопка редактировать аватар"></button>
        </div>
        <div className="profile__info">
          <div className="profile__list">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__profession">{currentUser.description}</p>
          </div>
          <button onClick={props.onEditProfile} className="button-edit button" type="button" id="edit-profile" aria-label="Кнопка редактировать"></button>
        </div>
        <button onClick={props.onAddPlace} className="button-add button" type="button" id="add-card" aria-label="Кнопка добавить"></button>
      </section>
      <section className="elements" aria-label="Блок с карточками мест">
        <ul className="elements__list">
          {props.cards.map(card => {
            return (
              <Card key={card._id}
                    onCardClick={props.onCardClick}
                    owner={card.owner}
                    id={card._id}
                    name={card.name}
                    likes={card.likes}
                    link={card.link}
                    onCardLike={props.onCardLike}
                    onCardDelete={props.onCardDelete} />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
