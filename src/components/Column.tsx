import type { Card as CardType, Column as ColumnType } from "../types"
import Card from "./Card"

interface ColumnProps {
  column: ColumnType
  cards: CardType[]
}

export default function Column({column, cards}: ColumnProps) {
    return (
    <div>
        <h2>{column.title}</h2>
        {cards.map(card => (
            <Card key={card.id} card={card} />
        ))}
    </div>
    )
}