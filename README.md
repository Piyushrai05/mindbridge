# MindBridge: Privacy-First Mental Wellness Platform

```
 ╔══════════════════════════════════════════════════════════════╗
 ║                                                              ║
 ║       🧠 MINDBRIDGE 🧠                                       ║
 ║       Anonymous AI Companion for Student Mental Wellness    ║
 ║       "Your confidential path to emotional clarity"         ║
 ║                                                              ║
 ║   Crisis Detection • Journaling • Mood Tracking • Analytics ║
 ║          Privacy-First • Anonymous • No Sign-Up             ║
 ║                                                              ║
 ╚══════════════════════════════════════════════════════════════╝
```

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](/)
[![React 18](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](/)
[![OpenAI](https://img.shields.io/badge/OpenAI%20GPT--4o-412991?style=for-the-badge&logo=openai&logoColor=white)](/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Status: Active](https://img.shields.io/badge/Status-Active%20Development-brightgreen?style=for-the-badge)](/)
[![Privacy](https://img.shields.io/badge/Privacy-First%20Design-2ecc71?style=for-the-badge)](/)

[🔗 Live Demo](#-quick-start) • [📖 Full Docs](docs/) • [🐛 Report Issue](https://github.com/Piyushrai05/mindbridge/issues) • [✨ Feature Request](https://github.com/Piyushrai05/mindbridge/issues)

</div>

---

## 📋 Table of Contents

- [🎯 Problem Statement](#-problem-statement)
- [💡 Solution](#-solution)
- [✨ Key Features](#-key-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Configuration](#️-configuration)
- [📡 API Documentation](#-api-documentation)
- [🧪 Testing](#-testing)
- [🐳 Docker Deployment](#-docker-deployment)
- [🔒 Privacy & Security](#-privacy--security)
- [📱 Screenshots](#-screenshots)
- [🚧 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 Problem Statement

### The Crisis in Student Mental Health

<div align="center">

| Statistic | Source | Implication |
|-----------|--------|------------|
| **70%** of Indian college students report moderate-to-high anxiety | National Mental Health Survey | Most students struggling |
| **60%** show signs of depression | Campus wellness studies | Majority affected |
| **11%** report severe distress or suicidal ideation | WHO India reports | ~1 in 10 in acute crisis |
| **Campus counselors are overburdened** | Institutional surveys | Limited access to help |
| **Cultural stigma prevents help-seeking** | Research literature | Fear of judgment |
| **Zero early-warning systems** | Current institutional status | No proactive intervention |

</div>

### The Gap

```
STUDENT MENTAL HEALTH CRISIS
│
├─ Problem 1: Fear of Judgment
│   └─ "What if my college finds out?"
│   └─ "Will this affect my academic record?"
│   └─ "Social stigma is real"
│
├─ Problem 2: Limited Resources
│   └─ Counselors: ~1 per 5,000 students
│   └─ Wait times: 2-4 weeks
│   └─ Office hours: 9-5, Mon-Fri only
│
├─ Problem 3: Information Asymmetry
│   └─ Colleges don't see mental health trends
│   └─ No early warning system
│   └─ Can't intervene proactively
│
└─ Problem 4: Lack of 24/7 Support
    └─ Counselors unavailable at night
    └─ Crises happen after hours
    └─ Emergency helplines are impersonal
```

---

## 💡 Solution

**MindBridge** is a **privacy-first, AI-powered mental wellness platform** that:

```
STUDENT PORTAL (Anonymous, No Sign-Up)
├─ Anonymous Check-In → Select mood (1-8 scale)
├─ AI Companion Chat → GPT-4o empathetic support
├─ Reflective Journaling → AI-guided prompts
├─ Guided Breathing → Calming animations
├─ Crisis Resources → Instant helplines
└─ 100% Private → NO personal data collected

        ↓ CRISIS DETECTION ENGINE ↓
    Real-time keyword analysis (NLP)
        ↓
    ├─ Low Risk → Offer resources
    ├─ Medium Risk → Connect to counselor
    └─ High Risk → Display emergency helplines

ADMIN DASHBOARD (Anonymized Campus-Wide Analytics)
├─ Mood Trends → Aggregate across campus
├─ Stress Heatmaps → Identify vulnerable periods
├─ Crisis Detection Rate → Early warning indicator
├─ Resource Recommendations → Suggest counselor capacity
└─ ZERO individual student data visible
```

---

## ✨ Key Features

### 🧠 AI-Powered Companion

**Empathetic, Crisis-Aware Chatbot**

- 🤖 GPT-4o powered conversational AI
- 😊 Therapeutic conversation techniques (CBT, DBT principles)
- 🚨 Crisis keyword detection in real-time
- 💬 Fallback mode (when API unavailable)
- 📊 Sentiment analysis on responses
- 🎯 Personalized coping suggestions

### 😊 Mood Check-In System

**Non-Judgmental Emotional Tracking**

- 🎨 8-point mood scale (Very Good → Very Bad)
- 💪 Intensity slider (1-10 scale)
- 📍 Quick context tags (Academics, Relationships, Health, Other)
- 📱 Single-tap check-in (~10 seconds)
- 📈 Historical mood trend visualization
- 🔔 Optional reminder notifications

### 📝 Reflective Journaling

**AI-Guided Personal Reflection**

- ✍️ Free-form text journaling
- 🎯 Guided prompts based on mood
- 🤖 AI response for each entry
- 📌 Tagging and categorization
- 🔒 Completely private (not shared with admin)
- 📊 Personal insights and patterns

### 🧘 Breathing & Mindfulness

**Calming Interactive Tools**

- 🌬️ Guided Box Breathing (4-4-4-4)
- ⏱️ Customizable duration (2-10 minutes)
- 🎨 Soothing animations
- 🎵 Optional ambient sounds
- 📈 Stress reduction tracking
- 🏆 Streak counter

### 🚨 Crisis Detection & Response

**Real-Time Safety Monitoring**

```
Crisis Keywords: self-harm, suicide, death, ending, ...
├─ Detected in user input
├─ Analyzed with NLP
├─ Instant crisis response triggered
│  ├─ Display emergency helplines (verified)
│  ├─ Show coping resources
│  ├─ Escalate to human support
│  └─ Optional: Alert institution
└─ Log for analytics (no PII stored)
```

**Verified Emergency Resources:**
- 🆘 iCall: 9152987821
- 🏥 Vandrevala Foundation: 1860-2662-345
- 📞 AASRA: 9820466726

### 📊 Admin Analytics Dashboard

**Aggregate, Anonymized Insights**

- **Mood Distribution**: Campus-wide emotional landscape
- **Stress Trends**: 7-day and 30-day patterns
- **Crisis Detection Rate**: Early warning indicator
- **Peak Usage Hours**: When students need help most
- **Risk Level Breakdown**: % Low/Medium/High risk
- **Recent Alerts**: Crisis events (anonymized)
- **Recommendations**: Suggested interventions

---

## 🏗️ Architecture

### System Architecture

```
FRONTEND (React 18 + Vite)
    ├─ Student Portal (Mood, Journal, Chat, Breathe)
    ├─ Admin Dashboard (Analytics, Stats)
    └─ State Management (React Context)
         │
         └─ API Calls
                  │
BACKEND (Express + TypeScript)
    ├─ Session Manager (UUID-based, anonymous)
    ├─ Mood Check-In Service
    ├─ Journal Service (with AI Response)
    ├─ Crisis Detector (NLP Analysis)
    ├─ OpenAI Integration (+ Fallback)
    └─ Admin Analytics Routes
         │
         └─ Prisma ORM
                  │
DATABASE (PostgreSQL / SQLite)
    ├─ sessions (anonymous UUID)
    ├─ mood_checkins (aggregate only)
    ├─ journal_entries (never shared)
    ├─ chat_messages (session-based)
    └─ crisis_alerts (anonymized)
```

### Data Flow

```
User Interaction (Select Mood, Type Message, etc.)
    ↓
React State Update
    ↓
API Call (Express Backend)
    ↓
Validation (Zod) + Data Processing
    ↓
Database Operation (Prisma)
    ↓
Response to Frontend
    ↓
Component Re-render
    ↓
Display to User
```

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework, hooks, concurrent rendering |
| **TypeScript 5.x** | Static typing, type safety |
| **Vite** | Fast bundler and dev server |
| **Tailwind CSS** | Utility-first styling, dark mode |
| **Framer Motion** | Smooth animations |
| **Lucide React** | Beautiful icon library |
| **Recharts** | Data visualization |
| **React Query** | Data fetching, caching |
| **React Hook Form** | Performant form management |
| **Zod** | Runtime schema validation |

### Backend

| Technology | Purpose |
|-----------|---------|
| **Node.js 18+** | JavaScript runtime |
| **Express.js** | HTTP server and routing |
| **TypeScript 5.x** | Type-safe backend code |
| **Prisma ORM** | Database abstraction layer |
| **PostgreSQL** | Relational database (production) |
| **SQLite** | Local development database |
| **Jest** | Unit testing framework |
| **Supertest** | HTTP assertion library |

### AI & Deployment

| Technology | Purpose |
|-----------|---------|
| **OpenAI GPT-4o** | Conversational AI, empathetic responses |
| **Natural Language Toolkit** | Crisis keyword detection |
| **Sentiment Analysis** | Emotion detection in text |
| **Docker** | Containerization |
| **Vercel** | Frontend deployment |
| **Railway / Render** | Backend deployment |
| **PostgreSQL Cloud** | Managed database |

---

## 🚀 Quick Start

### Prerequisites

```bash
✅ Node.js 18+
✅ npm or pnpm
✅ PostgreSQL or SQLite
✅ OpenAI API key (optional)
✅ Git
```

### Installation

**Step 1: Clone Repository**

```bash
git clone https://github.com/Piyushrai05/mindbridge.git
cd mindbridge
```

**Step 2: Install Dependencies**

```bash
# Backend
cd backend
pnpm install
cp .env.example .env

# Frontend (in another terminal)
cd ../frontend
pnpm install
cp .env.example .env
```

**Step 3: Setup Database**

```bash
cd backend
npx prisma db push
npx prisma generate
npm run seed
```

**Step 4: Run Development Servers**

```bash
# Terminal 1: Backend
cd backend
pnpm dev

# Terminal 2: Frontend
cd frontend
pnpm dev
```

**Step 5: Access Application**

- Frontend: http://localhost:5173
- Backend: http://localhost:3001
- Admin Dashboard: http://localhost:5173/admin

---

## ⚙️ Configuration

### Environment Variables

#### Backend (`backend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `DATABASE_URL` | Database connection | `postgresql://user:pass@host/db` |
| `OPENAI_API_KEY` | OpenAI API key | `sk-...` |
| `JWT_SECRET` | Session signing key | `random-string` |
| `NODE_ENV` | Environment | `development` |
| `CORS_ORIGIN` | Allowed frontend | `http://localhost:5173` |

#### Frontend (`frontend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend URL | `http://localhost:3001` |
| `VITE_APP_NAME` | App name | `MindBridge` |

---

## 📡 API Documentation

### Create Anonymous Session

```http
POST /api/session

Response 200 OK:
{
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "expiresAt": "2026-07-15T10:30:00Z"
}
```

### Submit Mood Check-In

```http
POST /api/checkin
X-Session-ID: 550e8400-e29b-41d4-a716-446655440000

{
  "mood": 5,
  "intensity": 7,
  "contextTags": ["academics", "sleep"]
}

Response 200 OK:
{
  "checkinId": "c1a1c1a1-c1a1-c1a1-c1a1-c1a1c1a1c1a1",
  "timestamp": "2026-07-08T10:30:00Z"
}
```

### Submit Journal Entry

```http
POST /api/journal
X-Session-ID: 550e8400-e29b-41d4-a716-446655440000

{
  "content": "Today was overwhelming. I couldn't focus in my exam..."
}

Response 200 OK:
{
  "entryId": "j1a1j1a1-j1a1-j1a1-j1a1-j1a1j1a1j1a1",
  "content": "Today was overwhelming...",
  "aiResponse": "I hear that you're struggling with exam pressure...",
  "sentimentScore": -0.65,
  "timestamp": "2026-07-08T10:30:00Z"
}
```

### Chat with AI Companion

```http
POST /api/chat
X-Session-ID: 550e8400-e29b-41d4-a716-446655440000

{
  "message": "I'm feeling really anxious about my future"
}

Response 200 OK:
{
  "userMessage": "I'm feeling really anxious about my future",
  "assistantMessage": "It's completely normal to feel anxious about the future...",
  "crisisDetected": false,
  "sentiment": "concerned",
  "timestamp": "2026-07-08T10:30:00Z"
}
```

### Admin Dashboard Statistics

```http
GET /api/admin/stats
Authorization: Bearer {admin_token}

Response 200 OK:
{
  "activeSessions": 1523,
  "totalCheckins": 4891,
  "averageMood": 5.2,
  "crisisDetectionRate": 0.032,
  "peakHour": 20,
  "institutionalHealthScore": 72
}
```

---

## 🧪 Testing

### Unit Tests

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage

# Watch mode
pnpm test:watch
```

### Integration Tests

```bash
# Run API integration tests
pnpm test:integration

# Test with real database
pnpm test:e2e
```

---

## 🐳 Docker Deployment

### Build and Run

```bash
# Build containers
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Deployment

```bash
# Deploy frontend to Vercel
cd frontend
vercel deploy

# Deploy backend to Railway/Render
cd backend
railway up
```

---

## 🔒 Privacy & Security

### Security Principles

| Principle | Implementation |
|-----------|---|
| **Data Minimization** | Collect only essentials |
| **Anonymization** | Session-based, no identifiers |
| **Encryption** | TLS/SSL in transit, encrypted at rest |
| **Access Control** | Admin dashboard strictly anonymized |
| **Audit Logging** | Track data access for compliance |
| **Secure Deletion** | Sessions auto-delete after 30 days |

### Privacy Checklist

- [x] No personal data collection
- [x] No sign-up required
- [x] Admin sees only aggregate data
- [x] Journal entries never exposed
- [x] Crisis keywords redacted before storage
- [x] GDPR-compliant data handling
- [x] HIPAA-ready
- [x] No third-party data sharing

---

## 📱 Screenshots

### Student Portal - Check-In

![Check-In Screenshot](public/screenshots/checkin.png)

*Simple, 10-second mood tracking interface*

### Student Portal - AI Chat

![Chat Screenshot](public/screenshots/chat.png)

*Empathetic AI companion with crisis detection*

### Student Portal - Journaling

![Journal Screenshot](public/screenshots/journal.png)

*AI-powered journaling with empathetic responses*

### Admin Dashboard - Statistics

![Admin Dashboard Screenshot](public/screenshots/admin-dashboard.png)

*Anonymized campus-wide mental health metrics*

---

## 🚧 Roadmap

### Phase 1: MVP ✅ (Current)
- [x] Student portal (check-in, journal, chat)
- [x] Basic crisis detection
- [x] Admin dashboard (anonymized)
- [x] Helpline integration
- [x] Mobile-responsive design

### Phase 2: AI Enhancement (Q3 2026)
- [ ] Fine-tuned mental health model
- [ ] Multi-language support (Hindi, Tamil, etc.)
- [ ] Advanced sentiment analysis
- [ ] Personalized coping strategies
- [ ] Peer support matching

### Phase 3: Institutional Features (Q4 2026)
- [ ] Multi-campus support
- [ ] Advanced analytics (predictive risk)
- [ ] Integration with counseling systems
- [ ] Staff training modules
- [ ] Compliance reporting

### Phase 4: Global Scale (2027)
- [ ] Mobile app (React Native)
- [ ] Teletherapy integration
- [ ] ML for early intervention
- [ ] Expansion to other countries
- [ ] Enterprise deployment

---

## 🤝 Contributing

We welcome contributors! Here's how to get started:

### For First-Time Contributors

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'feat: add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

See [`CONTRIBUTING.md`](.github/CONTRIBUTING.md) for detailed guidelines.

---

## 📄 License

This project is licensed under the **MIT License** — see [`LICENSE`](LICENSE) file for details.

---

## 🆘 Disclaimer

> **⚠️ IMPORTANT: MindBridge is NOT a substitute for professional mental health care.**
>
> If you or someone you know is in crisis, please reach out to qualified professionals:
>
> - 🇮🇳 **iCall** (India): 9152987821
> - 🇮🇳 **Vandrevala Foundation**: 1860-2662-345
> - 🇮🇳 **AASRA**: 9820466726
> - 🇬🇧 **Samaritans** (UK): 116 123
> - 🇺🇸 **988 Suicide & Crisis Lifeline** (US): Call or text 988

---

## 🤝 Support & Community

| Channel | Purpose |
|---------|---------|
| 🐛 [GitHub Issues](https://github.com/Piyushrai05/mindbridge/issues) | Bug reports, feature requests |
| 💬 [GitHub Discussions](https://github.com/Piyushrai05/mindbridge/discussions) | Questions, ideas, announcements |
| 📧 [Email](mailto:support@mindbridge.edu) | Direct contact |
| 🐦 [Twitter](https://twitter.com/mindbridge_ai) | Updates |

---

<div align="center">

### ⭐ If this project helps, please star it!

**[View on GitHub](https://github.com/Piyushrai05/mindbridge)** • **[Read Docs](docs/)** • **[Report Issues](https://github.com/Piyushrai05/mindbridge/issues)**

Made with ❤️ by [Piyush Rai](https://github.com/Piyushrai05)

```
"Mental health is not a luxury. It's a necessity."
```

</div>

---

**Last Updated:** July 2026 | **Status:** Active Development | **Version:** 1.0.0
