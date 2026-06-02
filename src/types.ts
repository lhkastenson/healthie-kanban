export type ColumnId = "todo" | "doing" | "done"

export interface Column {
  id: ColumnId
  title: string
}

export interface Character {
  id: string
  name: string
  image: string
}

export interface Card {
  id: string
  title: string
  column: ColumnId
  character: Character
}