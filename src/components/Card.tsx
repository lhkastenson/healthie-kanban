import type { Card as CardType } from "../types"

interface CardProps {
  card: CardType
}

export default function Card({card}: CardProps) {
    return (
    <div>
        <h2>{card.title}</h2>
        <div>
            <span>{card.character.name}</span>
            <img src={card.character.image} alt={card.character.name} />
        </div>
    </div>
    )
}