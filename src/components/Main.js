function Main(props) {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img alt="аватар" class="profile__avatar-image" />
          <button onClick={props.onEditAvatar} className="profile__button-edit-avatar" type="button" aria-label="Кнопка редактировать аватар"></button>
        </div>
        <div className="profile__info">
          <div className="profile__list">
            <h1 className="profile__name"></h1>
            <p className="profile__profession"></p>
          </div>
          <button onClick={props.onEditProfile} className="button-edit button" type="button" id="edit-profile" aria-label="Кнопка редактировать"></button>
        </div>
        <button onClick={props.onAddPlace} className="button-add button" type="button" id="add-card" aria-label="Кнопка добавить"></button>
      </section>
      <section className="elements" aria-label="Блок с карточками мест">
        <ul className="elements__list"></ul>
      </section>
    </main>
  );
}

export default Main;
