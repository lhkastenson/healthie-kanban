import { DndContext, type DragEndEvent } from "@dnd-kit/core"

import type { Card as CardType } from "../types"
import { COLUMNS } from "../constants"
import Column from "./Column"

interface BoardProps {
  cards: CardType[]
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>
}

export default function Board({cards, setCards}: BoardProps) {
    function handleDragEnd({ active, over}: DragEndEvent) {
        console.log(active, over);
    }

    return (
    <DndContext onDragEnd={handleDragEnd}>
        <div className="board">
            {COLUMNS.map(column => (
                <Column key={column.id} column={column} cards={cards.filter(c => c.column === column.id)} />
            ))}
        </div> 
    </DndContext>
    )
}