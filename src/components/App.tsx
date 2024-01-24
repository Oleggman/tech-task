import { Routes, Route } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import { SharedLayout } from "./SharedLayout/SharedLayout";
import * as TrelloApi from '../services/trello-api';

const HomePage: React.LazyExoticComponent<() => JSX.Element> = lazy(() => import('../pages/Home'));
const BoardPage: React.LazyExoticComponent<() => JSX.Element> = lazy(() => import('../pages/Board'));

const App = () => {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    const fetchBoards = async () => {
      const boards = await TrelloApi.getAllBoards();
      setBoards(boards);
    }

    fetchBoards();
  }, [])
  
  return (
    <Routes>
      <Route path='/' element={<SharedLayout boards={boards} />}>
        <Route index element={<HomePage />} />
        <Route path="boards/:boardId" element={<BoardPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
