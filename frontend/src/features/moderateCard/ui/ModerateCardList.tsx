import React from "react";
import { useAtom } from "jotai";
import axios from "axios";
import { cardsAtom } from '../../../entities/card/model/cardAtom';

export const ModerateCardList = () => {
  const [cards, setCards] = useAtom(cardsAtom);

  const approve = async (id: number) => {
    await axios.post(`/api/cards/approve/${id}/`);
    setCards(cards.map(c => c.id === id ? { ...c, checked: true, rejected: false } : c));
  };

  const reject = async (id: number) => {
    await axios.post(`/api/cards/reject/${id}/`);
    setCards(cards.map(c => c.id === id ? { ...c, checked: false, rejected: true } : c));
  };

  return (
    <div>
      {cards.map(card => (
        <div key={card.id} className="p-4 border mb-2">
          <div>{card.title} ({card.author})</div>
          <button onClick={() => approve(card.id)} className="btn btn-success mr-2">Подтвердить</button>
          <button onClick={() => reject(card.id)} className="btn btn-error">Отклонить</button>
        </div>
      ))}
    </div>
  );
};