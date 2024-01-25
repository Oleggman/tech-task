import React from "react"
import { CardType } from "../List/List"
import { StyledCard } from "./Card.styled"

interface Props {
  card: CardType
}

export const Card: React.FC<Props> = ({card}) => {
  return (
    <StyledCard>{card.name}</StyledCard>
  )
}
