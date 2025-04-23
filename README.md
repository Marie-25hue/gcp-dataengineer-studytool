# GCP Certification Quiz App

![Banner](./src/assets/gcp-quiz-banner.png)

An interactive quiz web app to help you study for the **Google Cloud Professional Data Engineer Certification** — with two modes: **Study Mode** and **Exam Mode**.

---

## Features

- 100 hand-crafted questions with explanations
- Toggle between **Study** and **Exam** modes
- Instant feedback in Study Mode
- Fully responsive (mobile-friendly)
- Deployed on Vercel

---

## Screenshots

![App Demo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2p4cGU2cDQ4Y21qZzFva3E0YjJxeTR5NmRncjM0Zm14M2x5bnZ4aiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/GKnArMZUt0CscVTlYb/giphy.gif)

---

## Installation

```bash
git clone https://github.com/your-username/gcp-quiz-app.git
cd gcp-quiz-app
npm install
npm run dev
```

---

## Deployment

This project is ready to deploy on **Vercel**.

Make sure your `vercel.json` includes:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## Data

Questions are stored in `/src/data/preguntas_gcp_con_id.json`.

Each question includes:
- `id`
- `question`
- `options`
- `answer`
- `explanation`

---

## License

MIT. Use it, fork it, improve it.

---

Built with heart, caffeine and GCP docs.
