# FitFlow

A visually complete fitness prototype for IT3060 Human Computer Interaction Lab Exercise 06. Built with React Native, Expo CLI, TypeScript, and Expo Router, with realistic local sample data and Android release preparation.

The runnable app is at this repository's root. The existing Lab 05 design/architecture documents and frontend/backend/AI placeholder folders are retained as historical work. This lab implements an Expo prototype instead of the earlier proposed Flutter stack.

## Technologies

- Expo SDK 57; React Native 0.86.3; React 19.2.3; TypeScript.
- Expo Router stack and five bottom tabs; safe-area support.
- Manrope fonts and Ionicons, bundled locally.
- React context for session state; no backend, live AI API, or permanent storage.
- Expo build-properties plugin and EAS-managed release-signing workflow.
- Playwright browser interaction tests and Prettier.

## Setup and run

Use a compatible Node.js version. This workspace was checked with Node 22.17.0 and npm 11.7.0.

~~~powershell
Set-Location -LiteralPath 'C:\Users\Anju\Desktop\mi\Lab 5\fitflow-redesign'
npm install
npm start
~~~

For a reproducible install from the project lockfile, use npm ci. npm start explicitly starts Expo CLI in Expo Go mode. Install an Expo Go client compatible with SDK 57, connect the phone and computer to the same Wi-Fi network, then scan the terminal QR code. A connected Android device/emulator is required for npm run android. Browser preview is available with npm run web.

### Expo CLI commands

| Command | Purpose |
| --- | --- |
| npm start | Expo Go / QR-code development server |
| npm run start:clear | Expo Go server with Metro cache cleared |
| npm run android | Open Expo Go on connected Android device/emulator |
| npm run ios | Open Expo Go in an iOS simulator; requires macOS |
| npm run web | Browser preview |
| npm run start:dev | Connect an installed EAS development build |

The direct Expo CLI equivalent is npx expo start --go. Expo CLI is supplied by the local expo package; use it through npx/npm scripts. Because expo-dev-client is installed for the development build profile, an unqualified npx expo start defaults to a development build. Explicit --go avoids that ambiguity. See the [Expo CLI launch-target documentation](https://docs.expo.dev/more/expo-cli/#launch-target).

~~~powershell
npm run web
npm run typecheck
npx expo-doctor@1.20.4
npx expo install --check
~~~

## Main screens and interactions

| Screen | Behavior |
| --- | --- |
| Welcome | Branded welcome; Get Started opens Home; privacy access |
| Home | Workout recommendation, daily goals/statistics, streak, quick actions, profile access |
| AI Workout | Exercise list/sets/reps; replace, skip, shorten, reschedule, explanation, Start Workout |
| Workout session | Timer, pause/resume, next exercise, confirmed sample completion and progress update |
| Progress | Weekly chart, goal completion, calories/time, sample weight, achievements |
| Community | Fictional feed, like/unlike, comments, create local post |
| Nutrition | Calories/macros, meals by category, sample Add Meal, water tracking |
| Profile | Edit sample profile; settings/privacy/terms; confirmed sign-out/reset |
| Settings | Sample notifications preference; dark-mode availability label; app version |
| Privacy / Terms | Readable academic-prototype information |

Bottom tabs: Home → AI Workout → Progress → Community → Nutrition. Profile is opened from the Home avatar. Settings, Privacy Policy, and Terms are stack routes. Welcome is replaced on entry; signing out clears the navigation stack and resets demo state.

All entries are kept in memory and reset on reload/sign-out. Community content is not published, workout completion simulates planned minutes/calories, notification controls send no reminders, and AI recommendations are scripted samples. Do not enter real sensitive information. This is not medical/dietary advice.

## Project structure

~~~text
app/                  Expo Router screens and layouts
components/           Shared cards, controls, sheets, artwork
constants/            Colors and typography
data/                 Typed mock data, session provider, legal copy
types/                Domain types
assets/               Runtime icon, adaptive foreground, splash
scripts/              Optional geometric asset generator
tests/                Meaningful browser interaction/layout tests
store-assets/         Listing icons, graphics, actual preview captures
docs/                 Lab 06 report/build/testing/privacy/release documents
app.json              Expo identity, version, icons, plugins
eas.json              Development APK, preview APK, production AAB
~~~

## Local verification

~~~powershell
npm run typecheck
npm run format:check
npx expo-doctor@1.20.4
npx expo export --platform android --output-dir android-export
npm run test:ui
~~~

Playwright uses Chromium and starts the Expo web server automatically. If the browser is not installed on another team member's machine, run npx playwright install chromium once. Browser tests also capture genuine previews in store-assets/screenshots/web/. These are explicitly not Android installation/build evidence.

See [local verification results](docs/LOCAL_VERIFICATION.md) for actual outcomes. Native signing/build/install/device checks remain distinct. Upstream npm audit advisories remain documented; do not run npm audit fix --force blindly.

## Android build instructions

First release: app version 1.0.0, Android version code 1, package com.anju.fitflow. No previous app/version existed. Confirm the permanent team package before store/account setup; raise the version code before future releases.

The current machine is not logged into Expo. Complete these interactive steps privately:

~~~powershell
npx eas-cli@24.10.0 login
npx eas-cli@24.10.0 whoami
npx eas-cli@24.10.0 build:configure --platform android
npx eas-cli@24.10.0 credentials --platform android
~~~

Select the correct owner/project, preserve the configured build profiles, and let EAS create/manage the new app's keystore (or reuse established credentials for the same package). Back up credentials securely outside Git.

~~~powershell
npx eas-cli@24.10.0 build --platform android --profile preview
npx eas-cli@24.10.0 build --platform android --profile production
~~~

Preview generates an APK; production generates an AAB. After each build actually succeeds, download its artifact from the returned EAS build page/project Builds page on expo.dev. No signed APK/AAB has been generated yet. Building does not publish to a store. Latest-CLI equivalents are available as npm run build:preview and npm run build:production.

Never commit keystores, passwords, tokens, or credentials.json. See [release/signing documentation](docs/LAB06_ACTIVITY01_RELEASE_BUILD.md).

## Lab 06 documents

- [Main report guide — all six activities](docs/LAB06_REPORT_GUIDE.md)
- [Signed APK/AAB preparation](docs/LAB06_ACTIVITY01_RELEASE_BUILD.md)
- [Evidence checklist](docs/LAB06_EVIDENCE_CHECKLIST.md)
- [Android internal-testing table](docs/LAB06_INTERNAL_TESTING.md)
- [Privacy Policy](docs/PRIVACY_POLICY.md)
- [FitFlow v1.0 Release Notes](docs/RELEASE_NOTES.md)
- [Store assets and screenshot instructions](store-assets/README.md)

Play Console, Apple developer access, App Store Connect/TestFlight, signed build results, public privacy hosting, real support contact, and Android device evidence require manual account/device work. Nothing is marked complete without actual evidence.

## Earlier Lab 05 work

- [Technology Stack Summary](docs/tech-stack-summary.md)
- [Comparison Matrix](docs/comparison-matrix.md)
- [Architecture Diagram Placeholder](docs/architecture-diagram-placeholder.md)
- [Original architecture decision](docs/adr/ADR-001-architecture.md)

## License

See [LICENSE](LICENSE). Font/icon packages retain their upstream licenses.
