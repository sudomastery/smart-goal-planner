# Smart Goal Planner

Smart Goal Planner is a minimal React application (Vite) that helps users create and track multiple savings goals. It uses a local JSON file served by `json-server` to simulate a REST API and supports full CRUD operations: create, read, update (deposits), and delete goals.

## Features

- Add financial goals with name, target amount (Ksh), category, and deadline
- View an overview: total goals, total saved, completed goals, total target
- Deposit money into any goal (updates saved amount)
- Delete goals
- All data persisted to `data/db.json` via `json-server`

## Quick start

1. Install dependencies

```bash
npm install
```

2. Start the JSON server (serves the database)

```bash
npx json-server --watch data/db.json --port 3000
```

3. Start the React dev server

```bash
npm run dev
```

4. Open the app in your browser at the address shown by Vite (usually http://localhost:5173)

## Project structure

- `data/db.json` — local JSON database with sample goals
- `src/` — React source code
	- `App.jsx` — main app container and state management
	- `components/GoalForm.jsx` — form for creating goals
	- `components/GoalCard.jsx` — displays individual goals and actions
	- `index.css` — single stylesheet for the project

## API Endpoints (json-server)
- `GET /goals`
- `POST /goals`
- `PATCH /goals/:id`
- `DELETE /goals/:id`


