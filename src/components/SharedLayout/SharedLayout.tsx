import { NavLink, Outlet } from "react-router-dom";
import React, { Suspense } from "react";

type Board = {
    id: string,
    name: string
}

interface Props {
    boards: Array<Board>;
}

export const SharedLayout: React.FC<Props> = ({boards}) => {
  return (
    <>
      <header>
        <nav>
          <ul>{boards.map(({ id, name }) =>
              <li key={id}><NavLink to={`/boards/${id}`}>{name}</NavLink></li>)}
          </ul>
        </nav>
      </header>

      <main>
        <Suspense fallback={<h2>Loading...</h2>}>
          <Outlet />
          </Suspense>
      </main>
    </>
  )
}
