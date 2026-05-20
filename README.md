```
 __  __ _           _ ____       _     _
|  \/  (_)_ __   __| | __ ) _ __(_) __| | __ _  ___
| |\/| | | '_ \ / _` |  _ \| '__| |/ _` |/ _` |/ _ \
| |  | | | | | | (_| | |_) | |  | | (_| | (_| |  __/
|_|  |_|_|_| |_|\__,_|____/|_|  |_|\__,_|\__, |\___|
                                          |___/
```

# MindBridge

> **Anonymous AI-powered mental wellness support for students. Early-warning insights for institutions.**

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React_18-61DAFB?style=flat&logo=react&logoColor=black)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI_GPT--4o-412991?style=flat&logo=openai&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)

---

## Table of Contents

- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Demo Credentials](#demo-credentials)
- [Privacy & Safety](#privacy--safety)
- [Team](#team)
- [Future Scope](#future-scope)
- [License](#license)
- [Disclaimer](#disclaimer)

---

## Problem Statement

| Statistic | Source |
|-----------|--------|
| **70%** of Indian college students report moderate-to-high anxiety | National Mental Health Survey |
| **60%** show signs of depression | Campus wellness studies |
| **11%** report severe distress or suicidal ideation | WHO India reports |
| Campus counselors are **overburdened or unavailable** | Institutional surveys |
| Cultural stigma **prevents students from seeking help** openly | Research literature |
| Institutions have **zero early-warning systems** | Current status |

---

## Solution

MindBridge is a **privacy-first Progressive Web App** where:

- Students **anonymously check in** emotionally, journal their thoughts, and receive **AI-guided empathetic support**
- The system detects **emotional distress and crisis signals** in real-time
- If crisis is detected, the system **escalates to helpline connections**
- College admins see **ONLY anonymized aggregate trends** — never individual student data

---

## Key Features

🧠 **AI-Powered Companion** — Empathetic chat powered by GPT-4o with intelligent fallback mode

😊 **Mood Check-in** — 8 mood options with intensity tracking

📝 **Reflective Journaling** — Write freely, receive AI support

🌬️ **Breathing Exercises** — Guided box breathing with calming animations

🚨 **Crisis Detection** — Real-time keyword-based crisis identification with helpline display

📊 **Admin Dashboard** — Anonymized campus-wide mental health analytics

🔒 **100% Anonymous** — No sign-up, no personal data collected

📱 **PWA Ready** — Installable on any device

---

## Architecture

```
┌──────────────────────────────────────────────────────┐
│                    FRONTEND (React)                   │
│  Landing │ Check-in │ Journal │ Breathe │ Resources  │
│                Admin Dashboard                        │
└───────────────────┬──────────────────────────────────┘
                    │ REST API
┌───────────────────┴──────────────────────────────────┐
│                  BACKEND (Express)                    │
│  Session │ Check-in │ Journal │ Crisis │ Admin Routes │
│         Emotion Analyzer │ Crisis Detector            │
│              OpenAI Service (+ Fallback)              │
└───────────────────┬──────────────────────────────────┘
                    │ Prisma ORM
┌───────────────────┴──────────────────────────────────┐
│                DATABASE (SQLite/PostgreSQL)            │
│  sessions │ mood_checkins │ journal_entries │ alerts  │
└──────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Tailwind CSS, Framer Motion, Recharts |
| Backend | Node.js, Express, TypeScript |
| ORM | Prisma |
| Database | SQLite (local) / PostgreSQL (production) |
| AI | OpenAI GPT-4o API + keyword fallback |
| Icons | Lucide React |
| Deployment | Vercel (frontend) + Render/Railway (backend) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Piyushrai05/mindbridge.git
cd mindbridge

# Install backend dependencies
cd backend
npm install
cp .env.example .env

# Set up database (SQLite for local dev)
echo 'DATABASE_URL="file:./dev.db"' >> .env
npx prisma db push
npx prisma generate

# Seed demo data
npm run seed

# Start backend
npm run dev

# In a new terminal — install and start frontend
cd ../frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | API server port | No (default: 3001) |
| `DATABASE_URL` | Database connection string | Yes |
| `OPENAI_API_KEY` | OpenAI API key for GPT-4o | No (fallback mode) |
| `JWT_SECRET` | JWT signing secret | No (has default) |
| `NODE_ENV` | Environment mode | No |

### Frontend (`frontend/.env`)

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | No (defaults to /api) |
| `VITE_APP_NAME` | Application name | No |

---

## API Documentation

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/session` | Create anonymous session |
| POST | `/api/checkin` | Submit mood check-in |
| POST | `/api/journal` | Submit journal entry (AI response) |
| POST | `/api/crisis-alert` | Report crisis event |
| POST | `/api/admin/login` | Admin authentication |
| GET | `/api/admin/stats` | Dashboard statistics |
| GET | `/api/admin/mood-distribution` | Mood breakdown |
| GET | `/api/admin/stress-trend` | 7-day stress trend |
| GET | `/api/admin/hourly-activity` | Hourly check-in activity |
| GET | `/api/admin/risk-distribution` | Risk level breakdown |
| GET | `/api/admin/recent-alerts` | Recent crisis alerts |

---

## Demo Credentials

| Portal | Email | Password |
|--------|-------|----------|
| Admin | `admin@mindbridge.edu` | `demo2026` |

The student portal requires **no login** — it's fully anonymous.

---

## Privacy & Safety

- **No sign-up required** — students access all features anonymously
- **No personal data collected** — sessions are UUID-based
- **Admin dashboard shows ONLY aggregate data** — never individual entries
- **Crisis trigger texts are redacted** before storage
- **All crisis detections display verified helpline numbers**
- **Compliant with privacy-first design principles**

---

## Team

Built by **Team MindBridge** for the **Far Away International Hackathon 2026** by Zuup.

---

## Future Scope

- 🌐 Multi-language support (Hindi, Tamil, Bengali, etc.)
- 🤖 Fine-tuned mental health AI model
- 🏫 Multi-campus deployment with federated analytics
- 📊 Predictive analytics for early intervention
- 👥 Peer support matching system
- 🔐 End-to-end encryption
- 📱 Native mobile apps (React Native)
- 🎯 Integration with campus counseling appointment systems

---

## License

MIT License — see [LICENSE](./LICENSE) for details.

---

## Disclaimer

> **MindBridge is a hackathon prototype. It is not a substitute for professional mental health care.**
>
> If you or someone you know is in crisis, please reach out:
> - **iCall**: 9152987821
> - **Vandrevala Foundation**: 1860-2662-345
> - **AASRA**: 9820466726
