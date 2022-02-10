function Main() {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img alt="аватар" class="profile__avatar-image" />
          <button className="profile__button-edit-avatar" type="button" aria-label="Кнопка редактировать аватар"></button>
        </div>
        <div className="profile__info">
          <div className="profile__list">
            <h1 className="profile__name"></h1>
            <p className="profile__profession"></p>
          </div>
          <button className="button-edit button" type="button" id="edit-profile" aria-label="Кнопка редактировать"></button>
        </div>
        <button className="button-add button" type="button" id="add-card" aria-label="Кнопка добавить"></button>
      </section>
      <section className="popup" id="popup-edit-avatar">
        <div className="popup__container">
          <button type="button" className="button-close" aria-label="Кнопка закрыть"></button>
          <h3 className="popup__title">Обновить аватар</h3>
          <form className="popup__form form" name="form-edit-avatar" id="form-edit-avatar" novalidate>
            <input type="url" className="form__item" id="avatar-url" name="avatar" placeholder="Ссылка на аватар" required />
            <span className="avatar-url-input-error form__input-error"></span>
            <button type="submit" className="form__button">Сохранить</button>
          </form>
        </div>
      </section>
      <section className="popup" id="popup-profile-info">
        <div className="popup__container">
          <button type="button" class="button-close" aria-label="Кнопка закрыть"></button>
          <h3 className="popup__title">Редактировать профиль</h3>
          <form className="popup__form form" name="form-edit-profile" id="form-edit-profile" novalidate>
            <input type="text" className="form__item" id="name" name="name" placeholder="Имя" minlength="2" maxlength="40" required />
            <span className="name-input-error form__input-error"></span>
            <input type="text" className="form__item" id="profession" name="profession" placeholder="О себе" minlength="2" maxlength="200" required />
            <span className="profession-input-error form__input-error"></span>
            <button type="submit" class="form__button">Сохранить</button>
          </form>
        </div>
      </section>
      <section className="elements" aria-label="Блок с карточками мест">
        <ul className="elements__list"></ul>
      </section>
      <section className="popup" id="popup-element-card">
        <div className="popup__container">
          <button type="button" className="button-close" aria-label="Кнопка закрыть"></button>
          <h3 className="popup__title">Новое место</h3>
          <form className="popup__form form" name="form-add-card" id="form-add-card" novalidate >
            <input type="text" className="form__item" id="place" name="name" placeholder="Название" minlength="2" maxlength="30" required />
            <span className="place-input-error form__input-error"></span>
            <input type="url" className="form__item" id="place-url" name="link" placeholder="Ссылка на картинку" required />
            <span className="place-url-input-error form__input-error"></span>
            <button type="submit" className="form__button">Создать</button>
          </form>
        </div>  
      </section>
      <section className="popup popup_background_opacity" id="element-popup">
        <div className="popup__card">
          <button type="button" className="button-close" aria-label="Кнопка закрыть"></button>
          <img className="popup__image" src="#" alt="Фотография места" />
          <h2 className="popup__description"></h2>
        </div>
      </section>
      <section className="popup" id="popup-delete-card">
        <div className="popup__container">
          <button type="button" className="button-close" aria-label="Кнопка закрыть"></button>
          <h3 className="popup__title">Вы уверены?</h3>
          <form className="popup__form form" name="form-delete-card" id="form-delete-card" novalidate>
            <input type="hidden" name="card-id" className="form__input-id" />
            <button type="submit" className="form__button">Да</button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Main;