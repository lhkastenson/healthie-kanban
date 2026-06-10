import { useState } from "react"

import type { Character, Card } from "../types"

interface AddCardFormProps {
    characters: Character[]
    setCards: React.Dispatch<React.SetStateAction<Card[]>>
}

export default function AddCardForm({characters, setCards}: AddCardFormProps) {
    const [title, setTitle] = useState("")
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!title || !selectedCharacter) return

        setCards(prev => [...prev, {
            id: crypto.randomUUID(),
            title,
            column: "todo",
            character: selectedCharacter
        }])

        setTitle("")
        setSelectedCharacter(null)
    }
    
    return (
        <form className="add-card-form" onSubmit={handleSubmit}>
            <select onChange={e => setSelectedCharacter(characters.find(c => c.id === e.target.value) ?? null)} value={selectedCharacter?.id ?? ""}>
                <option value="">Select a character</option>
                {characters.map(character => (
                <option key={character.id} value={character.id}>{character.name}</option>
                ))}
            </select>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Card title" />
            <button type="submit">Add Card</button>
        </form>
    )
}