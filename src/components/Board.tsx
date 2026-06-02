import { closestCenter, DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import confetti from "canvas-confetti"
import { useState } from "react"

import type { Card as CardType, ColumnId } from "../types"
import { COLUMNS } from "../constants"
import Column from "./Column"
import Card from "./Card"

interface BoardProps {
  cards: CardType[]
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>
}

export default function Board({cards, setCards}: BoardProps) {
    const [activeId, setActiveId] = useState<string | null>(null)

    function handleDragStart({ active }: DragStartEvent) {
        setActiveId(String(active.id))
    }

    function handleDragEnd({ active, over}: DragEndEvent) {
        setActiveId(null);

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
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <DragOverlay>
            {activeId ? <Card card={cards.find(c => c.id === activeId)!} /> : null}
        </DragOverlay>
        <div className="board">
            {COLUMNS.map(column => (
                <Column key={column.id} column={column} cards={cards.filter(c => c.column === column.id)} />
            ))}
        </div> 
    </DndContext>
    )
}