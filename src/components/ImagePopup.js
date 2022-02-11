function ImagePopup() {
  return (
    <section className="popup popup_background_opacity" id="element-popup">
      <div className="popup__card">
        <button type="button" className="button-close" aria-label="Кнопка закрыть"></button>
        <img className="popup__image" src="#" alt="Фотография места" />
        <h2 className="popup__description"></h2>
      </div>
    </section>
  );
}

export default ImagePopup;
