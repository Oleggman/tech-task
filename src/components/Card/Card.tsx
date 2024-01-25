import React from "react"
import { CardType } from "../List/List"

interface Props {
  card: CardType
}

export const Card: React.FC<Props> = ({card}) => {
  return (
    <div>{card.name}</div>
  )
}
