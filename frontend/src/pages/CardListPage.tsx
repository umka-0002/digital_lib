import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { cardsAtom } from "../entities/card/model/cardAtom";
import axios from "axios";

export const CardListPage = () => {
  const [cards, setCards] = useAtom(cardsAtom);

  useEffect(() => {
    axios.get("/api/cards/")  // Реализуй API-листинг на бэке
      .then(res => setCards(res.data));
  }, [setCards]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map(card => (
        <div key={card.id} className="card p-4 border rounded shadow">
          <img src={card.image} alt="card" className="w-full object-cover" />
          <div className="mt-2">
            <b>{card.title}</b>
            <div>{card.author}</div>
            <div>{card.year}, {card.city}</div>
            <div>Стр.: {card.pages}</div>
            <div>Шифр: {card.cipher}</div>
            <pre className="bg-gray-100 p-2 text-xs">{card.corrected_text}</pre>
          </div>
        </div>
      ))}
    </div>
  );
};