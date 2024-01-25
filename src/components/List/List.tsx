import React, { useEffect, useRef, useState } from "react"
import { ListType } from "../../pages/Board"
import * as TrelloApi from '../../services/trello-api';
import { Card } from "../Card/Card";
import { useBoard } from "../../hooks/useBoard";

interface Props {
  lists: Array<ListType> | undefined,
}

export type CardType = {
  id: string,
  name:string,
}

export type AllLists = {cards: CardType[], id: string, name:string}[];

export const List: React.FC<Props> = ({ lists }) => {
  const [allLists, setAllLists] = useState<AllLists | null>(null);
  const { board, changeBoard } = useBoard();
  const isListLoaded: React.MutableRefObject<boolean> = useRef(false);
    
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
    }
  }, [lists])

  if (changeBoard && !isListLoaded.current && allLists) {
    changeBoard(allLists);
    isListLoaded.current = true;
  }

  return (
    <>
      {allLists &&
      <ul>
          {allLists.map(list =>
            <li key={list.id}>
              <h2>{list.name}</h2>
              <ul>
                {list.cards.map(card => <li key={card.id}><Card card={card}/></li>)}
              </ul>
            </li>)}
        </ul>}
      {!allLists && <h2>Loading...</h2>}
    </>
  )
}
