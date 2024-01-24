import React, { useEffect, useState } from "react"
import { ListType } from "../../pages/Board"
import * as TrelloApi from '../../services/trello-api';

interface Props {
  lists: Array<ListType> | undefined,
}

type Card = {
  id: string,
  name:string,
}

type ListWithCards = Array<Array<Card>>;

export const List: React.FC<Props> = ({ lists }) => {
  const [allLists, setAllLists] = useState<Array<ListWithCards> | null>(null);

  useEffect(() => {
    const getAllListsById = async () => {
      if (lists) {
        const listsWithCards = await Promise.all(lists?.map(async (item) => {
          const list = await TrelloApi.getListById(item.id);
          return list;
        }));
        console.log(listsWithCards);
        setAllLists(listsWithCards);
      }
    }

    getAllListsById();
  }, [lists])
  
  return (
    <div>List</div>
  )
}
