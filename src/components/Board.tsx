import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import confetti from "canvas-confetti"

import type { Card as CardType, ColumnId } from "../types"
import { COLUMNS } from "../constants"
import Column from "./Column"

interface BoardProps {
  cards: CardType[]
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>
}

export default function Board({cards, setCards}: BoardProps) {
    function handleDragEnd({ active, over}: DragEndEvent) {
        if (!over) return
        if (active.id === over.id) return

        const isOverColumn = COLUMNS.some(col => col.id === over.id)
        if (isOverColumn) {
            const targetColumn = over.id as ColumnId
            setCards(prev => prev.map(c => c.id === active.id ? { ...c, column: targetColumn } : c))
            
            if (targetColumn === "done") confetti()
        } else {
            const overCard = cards.find(c => c.id === over.id)
            if (!overCard) return
            const targetColumn = overCard.column as ColumnId
            const activeCard = cards.find(c => c.id === active.id)
            setCards(prev => {
                const updated = prev.map(c => c.id === active.id ? {...c, column: targetColumn } : c)
                const oldIndex = updated.findIndex(c => c.id === active.id)
                const newIndex = updated.findIndex(c => c.id === over.id)
                return arrayMove(updated, oldIndex, newIndex)
            })

            if (targetColumn === "done" && activeCard?.column !== "done") confetti()
        }
    }

    return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <div className="board">
            {COLUMNS.map(column => (
                <Column key={column.id} column={column} cards={cards.filter(c => c.column === column.id)} />
            ))}
        </div> 
    </DndContext>
    )
}