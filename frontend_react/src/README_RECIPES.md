Recipe Explorer Frontend - Notes

Environment variables used:
- REACT_APP_API_BASE or REACT_APP_BACKEND_URL: Base URL for the recipes API. If not set, the app uses the local mock service (src/services/mockData.ts).
- REACT_APP_FRONTEND_URL, REACT_APP_WS_URL, and other REACT_APP_* variables are not required for basic usage but may be leveraged by future features.

Run:
- npm start (port 3000)

Routes:
- / : Home with sidebar filters and recipe grid
- /recipe/:id : Recipe details

Styling:
- src/styles/global.css implements the Ocean Professional theme via CSS variables.
