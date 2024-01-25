import styled from "styled-components";

export const Lists = styled.ul`
  display: flex;
  gap: 40px;
  flex-wrap: nowrap;
`;

export const OneList = styled.li`
  flex-basis: 240px;
  flex-shrink: 0;
  padding: 8px;
  border-radius: 16px;
  border: 1px solid black;
  background-color: lavender;
  height: fit-content;
`;

export const ListTitle = styled.h2`
  text-align: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin-bottom: 12px;
  font-size: 20px;
`;

export const CardsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;
