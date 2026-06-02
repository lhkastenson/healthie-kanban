import type { Card as CardType } from "../types"
import { COLUMNS } from "../constants"
import Column from "./Column"

interface BoardProps {
  cards: CardType[]
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>
}

export default function Board({cards}: BoardProps) {
    return (
    <div>
        {COLUMNS.map(column => (
            <Column key={column.id} column={column} cards={cards.filter(c => c.column === column.id)} />
        ))}
    </div>
    )
}