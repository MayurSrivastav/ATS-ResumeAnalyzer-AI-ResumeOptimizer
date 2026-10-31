# ATS Resume Analyzer & AI Resume Optimizer

A web app that scores a PDF resume against a job description, shows which required skills are matched or missing, and uses AI to suggest better wording and likely interview questions without inventing anything.

## Why this exists

Many resumes are filtered by keyword-based Applicant Tracking Systems (ATS) before a person reads them, and candidates rarely know why. Most "AI resume checkers" let a language model produce the score itself, which makes it inconsistent (the same resume can get different scores) and sometimes dishonest (the AI adds skills the candidate doesn't have).

This project separates the two jobs:

- **Scoring is deterministic.** A rule-based engine calculates the ATS score, match score and matched/missing skills, so the same resume and job description always give the same result, and every point can be explained.
- **AI only writes.** Google Gemini rewrites the summary and project descriptions and generates interview questions. It is never trusted with the numbers.

## Features

- **Resume Analyzer**: upload a PDF, optionally paste a job description, and get an ATS score, grade, matched and missing skills, category breakdown, strengths and suggestions
- **Resume Optimizer**: AI-improved summary and project bullets tailored to the job description, plus technical, HR, project and behavioural interview questions
- **Dashboard and Analytics**: per-user history of past analyses and optimizations
- **Authentication**: signup and login with bcrypt-hashed passwords and JWT-protected routes

## How it works

```
React (Vite) frontend
        │
        ▼
Express API ── JWT auth middleware
        │
        ├──► pdf-parse ─────────── extracts text from the uploaded PDF
        │
        ├──► Rule-based analyzer ── skill detection, weighted scoring, sections, contact details
        │         │
        │         ▼
        ├──► Gemini (optimizer only) ── rewrites and interview questions, returned as JSON
        │
        ▼
MongoDB ── users and analysis history
```

### The scoring engine (`server/utils/resumeAnalyzer.js`)

1. **Skill detection**: 84 skills, each with synonyms (for example `react`, `reactjs`, `react.js` → React), matched with word-boundary regexes so that "C" doesn't match inside other words. Skills are grouped into 19 categories (frontend, backend, cloud, DevOps, AI/ML and others).
2. **Weighted match score**: each skill has an importance weight (for example Spring Boot 10, Bootstrap 3). The score is the weighted share of the job description's skills found in the resume.
3. **Resume quality checks**: small bonuses for contact details, GitHub/LinkedIn, key sections and quantified achievements; a penalty for very short resumes.
4. **Explainable output**: a grade, strengths and concrete suggestions alongside the score.

### Keeping the AI honest (`server/services/optimizerService.js`)

The Gemini prompt contains explicit rules: never add a technology, metric, certification or experience that isn't in the original resume; mention missing skills only as suggestions; don't upgrade "API" to "REST API" unless the resume says so. The model is also told not to return scores. Even if it does, the server ignores them and uses the rule-based analyzer's values.

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS, React Router, Axios |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose) |
| AI | Google Gemini API (`@google/genai`) |
| Auth | JWT, bcryptjs |
| File handling | Multer, pdf-parse |

## Running locally

**Backend**
```bash
cd server
npm install
```
Create `server/.env`:
```
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=a_long_random_string
```
Then start it:
```bash
node server.js
```
The API runs on `http://localhost:5000`.

**Frontend**
```bash
cd client
npm install
npm run dev
```

## Known limitations

Being clear about where the system breaks is more useful than presenting it as perfect:

- **Short aliases cause false matches.** Synonyms like `next` and `node` are also ordinary English words, so a job description saying "next steps" is detected as requiring Next.js. Fix: drop ambiguous short aliases or require surrounding technical context.
- **Scores without a job description are not meaningful.** With no job description, the resume is compared against its own skills, so even a very thin resume scores close to 100. Fix: score on general quality only in that mode, or require a job description.
- **Experience detection is naive.** Any "N years" phrase counts as work experience, including "3 years of college".
- **Keyword matching isn't understanding.** The analyzer detects that a skill is mentioned, not how deeply it was used.
- **Fallback JWT secret.** If `JWT_SECRET` is missing, the code falls back to a hardcoded default. A production version should refuse to start without it.

## Project structure

```
client/                  React frontend
  src/pages/             Analyzer, Optimizer, Dashboard, Analytics, Login, Signup
  src/components/        optimizer UI components, ProtectedRoute
server/
  controllers/           auth, resume, optimizer, analytics
  routes/                /api/auth, /api/resume, /api/optimizer, /api/analytics
  middleware/            JWT protection, file upload
  models/                User, ResumeAnalysis
  services/              Gemini client, optimizer
  utils/resumeAnalyzer.js   rule-based scoring engine
  data/                  skills, synonyms, weights
```
