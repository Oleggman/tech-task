import styled from "styled-components";

export const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  border-radius: 4px;
  border: 2px solid;
  border-color: transparent;
  margin-bottom: 4px;

  &:focus {
    outline: none;
    border-color: green;
  }
`;

export const CreateBtn = styled.button`
  background-color: #e2e5e8;
  border-radius: 4px;
  color: inherit;
  cursor: pointer;
  padding: 6px 12px;
  border: 1px solid;
  border-color: black;
  transition: border-color 300ms, background-color 300ms, color 300ms;

  &:hover {
    background-color: #1976d2;
    color: #fff;
    border-color: transparent;
  }
`;
