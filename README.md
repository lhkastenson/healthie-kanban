# Healthie Kanban

A frontend-only Kanban board built with React and TypeScript. Cards are created with a title and a Rick and Morty character fetched from the public GraphQL API, then dragged between three fixed columns: To Do, Doing, and Done. Moving a card to Done triggers a confetti animation.

## Running locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Tech decisions

- **dnd-kit** for drag and drop — `useSortable` on each card, `useDroppable` on each column, `DragOverlay` for a floating drag clone
- **graphql-request** for the Rick and Morty API fetch — lightweight alternative to a full Apollo setup for a single query
- **canvas-confetti** for the Done column animation
- State lives in `App.tsx` and is passed down; no external state management needed at this scale
