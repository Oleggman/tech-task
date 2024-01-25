import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as TrelloApi from '../services/trello-api';
import { List } from "../components/List/List";
import { BoardTitle } from "../components/SharedLayout/SharedLayout.styled";

export type ListType = {
    id: string,
    name: string,
}

type BoardType = {
    id: string,
    name: string,
    lists: Array<ListType>,
}

const Board = () => {
    const [board, setBoard] = useState<BoardType | null>(null);
    const { boardId } = useParams();

    useEffect(() => {
        const fetchBoardById = async () => {
            const board = await TrelloApi.getBoardById(boardId);
            setBoard(board);
        }

        fetchBoardById();
    }, [boardId])

    return (
        <div>
            <BoardTitle>{board?.name}</BoardTitle>
            <List lists={board?.lists} />
        </div>
    )
}

export default Board;