import { createContext, useContext, useState } from "react";
import { AllLists } from "../components/List/List";

type BoardContextType = {
    board?: AllLists | null,
    changeBoard?: (board: AllLists | null) => void
};

const BoardContext: React.Context<BoardContextType> = createContext({});

export const useBoard = () => useContext(BoardContext);

interface Props {
    children: React.ReactNode
}

export const BoardProvider = ({ children } : Props) => {
    const [board, setBoard] = useState<AllLists | null>(null);

    const changeBoard = (board: AllLists | null) => {
        setBoard(board);
    }

    return (
        <BoardContext.Provider value={{ board, changeBoard }}>
            {children}
        </BoardContext.Provider>
    );
}