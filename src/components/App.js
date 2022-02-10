import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function App() {
  return (
    <body className="site-background">
      <div className="page">
        <Header />
        <Main />
        <Footer />        
      </div>
      <template id="element-template">
        <li className="element">
          <a href="#" className="element__link-to-popup">
            <img className="element__image" />
          </a>
          <button className="button-delete" type="button" aria-label="Кнопка удалить карточку"></button>
          <div className="element__description">
            <h2 className="element__title"></h2>
            <div className="element__likes">
              <button className="element__like" type="button" aria-label="Кнопка поставить лайк"></button>
              <p className="element__count-like"></p>
            </div>
          </div>
        </li>
      </template>
    </body>
  );
}

export default App;
