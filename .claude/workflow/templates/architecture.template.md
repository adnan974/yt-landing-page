# Architecture Decision Document

**Project:** {{PROJECT_NAME}}
**Author:** {{AUTHOR}}
**Date:** {{DATE}}
**Version:** 1.0

---

## Project Context Analysis

### Requirements Overview

**Functional Requirements Summary:**
| Category | Count | Complexity |
|----------|-------|------------|
| [Category 1] | [X] | [Low/Medium/High] |
| [Category 2] | [X] | [Low/Medium/High] |
| [Category 3] | [X] | [Low/Medium/High] |

**Non-Functional Requirements:**
- **Performance:** [Summary of performance requirements]
- **Security:** [Summary of security requirements]
- **Scalability:** [Summary of scalability expectations]
- **Accessibility:** [Summary of accessibility requirements]

**Scale & Complexity:**
- Primary domain: [Web/Mobile/API/Full-Stack]
- Complexity level: [Low/Medium/High/Enterprise]
- Estimated architectural components: [Count]

### Technical Constraints & Dependencies

| Constraint/Dependency | Impact | Mitigation |
|----------------------|--------|------------|
| [Constraint 1] | [Impact] | [How addressed] |
| [Constraint 2] | [Impact] | [How addressed] |

### Cross-Cutting Concerns

- **Authentication:** [How it spans components]
- **Logging:** [Logging strategy]
- **Error Handling:** [Error handling approach]
- **[Other Concern]:** [Description]

---

## Core Architectural Decisions

### Decision Summary

| Priority | Category | Decision | Version |
|----------|----------|----------|---------|
| Critical | [Category] | [Decision] | [Version] |
| Critical | [Category] | [Decision] | [Version] |
| Important | [Category] | [Decision] | [Version] |
| Deferred | [Category] | [Reason] | - |

### Data Architecture

**Database:**
- **Choice:** [Database name and version]
- **Rationale:** [Why this choice]
- **Alternatives Considered:** [Other options and why rejected]

**Data Modeling:**
- **Approach:** [ORM/Raw SQL/Document-based]
- **Schema Management:** [Migrations tool/approach]

**Caching:**
- **Strategy:** [Caching approach]
- **Technology:** [Redis/In-memory/CDN]

### Authentication & Security

**Authentication:**
- **Method:** [JWT/Sessions/OAuth/etc.]
- **Provider:** [Self-managed/Auth0/Clerk/etc.]
- **Token Storage:** [Cookie/LocalStorage/etc.]

**Authorization:**
- **Pattern:** [RBAC/ABAC/Simple]
- **Implementation:** [Middleware/Guards/etc.]

**Security Measures:**
- Encryption at rest: [Yes/No - approach]
- Encryption in transit: [TLS version]
- Additional measures: [List]

### API & Communication

**API Design:**
- **Pattern:** [REST/GraphQL/gRPC/tRPC]
- **Versioning:** [URL/Header/etc.]
- **Documentation:** [OpenAPI/GraphQL introspection/etc.]

**Response Format:**
```json
{
  "data": {},
  "error": null,
  "meta": {}
}
```

**Error Format:**
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {}
  }
}
```

### Frontend Architecture

_[Include only if applicable]_

**Framework:**
- **Choice:** [React/Vue/Svelte/etc. with version]
- **Meta-framework:** [Next.js/Nuxt/SvelteKit/etc.]

**State Management:**
- **Approach:** [Context/Redux/Zustand/etc.]
- **Server State:** [React Query/SWR/Apollo/etc.]

**Component Architecture:**
- **Pattern:** [Atomic/Feature-based/etc.]
- **Styling:** [CSS Modules/Tailwind/Styled-components/etc.]

### Infrastructure & Deployment

**Hosting:**
- **Platform:** [Vercel/AWS/GCP/etc.]
- **Type:** [Serverless/Containers/VMs]

**CI/CD:**
- **Platform:** [GitHub Actions/GitLab CI/etc.]
- **Pipeline:** [Build → Test → Deploy]

**Environments:**
| Environment | Purpose | URL Pattern |
|-------------|---------|-------------|
| Development | Local dev | localhost:3000 |
| Staging | Pre-production | staging.example.com |
| Production | Live | example.com |

**Monitoring:**
- **Logs:** [Provider/approach]
- **Metrics:** [Provider/approach]
- **Alerts:** [Provider/approach]

---

## Implementation Patterns & Consistency Rules

### Naming Patterns

**Database Naming:**
| Element | Convention | Example |
|---------|------------|---------|
| Tables | snake_case, plural | `users`, `user_profiles` |
| Columns | snake_case | `created_at`, `user_id` |
| Foreign Keys | `{table}_id` | `user_id` |
| Indexes | `idx_{table}_{column}` | `idx_users_email` |

**API Naming:**
| Element | Convention | Example |
|---------|------------|---------|
| Endpoints | /api/v1/{resource} | `/api/v1/users` |
| Query Params | camelCase | `?pageSize=10` |
| Path Params | camelCase | `/users/:userId` |

**Code Naming:**
| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `UserCard.tsx` |
| Functions | camelCase | `getUserData()` |
| Constants | SCREAMING_SNAKE | `MAX_RETRIES` |
| Files (components) | PascalCase | `UserCard.tsx` |
| Files (utilities) | camelCase | `formatDate.ts` |

### Structure Patterns

**Source Organization:**
```
src/
├── components/     # Reusable UI components
├── features/       # Feature-specific code
├── lib/           # Utilities and helpers
├── services/      # External service integrations
├── types/         # TypeScript types/interfaces
└── config/        # Configuration
```

**Test Organization:**
- Unit tests: Co-located as `*.test.ts`
- Integration tests: `tests/integration/`
- E2E tests: `tests/e2e/`

### Format Patterns

**Dates:**
- API: ISO 8601 strings (`2024-01-15T10:30:00Z`)
- Database: Timestamps with timezone
- Display: Localized via user preference

**IDs:**
- Internal: UUID v4
- External/URL: [UUID/CUID/NanoID]

### Process Patterns

**Error Handling:**
1. Catch at service boundary
2. Transform to standard error format
3. Log with context
4. Return appropriate HTTP status

**Loading States:**
- Use `isLoading`, `isError`, `data` pattern
- Show skeleton loaders for lists
- Show spinners for actions

**Validation:**
- Client: Immediate feedback
- Server: Always validate (never trust client)
- Schema: Use Zod/Yup for shared schemas

### Mandatory Rules

**All AI Agents MUST:**
1. Follow naming conventions exactly as documented
2. Use specified versions for all dependencies
3. Implement error handling per defined patterns
4. Place files in documented locations
5. Include tests for new functionality

---

## Project Structure & Boundaries

### Complete Project Structure

```
{{PROJECT_NAME}}/
├── README.md
├── package.json
├── [config files]
├── .env.example
├── .gitignore
├── .github/
│   └── workflows/
│       └── ci.yml
├── src/
│   ├── [main entry point]
│   ├── components/
│   │   ├── ui/
│   │   └── features/
│   ├── lib/
│   ├── services/
│   ├── types/
│   └── config/
├── [database]/
│   ├── schema
│   └── migrations/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── public/
    └── assets/
```

### Architectural Boundaries

**API Boundaries:**
| Boundary | Internal | External |
|----------|----------|----------|
| Authentication | `/api/auth/*` | OAuth providers |
| Core API | `/api/v1/*` | Public consumers |
| Webhooks | `/api/webhooks/*` | Third-party services |

**Component Boundaries:**
- Feature components encapsulate their own state
- Shared components receive all data via props
- Services are injected, not imported directly in components

**Data Boundaries:**
- Database access only through repository layer
- External APIs only through service layer
- Cache sits between service and repository

### Requirements Mapping

| Feature/Epic | Components | Services | API | Database |
|--------------|------------|----------|-----|----------|
| User Management | `users/` | `UserService` | `/api/v1/users` | `users`, `profiles` |
| [Feature 2] | `[dir]/` | `[Service]` | `[endpoint]` | `[tables]` |
| [Feature 3] | `[dir]/` | `[Service]` | `[endpoint]` | `[tables]` |

### Integration Points

**Internal Communication:**
- Components → Services: Direct import
- Services → Repositories: Dependency injection
- Features → Shared: Event bus / Context

**External Integrations:**
| Service | Purpose | Integration Point |
|---------|---------|-------------------|
| [Service 1] | [Purpose] | `services/[name].ts` |
| [Service 2] | [Purpose] | `services/[name].ts` |

---

## Validation Summary

### Coherence Check

- [x] All technology choices are compatible
- [x] Patterns support architectural decisions
- [x] Structure aligns with all choices
- [x] NFRs addressable with chosen architecture

### Completeness Check

- [x] All functional requirements have architectural support
- [x] All non-functional requirements are addressed
- [x] Cross-cutting concerns are handled
- [x] Integration points are defined

---

## Appendix

### Input Documents

- PRD: [path]
- UX Design: [path or "N/A"]
- Research: [paths or "N/A"]

### Decision Log

| Date | Decision | Rationale | Made By |
|------|----------|-----------|---------|
| [Date] | [Decision] | [Reason] | [Person] |

### Open Questions

- [Question 1]
- [Question 2]

### Change Log

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| [Date] | 1.0 | Initial version | [Author] |
