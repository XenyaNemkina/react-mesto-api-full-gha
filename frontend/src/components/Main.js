import React, { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const cardsElements = cards.map((card) => {
    return <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />;
  });
  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatarbtn" type="button" onClick={onEditAvatar}></button>
        <img className="profile__avatar" src={currentUser.avatar} alt="фото профиля" />
        <div className="info">
          <div className="info__text">
            <h1 className="info__name">{currentUser.name}</h1>
            <p className="info__profession">{currentUser.about}</p>
          </div>
          <button className="info__button" type="button" onClick={onEditProfile}></button>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section>
        <ul className="elements">{cardsElements}</ul>
      </section>
    </main>
  );
}

export default Main;
