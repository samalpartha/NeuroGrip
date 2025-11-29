# NeuroGrip

**NeuroGrip** is a full-stack web application for physical therapists and patients undergoing hand rehabilitation. It combines progress tracking, customized therapy plans, AI-assisted robotic glove control, and gamified exercises to increase patient engagement.

## Who it’s for
- **Patients** recovering from stroke, injury, or neurological conditions who need structured, engaging hand therapy.
- **Therapists** who want data-driven insights into patient progress and a simple way to manage therapy plans.
- **Clinics / Rehab centers** looking to modernize their rehabilitation workflows and connect to robotic glove devices.

## Key Features
- **Personalized Dashboards**: Summary cards for therapy time, average grip strength, adherence, and goal completion, plus charts over time.
- **Gamified Therapy Sessions**: Interactive "Grip Challenge" and other mini-games using target grip ranges, repetitions, and timing.
- **Adaptive AI Assistance**: Genkit-backed recommendations for robotic glove assistance based on session history and therapist constraints, with explainable overrides.
- **Therapist Patient Management**: Patient onboarding, therapy program assignment and adjustments, session history, and clinical notes.
- **Program Builder**: Reusable therapy templates (e.g., 4-week post-stroke) that can be customized per patient.
- **Progress & Compliance Analytics**: Trends for grip strength, adherence, missed sessions, and exportable summaries for clinic notes.
- **Settings & Accessibility**: Profile management, notification preferences, and accessibility-friendly UI options.

## Tech Stack
- **Framework:** Next.js (App Router)
- **UI:** React, ShadCN UI, Tailwind CSS, Lucide Icons
- **Backend:** Next.js API routes with a relational DB (e.g., PostgreSQL via Prisma) or Firebase as an alternative
- **AI:** Genkit for AI recommendations and future integration with LLM-based coaching
- **Testing (optional):** Playwright for E2E, Jest/Testing Library for components

## Getting Started
Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result, then explore the sections from the sidebar navigation.

## Firebase setup
If you connect the app to Firestore, apply the bundled security rules to avoid permission errors when listing the `patients` collection:

```bash
firebase deploy --only firestore:rules
```

The provided `firestore.rules` file allows authenticated users to read patient documents and create or update them when the payload matches the expected shape. Deletions are blocked by default to protect patient records.

## AI dev prompt (copy/paste ready)
Use this prompt with your AI development tool to generate an end-to-end solution (frontend, backend, DB, AI integration, tests, and alternatives):

```text
You are an expert full-stack engineer and UX designer. Build an end-to-end web application called **NeuroGrip** for physical therapy hand rehabilitation.

Goal:
NeuroGrip should support:
- Patients doing hand rehab (often with a robotic glove).
- Physical therapists managing patients and therapy programs.
- Clinics viewing progress and engagement.
The app must be user-friendly, accessible, and production-ready for a small clinic to pilot.

Use this preferred tech stack:
- Framework: Next.js (App Router, TypeScript)
- UI: React, ShadCN UI, Tailwind CSS, Lucide Icons
- Backend: Next.js API routes
- Database:
  - Primary option: PostgreSQL via Prisma ORM
  - Alternative: Firebase (Firestore + Auth) – design in a way that DB access can be swapped
- AI: Genkit for AI suggestions (use stub/provider abstraction if a real key is not present)
- Testing: Playwright for basic end-to-end flows, Jest + React Testing Library for key components

Roles:
1) Patient
2) Therapist
3) Clinic Admin (optional but supported)

Authentication:
- Email/password auth is sufficient, but design auth in a way that providers like Auth0/Clerk/Supabase Auth could be plugged in later.
- Basic roles: PATIENT, THERAPIST, ADMIN.

Core Features (MVP + some stretch):

1. Onboarding:
   - Simple sign-up for patients and therapists.
   - Therapist can invite patients via email and assign them initial therapy programs.
   - Admin can create therapist accounts and see a list of patients and therapists.

2. Dashboards:
   - Patient Dashboard:
     - Summary cards: total therapy hours, average grip strength over last 7/30 days, adherence percentage, goals completed.
     - Simple line chart for grip strength over time.
     - List of upcoming or due sessions.
   - Therapist Dashboard:
     - List of assigned patients with key indicators: last session date, adherence, a small “trend arrow” for improvement or decline.
     - Quick access to each patient’s detail page.

3. Therapy Programs:
   - Data model for a “ProgramTemplate” (e.g., 4-week post-stroke.hand program) including:
     - Name, description, recommended frequency per week
     - Typical target grip range, number of repetitions, session length
   - Patient-specific “AssignedProgram” that can override template parameters.
   - UI to:
     - Create/edit ProgramTemplates (therapist/admin).
     - Assign a template to a patient, with override options.
     - Show a simple schedule / calendar view of sessions for a patient.

4. Therapy Sessions:
   - Patient-facing “Start Session” flow:
     - Selects today’s program/session.
     - Runs a “Grip Challenge” mini-game:
       - Show target grip value or range.
       - Accept (simulated) current grip readings (for now: mock sliders/inputs with a clear extension point for real device integration).
       - Count repetitions, set durations, and log success/failure.
   - At the end of a session:
     - Log a TherapySession record:
       - patientId, therapistId (if applicable), programId
       - date/time, total duration
       - series of grip attempts with values
       - computed metrics: average grip, max grip, number of repetitions, level of assistance used.

5. Adaptive AI Assistance (Genkit):
   - Write a service/module that:
     - Accepts recent session history + patient profile + optional clinical constraints.
     - Returns a recommended assistance level for the robotic glove (e.g., LOW, MEDIUM, HIGH) and a short explanation.
   - For now, you can:
     - Implement it as a pure function with deterministic logic AND
     - Wrap a Genkit-based call in a separate adapter (so if GENKIT_API_KEY is missing, fall back to the deterministic rule-based logic).
   - UI:
     - In the Session screen, show “AI Assistance Recommendation” with:
       - Recommended level (badge)
       - One-sentence reason
       - A button for therapist override.

6. Patient Management:
   - Therapist view to:
     - Search/list patients
     - Open a patient detail page:
       - Recent sessions
       - Grip strength trend chart
       - Adherence and missed sessions
       - Current program and ability to modify it
       - Clinical notes (text field with timestamped notes)
   - Patient profile editing (basic demographics, condition, hand affected, etc.).

7. Analytics & Reports:
   - Patient detail page: charts for:
     - Grip strength over time (line chart)
     - Adherence vs prescribed frequency
   - Simple “Export summary”:
     - Generate a structured JSON or simple text summary that could be copy-pasted into clinical notes.

8. Settings & General UX:
   - Profile settings for patients and therapists:
     - Name, email, time zone, notification preferences (stubbed).
   - Accessibility:
     - Clear typography, large tap targets for patient-facing flows.
     - Consider a high-contrast mode option toggle (even if it’s just a Tailwind/Theme switch).

Non-functional requirements:
- Use clean, modular architecture:
  - /app for Next.js routes
  - /components for shared UI components
  - /lib for domain logic and utilities
  - /features or /modules for cohesive feature areas (e.g., sessions, programs, analytics)
- Strong TypeScript typing across modules.
- Clear error handling and loading states for all async UI.
- Configuration via environment variables (database URL, Genkit key, etc.)

Data Model (you can refine, but start with this):

- User:
  - id, name, email, role (PATIENT | THERAPIST | ADMIN)
- PatientProfile:
  - id, userId, conditionDescription, dominantHand, notes
- ProgramTemplate:
  - id, name, description, frequencyPerWeek, targetGripMin, targetGripMax, defaultReps, defaultSessionMinutes
- AssignedProgram:
  - id, patientId, therapistId, programTemplateId
  - overrides for frequency, targetGripMin/Max, reps, sessionMinutes
  - active / inactive flag
- TherapySession:
  - id, patientId, therapistId, programId
  - startedAt, endedAt, totalDurationMinutes
  - averageGrip, maxGrip, assistanceLevelUsed
- GripAttempt:
  - id, sessionId
  - timestamp, gripValue, targetValue, assistanceLevel
- ClinicalNote:
  - id, patientId, therapistId, createdAt, noteText

Deliverables from you (the assistant):

1) A recommended folder structure for the Next.js app (App Router) that fits this feature set.
2) Prisma schema (for Postgres) covering the data model above (or the Firestore structure, if you choose that alternative, but please prioritize Prisma + Postgres).
3) Example Next.js route handlers (API routes) for:
   - creating and listing patients
   - assigning programs
   - logging sessions
   - fetching dashboard summaries
4) Core React / ShadCN / Tailwind components:
   - Patient Dashboard
   - Therapist Dashboard
   - Program Builder
   - Session Runner (Grip Challenge) with mocked grip input
   - AI Assistance panel (calling the AI service / rule engine)
5) A simple AI/Genkit integration module with:
   - interface for “getAssistanceRecommendation”
   - rule-based fallback if no API key
6) At least 2–3 Playwright E2E test examples:
   - Patient logs in and completes a simple session
   - Therapist logs in, assigns a program, and sees it on the patient’s dashboard
7) Clear instructions for:
   - Installing dependencies
   - Setting up the database (Prisma migration)
   - Running the dev server
   - Running tests

Make everything as user-friendly and clearly commented as possible so that:
- A clinician with basic technical help could pilot this,
- And a developer could easily extend it with real device integration and production-grade auth.
```
