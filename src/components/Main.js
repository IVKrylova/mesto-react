import PopupWithForm from "./PopupWithForm";

function Main() {

  function handleEditAvatarClick() {
    document.querySelector('.profile__button-edit-avatar').addEventListener('click', () => {
      document.querySelector('#popup-edit-avatar').classList.add('popup_opened');;
    });
  }

  function handleEditProfileClick() {
    document.querySelector('.button-edit').addEventListener('click', () => {
      document.querySelector('#popup-edit-profile').classList.add('popup_opened');;
    });
  }

  function handleAddPlaceClick() {
    document.querySelector('.button-add').addEventListener('click', () => {
      document.querySelector('#popup-add-card').classList.add('popup_opened');;
    });
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img alt="аватар" class="profile__avatar-image" />
          <button onClick={handleEditAvatarClick} className="profile__button-edit-avatar" type="button" aria-label="Кнопка редактировать аватар"></button>
        </div>
        <div className="profile__info">
          <div className="profile__list">
            <h1 className="profile__name"></h1>
            <p className="profile__profession"></p>
          </div>
          <button onClick={handleEditProfileClick} className="button-edit button" type="button" id="edit-profile" aria-label="Кнопка редактировать"></button>
        </div>
        <button onClick={handleAddPlaceClick} className="button-add button" type="button" id="add-card" aria-label="Кнопка добавить"></button>
      </section>
      <PopupWithForm name="edit-avatar" title="Обновить аватар"
                     children={(
                      <>
                        <input type="url" className="form__item" id="avatar-url" name="avatar" placeholder="Ссылка на аватар" required />
                        <span className="avatar-url-input-error form__input-error"></span>
                        <button type="submit" className="form__button">Сохранить</button>
                      </>
                     )} />
      <PopupWithForm name="edit-profile" title="Редактировать профиль"
                     children={(
                      <>
                        <input type="text" className="form__item" id="name" name="name" placeholder="Имя" minlength="2" maxlength="40" required />
                        <span className="name-input-error form__input-error"></span>
                        <input type="text" className="form__item" id="profession" name="profession" placeholder="О себе" minlength="2" maxlength="200" required />
                        <span className="profession-input-error form__input-error"></span>
                        <button type="submit" class="form__button">Сохранить</button>
                      </>
                     )} />
      <section className="elements" aria-label="Блок с карточками мест">
        <ul className="elements__list"></ul>
      </section>
      <PopupWithForm name="add-card" title="Новое место"
                     children={(
                      <>
                        <input type="text" className="form__item" id="place" name="name" placeholder="Название" minlength="2" maxlength="30" required />
                        <span className="place-input-error form__input-error"></span>
                        <input type="url" className="form__item" id="place-url" name="link" placeholder="Ссылка на картинку" required />
                        <span className="place-url-input-error form__input-error"></span>
                        <button type="submit" className="form__button">Создать</button>
                      </>
                     )} />
      <section className="popup popup_background_opacity" id="element-popup">
        <div className="popup__card">
          <button type="button" className="button-close" aria-label="Кнопка закрыть"></button>
          <img className="popup__image" src="#" alt="Фотография места" />
          <h2 className="popup__description"></h2>
        </div>
      </section>
      <PopupWithForm name="delete-card" title="Вы уверены?"
                     children={(
                      <>
                        <input type="hidden" name="card-id" className="form__input-id" />
                        <button type="submit" className="form__button">Да</button>
                      </>
                     )} />
    </main>
  );
}

export default Main;
