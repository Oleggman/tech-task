import React from "react"
import { CardType } from "../List/List"
import { StyledCard } from "./Card.styled"
import { useBoard } from "../../hooks/useBoard"
import * as TrelloApi from '../../services/trello-api';

interface Props {
  card: CardType,
  list: any,
  dragCard: any,
  setDragCard: any,
  dragList: any,
  setDragList: any
}

export const Card: React.FC<Props> = ({ card, list, dragCard, setDragCard, dragList, setDragList }) => {
  const { board, changeBoard } = useBoard();

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.target.style.backgroundColor = 'lightgray';
  }

  const handleDragLeave = (e: any) => {
    e.target.style.backgroundColor = 'antiquewhite';
  }

  const handleDragStart = (e: any) => {
    setDragList(list);
    setDragCard(card);
  }

  const handleDragEnd = (e: any) => {
    e.target.style.backgroundColor = 'antiquewhite';
  }

  const handleDrop = async (e: any) => {
    e.preventDefault();
    e.target.style.backgroundColor = 'antiquewhite';
    if (dragCard.id === card.id) {
      return;
    }
    const currentIndex = dragList.cards.indexOf(dragCard);
    const initialList = dragList.cards.toSpliced(currentIndex, 1);
    const dropIndex = list.cards.indexOf(card);
    const dropList = list.cards.toSpliced(dropIndex, 0, dragCard);

    const res = await TrelloApi.moveCard(dragCard.id, list.id);

    if (changeBoard && board && res.status === 200) {
      const newBoard = board.map(item => {
        if (item.id === dragList.id && item.id === list.id) {
          return { ...item, cards: initialList.toSpliced(dropIndex, 0, dragCard) };
        }
        if (item.id === dragList.id && dragList.id !== list.id) {
          return {...item, cards: initialList};
        }
        if (item.id === list.id  && dragList.id !== list.id) {
          return {...item, cards: dropList};
        }
        return item;
      })
      
      changeBoard(newBoard);
    }
  }

  return (
    <StyledCard
      draggable={true}
      onDragOver={(e) => handleDragOver(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDragStart={(e) => handleDragStart(e)}
      onDragEnd={(e) => handleDragEnd(e)}
      onDrop={(e) => handleDrop(e)}
    >{card.name}</StyledCard>
  )
}
