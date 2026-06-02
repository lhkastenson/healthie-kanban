import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

import type { Card as CardType, Column as ColumnType } from "../types"
import Card from "./Card"

interface ColumnProps {
  column: ColumnType
  cards: CardType[]
}

export default function Column({column, cards}: ColumnProps) {
    const { setNodeRef } = useDroppable({ id: column.id })

    return (
    <div className="column">
        <h2>{column.title}</h2>
        <div ref={setNodeRef}>
            <SortableContext items={cards.map(c => c.id)} strategy={verticalListSortingStrategy}>
                {cards.map(card => (
                    <Card key={card.id} card={card} />
                ))}
            </SortableContext>
        </div>
    </div>
    )
}