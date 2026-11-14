# Cadence · The English Atelier

A bilingual Arabic/English British-English practice studio for shadowing, professional presentation, interviews and literary reading.

## Live website
https://cadence-british-english.higgsfield.ai

## Project source
The active deployed application runs on React 19, TypeScript and TanStack Start. The key authored files are:
- `app/src/routes/index.tsx` — interface, practice scenarios, interactions, storage and progression.
- `app/src/cadence.css` — responsive design system.

## Features
- Four practice modes and editable sample dialogue.
- Browser text-to-speech with `en-GB` preference and adjustable playback rate.
- Microphone recording and replay; temporary recordings may be downloaded.
- Optional browser speech recognition and editable transcripts.
- Explicitly **approximate word similarity**, not phonetic or accent evaluation.
- Personal favourites, recurring mistakes, freeform notes, lesson editor.
- Saved progress in browser local storage, with JSON export/import.
- Arabic-first UI with English locale switch.

## Limitations and privacy
- Sample lessons are fictional training examples.
- The transcription engine depends on browser compatibility, permissions and potentially browser-provided speech services. Do not assume offline transcription.
- Audio recordings are held temporarily in the current browser session; they are not added to JSON backups.
- Progress is device/browser-local; clearing browser data removes it unless exported. No multi-device sync or accounts in this version.
- Word similarity is an edit-distance heuristic that ignores some punctuation and does not evaluate correctness of paraphrases, pronunciation, timing, prosody or British accent.

## Run
In the full TanStack Start scaffold: `cd app && bun run dev`. No API keys are required.

## Planned upgrades
Add per-user backend storage and sign-in, consent-based recording storage, manual teacher review, accent and rhythm feedback from a verified speech-scoring service, richer writing feedback, accessibility/usability tests and automated CI.
