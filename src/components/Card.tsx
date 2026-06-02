import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import type { Card as CardType } from "../types"

interface CardProps {
  card: CardType
}

export default function Card({card}: CardProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id })

    const style = { 
        transform: CSS.Transform.toString(transform),
        transition,
    }
    
    return (
    <div className="card" ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <h2>{card.title}</h2>
        <div>
            <span>{card.character.name}</span>
            <img src={card.character.image} alt={card.character.name} />
        </div>
    </div>
    )
}