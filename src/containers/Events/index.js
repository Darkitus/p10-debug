import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  // Séparation de la liste des événements filtrés et de la pagination car tout les événements n'était pas affichés sur la page à cause de la pagination qui était appliquée avant le filtre
  const filteredEvents = (data?.events || []).filter(
    (event) => !type || event.type === type
  );
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };
  const pageNumber = Math.ceil((filteredEvents?.length || 0) / PER_PAGE); // Modification de Math.floor en Math.ceil pour afficher le nombre de pages correctement (arrondi supérieur au lieu de l'arrondi inférieur)
  const typeList = new Set(data?.events.map((event) => event.type));
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {paginatedEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => {
              const page = n + 1;
              return (
                <a
                  key={page}
                  href="#events"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </a>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
