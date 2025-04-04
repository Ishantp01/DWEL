project-backend/
│
├── config/
├─────mongoConfig.js
├── controllers/          # Route handlers
├── middlewares/          # Auth, error, logging
├── models/               # Mongoose schemas
├── routes/               # API route definitions
├── services/             # Core logic (Gemini, AI logic)
├── utils/                # Helper functions
├── validations/          # Joi/Zod schemas
├── jobs/                 # Scheduled jobs (e.g., rating updates)
├── sockets/              # WebSocket logic
├── public/               # Static content (if any)
├── .env
├── app.js                # Entry point
├── server.js             # Server bootstrapping
└── package.json
