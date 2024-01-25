import React, { useEffect, useRef, useState } from "react"
import { ListType } from "../../pages/Board"
import * as TrelloApi from '../../services/trello-api';
import { Card } from "../Card/Card";
import { useBoard } from "../../hooks/useBoard";
import { CardsList, ListTitle, Lists, OneList } from "./List.styled";

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
  const { changeBoard } = useBoard();
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
      <Lists>
          {allLists.map(list =>
            <OneList key={list.id}>
              <ListTitle>{list.name}</ListTitle>
              <CardsList>
                {list.cards.map(card => <Card key={card.id} card={card}/>)}
              </CardsList>
            </OneList>)}
        </Lists>}
      {!allLists && <h2>Loading...</h2>}
    </>
  )
}
