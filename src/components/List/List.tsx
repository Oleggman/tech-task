import React, { useEffect, useRef, useState } from "react"
import { ListType } from "../../pages/Board"
import * as TrelloApi from '../../services/trello-api';
import { Card } from "../Card/Card";
import { useBoard } from "../../hooks/useBoard";
import { CardsList, ListTitle, Lists, OneList } from "./List.styled";
import { CreateCardForm } from "../CreateCardForm/CreateCardForm";

interface Props {
  lists: Array<ListType> | undefined,
}

export type CardType = {
  id: string,
  name:string,
}

export type AllLists = { cards: CardType[], id: string, name: string }[];

type FullList = { cards: CardType[], id: string, name: string };

export const List: React.FC<Props> = ({ lists }) => {
  const [allLists, setAllLists] = useState<AllLists | null>(null);
  const { board, changeBoard } = useBoard();
  const isListLoaded: React.MutableRefObject<boolean> = useRef(false);
  // Drag and drop states
  const [currentList, setCurrentList] = useState<FullList>();
  const [currentCard, setCurrentCard] = useState<CardType>();

  useEffect(() => {
    const getAllListsById = async () => {
      if (lists) {
        const listsWithCards = await Promise.all(lists?.map(async (item) => {
          const list = await TrelloApi.getListById(item.id);
          return list;
        }));

        const fullLists = lists.map((item, index) => ({
          ...item,
          cards: listsWithCards[index]
        }));
        
        setAllLists(fullLists);
      }
    }
    getAllListsById();

    return () => {
      setAllLists(null);
      isListLoaded.current = false;
    }
  }, [lists])

  if (changeBoard && !isListLoaded.current && allLists) {
    changeBoard(allLists);
    isListLoaded.current = true;
  }

  const handleDragOver = (e: any) => {
    e.preventDefault();
  }

  const handleDropCard = async (e: any, list: any) => {
    e.preventDefault();
    if (list.cards.length !== 0 || !currentList || !currentCard) {
      return;
    }

    const currentIndex = currentList.cards.indexOf(currentCard);
    currentList.cards.splice(currentIndex, currentIndex + 1);
    const newList = [currentCard]

    const res = await TrelloApi.moveCard(currentCard?.id, list.id);

    if (changeBoard && board && res.status === 200) {
      const newBoard = board.map(item => {
        if (item.id === currentList.id) {
          return { ...item, cards: currentList.cards };
        }
        if (item.id === list.id) {
          return { ...item, cards: newList };
        }
        return item;
      })
      
      changeBoard(newBoard);
    }
  }
  return (
    <>
      {allLists &&
      <Lists>
          {board?.map(list =>
            <OneList key={list.id} onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDropCard(e, list)}>
              <ListTitle>{list.name}</ListTitle>
              <CardsList>
                {list.cards.map(card =>
                  <Card
                    key={card.id} card={card} list={list}
                    dragCard={currentCard} setDragCard={setCurrentCard}
                    dragList={currentList} setDragList={setCurrentList}
                  />)}
              </CardsList>
              
              <CreateCardForm listId={list.id} />
            </OneList>)}
        </Lists>}
      {!allLists && <h2>Loading...</h2>}
    </>
  )
}