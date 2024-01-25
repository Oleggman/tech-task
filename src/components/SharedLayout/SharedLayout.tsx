import { Outlet } from "react-router-dom";
import React, { Suspense } from "react";
import { BoardItem, BoardsList, Layout, Sidebar, SidebarTitle, StyledNavLink, Main } from "./SharedLayout.styled";

type Board = {
    id: string,
    name: string
}

interface Props {
    boards: Array<Board>;
}

export const SharedLayout: React.FC<Props> = ({boards}) => {
  return (
    <Layout>
      <Sidebar>
          <SidebarTitle>All boards</SidebarTitle>
          <BoardsList>{boards.map(({ id, name }) =>
              <BoardItem key={id}><StyledNavLink to={`/boards/${id}`}>{name}</StyledNavLink></BoardItem>)}
          </BoardsList>
      </Sidebar>

      <Main>
        <Suspense fallback={<h2>Loading...</h2>}>
          <Outlet />
        </Suspense>
      </Main>
    </Layout>
  )
}
