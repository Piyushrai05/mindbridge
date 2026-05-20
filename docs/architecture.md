# MindBridge Architecture

## Overview

MindBridge follows a classic client-server architecture with a React SPA frontend and an Express.js REST API backend. Data is stored in SQLite (development) or PostgreSQL (production) via Prisma ORM.

## Data Flow

### Student Flow
1. Student visits landing page — no authentication required
2. Creates anonymous session (UUID generated server-side)
3. Selects mood and intensity → saved to `mood_checkins`
4. Writes journal entry → processed through:
   - Emotion Analyzer (keyword-based classification)
   - Crisis Detector (crisis keyword matching)
   - OpenAI GPT-4o (or fallback response generator)
5. AI response returned to student
6. If crisis detected → overlay shown with helpline numbers, alert saved to `crisis_alerts`

### Admin Flow
1. Admin logs in with demo credentials
2. JWT token issued and stored in sessionStorage
3. Dashboard fetches aggregated, anonymized statistics
4. No individual student data is ever exposed

## Key Design Decisions

- **SQLite as default**: Zero-config local development. Switch to PostgreSQL for production via `DATABASE_URL`.
- **Fallback AI responses**: App works fully without OpenAI API key using pre-written empathetic responses.
- **Client-side crisis detection**: Runs in parallel with server-side detection for immediate UI response.
- **Session-based anonymity**: No accounts, no emails, no passwords for students. UUIDs only.
- **Redacted trigger texts**: Crisis alert trigger texts are replaced with "[REDACTED FOR PRIVACY]" before database storage.

## Database Schema

See `backend/prisma/schema.prisma` for the complete schema definition.

## Security Considerations

- Admin routes protected by JWT middleware
- No PII (Personally Identifiable Information) collected
- Crisis trigger texts are not stored in plaintext
- CORS enabled for cross-origin requests
- Input validation on all API endpoints
