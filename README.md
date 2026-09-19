# FitFlow Redesign

FitFlow Redesign is a university HCI Lab 05 project for redesigning a cross-platform fitness application for iOS, Android, and Web. The proposed system supports AI-personalized workout plans, nutrition tracking, social sharing, real-time features, and wearable integrations.

## Main Features

- Cross-platform mobile and web fitness experience
- AI-personalized workout recommendations
- Nutrition tracking and activity logging
- Social sharing and real-time user interactions
- Wearable integrations using HealthKit and Google Fit adapters
- Secure authentication and user data handling

## Recommended Technology Stack

| Layer | Recommendation |
| --- | --- |
| Frontend | Flutter for iOS, Android, and Web |
| Native Integrations | Swift/Kotlin platform channels for HealthKit and Google Fit where required |
| Core Backend | NestJS |
| AI/ML and Nutrition Services | FastAPI |
| Relational Database | PostgreSQL |
| Flexible Logs | MongoDB |
| Cache and Real-Time Pub/Sub | Redis |
| Authentication | Auth0 |
| Architecture Style | Microservice-based architecture with API Gateway / BFF |

## Repository Structure

```text
fitflow-redesign/
|-- frontend/
|   |-- lib/
|   |-- test/
|   `-- .gitkeep
|-- backend/
|   |-- core-service/
|   `-- nutrition-service/
|-- ai-service/
|-- docs/
|   |-- tech-stack-summary.md
|   |-- comparison-matrix.md
|   |-- architecture-diagram-placeholder.md
|   `-- adr/
|       `-- ADR-001-architecture.md
|-- .github/
|   `-- workflows/
|       `-- ci.yml
|-- .gitignore
|-- LICENSE
`-- README.md
```

## Folder Overview

- `frontend/`: Placeholder for the future Flutter application.
- `backend/core-service/`: Placeholder for the future NestJS core API service.
- `backend/nutrition-service/`: Placeholder for the future nutrition tracking service.
- `ai-service/`: Placeholder for future AI/ML services.
- `docs/`: Project architecture, technology selection, comparison matrices, and ADR documentation.
- `.github/workflows/`: Repository validation workflow for GitHub Actions.

## Getting Started

This repository currently contains the initial project structure and design/architecture documentation required for the lab. The actual Flutter, NestJS, and FastAPI applications have not been initialized yet.

## Documentation

- [Technology Stack Summary](docs/tech-stack-summary.md)
- [Comparison Matrix](docs/comparison-matrix.md)
- [Architecture Diagram Placeholder](docs/architecture-diagram-placeholder.md)
- [ADR-001: Architecture Decision](docs/adr/ADR-001-architecture.md)
