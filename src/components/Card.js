function Card(props) {
  function handleClick() {
    props.onCardClick(props);
  }

  return (
    <li className="element">
      <a href="#" className="element__link-to-popup">
        <span onClick={handleClick} className="element__image" style={{ backgroundImage: `url(${props.link})` }} />
      </a>
      <button className="button-delete" type="button" aria-label="Кнопка удалить карточку"></button>
      <div className="element__description">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__likes">
          <button className="element__like" type="button" aria-label="Кнопка поставить лайк"></button>
          <p className="element__count-like">{props.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
