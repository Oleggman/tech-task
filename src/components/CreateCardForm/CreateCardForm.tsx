import React from "react"
import { CreateBtn, TextArea } from "./CreateCardForm.styled"
import { useBoard } from "../../hooks/useBoard"
import * as TrelloApi from '../../services/trello-api';

interface Props {
    listId: string
}

export const CreateCardForm: React.FC<Props> = ({ listId }) => {
    const { board, changeBoard } = useBoard();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const name = e.target.elements.text.value;
        const res = await TrelloApi.addCard(listId, name);

        if (changeBoard && board) {
            const newBoard = board.map(item => {
                if (item.id === listId) {
                    return { ...item, cards: [...item.cards, {id: res.data?.id, name}]}
                }
                return item;
            })

            changeBoard(newBoard);
        }

        e.target.reset();
    }

  return (
    <form onSubmit={handleSubmit}>
        <TextArea name="text" placeholder="Create new card"/>
        <CreateBtn type="submit">Create card</CreateBtn>
    </form>
  )
}
