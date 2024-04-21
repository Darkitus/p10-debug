import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus
    ? data.focus.sort((evtA, evtB) => new Date(evtB.date) - new Date(evtA.date))
    : []; // Tri des événements par date décroissante et dans le cas où data.focus n'est pas défini, on initialise byDateDesc à un tableau vide pour éviter les erreurs
  const nextCard = () => {
    setTimeout(() => {
      setIndex((currentIndex) =>
        currentIndex < byDateDesc.length - 1 ? currentIndex + 1 : 0
      );
    }, 5000);
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      {/* Déplacement du conteneur de pagination en dehors de la boucle de mappage de byDateDesc pour éviter de créer un nouveau groupe de boutons radios pour chaque events */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((eventPagination, radioIdx) => (
            <input
              key={`${eventPagination.id}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              readOnly // Ajout de l'attribut readOnly pour empêcher la modification de la valeur de l'input et éviter les erreurs
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
