# Sangeeta Kushwaha — Portfolio

Personal site for a frontend developer. The pages are a React app built with Vite. A small Node API stores contact messages in MongoDB.

All editable profile content is in `src/data/profile.js`.

## Features

- Light and dark theme, remembered in the browser
- Navigation for Home, About, Projects, Skills, and Contact, with a mobile menu and the current section highlighted
- Project cards with category filters, cover images, and GitHub or live links when a real URL is set
- Skills grouped into frontend, backend, database, and tools
- Experience and education timeline, shown only after real entries are added
- Contact form with validation, a honeypot field, rate limiting, and a success message only after the API saves the message

## Project layout

```text
portfolio/
├── backend/
│   ├── server.js                      connects to MongoDB and starts the API
│   ├── src/app.js                     Express app, CORS, rate limit, and routes
│   ├── src/models/ContactMessage.js   message schema
│   ├── tests/contact.test.js          API tests
│   └── .env.example
├── shared/contactRules.js             validation shared by the form and the API
├── public/                            favicon, and optional photo or resume
├── src/
│   ├── components/                    navbar, cards, form fields, footer
│   ├── data/profile.js                name, links, projects, skills, timeline
│   ├── sections/                      page sections
│   ├── App.jsx
│   └── main.jsx
├── .env.example
└── vite.config.js                     forwards /api to the API during development
```

## Requirements

- Node.js 20 or newer
- npm
- MongoDB on your machine, or a MongoDB Atlas connection string

## Setup

```bash
npm install
npm install --prefix backend
cp .env.example .env
cp backend/.env.example backend/.env
```

Open `backend/.env` and set `MONGO_URI`. Do not commit `.env` files.

Local MongoDB:

```text
MONGO_URI=mongodb://127.0.0.1:27017/portfolio
CLIENT_URL=http://localhost:5173
```

The `contactmessages` collection is created the first time a message is saved.

## Run

Start the API and the site in two terminals.

```bash
npm run dev:api
npm run dev
```

- Site: http://localhost:5173
- API: http://localhost:8080

Leave `VITE_API_URL` empty while developing. Vite sends `/api` to port 8080. If the API is not running, the contact form shows an error instead of a success message.

## Environment variables

### Site (`.env`)

| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | Public API address for a production build, with no trailing slash. Leave empty on your machine. |

### API (`backend/.env`)

| Variable | Purpose |
| --- | --- |
| `PORT` | API port. Defaults to `8080`. |
| `MONGO_URI` | MongoDB connection string. |
| `CLIENT_URL` | Site address allowed to call the API. Use `http://localhost:5173` locally. Add more origins separated by commas. |
| `NODE_ENV` | `development` or `production`. |

The MongoDB address stays in `backend/.env`. It is not used by the React app.

## API

### `GET /api/health`

```json
{ "ok": true, "db": "connected" }
```

Returns `200` when MongoDB is connected, and `503` when it is not.

### `POST /api/contact`

JSON body:

| Field | Rule |
| --- | --- |
| `name` | Required. 2–80 characters. |
| `email` | Required. A valid email, up to 120 characters. |
| `subject` | Required. 2–120 characters. |
| `message` | Required. 10–2000 characters. |
| `companyWebsite` | Must stay empty. Browsers do not show this field. A value here is treated as spam. |

Tags are removed before the message is stored.

| Status | Meaning |
| --- | --- |
| `201` | The message was saved. |
| `400` | A field is invalid, or the honeypot was filled. |
| `413` | The request is too large. |
| `429` | More than 8 messages from the same address in 15 minutes. |
| `503` | The message could not be saved. |

```bash
curl -X POST http://localhost:8080/api/contact \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:5173" \
  -d '{"name":"Ada Lovelace","email":"ada@example.com","subject":"Hello","message":"I would like to talk about a frontend role."}'
```

## Edit the portfolio

Change `src/data/profile.js`.

- `profile.photo`: put a picture in `public/profile.jpg`, then set this to `/profile.jpg`. Until then, the hero shows initials.
- `profile.resumeUrl`: put a file in `public/resume.pdf`, then set this to `/resume.pdf`.
- `profile.email`, `profile.socials.github`, and `profile.socials.linkedin`: these are the Email, GitHub, and LinkedIn buttons. A blank or placeholder link is not shown.
- `projects`: leave `githubUrl`, `demoUrl`, or `image` as `''` when you do not have one. Development shows a dashed “not set” label. A production build hides that action.
- `experience` and `education`: add an item only when the place and dates are real. Both lists empty means the section and its nav link stay hidden.

Example timeline item:

```js
{
  title: 'Frontend Developer',
  org: 'Studio name',
  period: '2024 — 2025',
  points: ['What you actually did.']
}
```

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the site |
| `npm run dev:api` | Start the API and reload it when files change |
| `npm start --prefix backend` | Start the API once |
| `npm run build` | Build the site into `dist` |
| `npm run preview` | Preview that build |
| `npm test` | Run the contact API tests |
| `npm run lint` | Run ESLint |

The tests do not need MongoDB. They cover valid messages, rejected fields, the honeypot, a failed save, rate limiting, health, and CORS.

## Deploy

Build the site with the live API address:

```bash
VITE_API_URL=https://your-api.example.com npm run build
```

Upload the `dist` folder to a static host such as Netlify, Vercel, or GitHub Pages.

Host the API on a Node server. Set `MONGO_URI`, set `CLIENT_URL` to the exact public site address (including `https`), set `NODE_ENV=production`, and start it with:

```bash
npm start --prefix backend
```
