import { NavLink } from "react-router-dom";
import styled from "styled-components";

const getRandomColor = () => "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(4, "0") + "80";

export const Layout = styled.div`
  display: flex;
`;

export const Sidebar = styled.div`
  background-color: #f0f0f0;
  width: 300px;
  padding: 20px 8px 8px 8px;
  min-height: 100vh;
  border-right: 2px solid black;
`;

export const SidebarTitle = styled.h2`
  text-align: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin-bottom: 20px;
`;

export const BoardsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const BoardItem = styled.li`
  border-radius: 5px;
  background-color: ${() => getRandomColor()};
  border: 1px solid black;
`;

export const StyledNavLink = styled(NavLink)`
  color: black;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  text-decoration: none;
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 12px 8px;
`;

export const Main = styled.div`
  padding: 20px;
  background-color: goldenrod;
  width: calc(100% - 300px);
  min-height: 100vh;
  overflow-x: auto;
`;

export const BoardTitle = styled.h1`
  padding-left: 40px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin-bottom: 28px;
`;
