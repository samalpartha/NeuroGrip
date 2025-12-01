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

