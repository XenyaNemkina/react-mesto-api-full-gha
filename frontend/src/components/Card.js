import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  function handleCardClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <div className="element-template">
      <li className="element">
        <img className="element__img" src={card.link} alt={card.name} onClick={handleCardClick} />
        <div className="element__title">
          <h2 className="element__text">{card.name}</h2>
          <div className="element__likes">
            <button className={`element__like ${isLiked && "element__like_active"}`} onClick={handleLikeClick}></button>
            <p className="element__counter">{card.likes.length}</p>
          </div>
          {isOwn && <button className="element__basket" onClick={handleDeleteClick} />}
        </div>
      </li>
    </div>
  );
}

export default Card;
