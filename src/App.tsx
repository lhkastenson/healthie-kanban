import { useState, useEffect } from 'react'
import './App.css'

import type { Card, Character } from "./types"
import { getCharacters } from "./api/characters"
import Board from "./components/Board"
import AddCardForm from './components/AddCardForm'

function App() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [cards, setCards] = useState<Card[]>([])

  useEffect(() => {
    getCharacters().then(setCharacters)
  }, [])

  return (
    <div>
      <h1>Healthie Kanban</h1>
      <AddCardForm characters={characters} setCards={setCards} />
      <Board cards={cards} setCards={setCards} />
    </div>
  )
}

export default App
