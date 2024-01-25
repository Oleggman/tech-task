import React, { useEffect, useMemo, useState } from "react"
import { ListType } from "../../pages/Board"
import * as TrelloApi from '../../services/trello-api';
import { Card } from "../Card/Card";

interface Props {
  lists: Array<ListType> | undefined,
}

export type CardType = {
  id: string,
  name:string,
}

type AllLists = {cards: CardType[], id: string, name:string}[];

export const List: React.FC<Props> = ({ lists }) => {
  const [allLists, setAllLists] = useState<AllLists | null>(null);

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
        
        console.log(fullLists);
        setAllLists(fullLists);
      }
    }

    getAllListsById();
  }, [lists])
  
  // const fullLists = useMemo(() => {
  //   if (allLists && lists) {
  //     return lists.map((item, index) => ({
  //       ...item,
  //       cards: allLists[index]
  //     }));
  //   }
  // }, [lists, allLists])

  console.log(allLists);

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
    </>
  )
}
