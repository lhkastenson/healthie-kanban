import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import type { Card, Character } from "./types"
import { getCharacters } from "./api/characters"

function App() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [cards, setCards] = useState<Card[]>([])

  useEffect(() => {
    getCharacters().then(setCharacters)
  }, [])

  return (
    <div>
      <h1>Healthie Kanban</h1>
    </div>
  )
}

export default App
