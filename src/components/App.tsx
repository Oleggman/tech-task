import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { SharedLayout } from "./SharedLayout/SharedLayout";

const HomePage: React.LazyExoticComponent<() => JSX.Element> = lazy(() => import('../pages/Home'));
const BoardPage: React.LazyExoticComponent<() => JSX.Element> = lazy(() => import('../pages/Board'));

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="boards/:boardId" element={<BoardPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
