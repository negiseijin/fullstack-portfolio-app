# Requirements Document

## Introduction

エンジニア転職活動において「実務即戦力」を証明するためのフルスタック Web アプリケーションを構築します。Next.js + Hono を使用したモノレポ構成で、認証・投稿管理・国際化を含む包括的なポートフォリオアプリケーションを開発し、技術力・設計力・運用力を総合的にアピールします。  
さらに、GPT‑4o / GitHub Copilot を活用した **AI 駆動開発 (AI‑Driven Development)** ― コード生成・テスト生成・ドキュメント自動化、ならびに voice / video coding ワークフロー ― を導入し、生産性と品質向上を定量的に示すことを目的とします。

## Requirements

### Requirement 1: プロジェクト基盤構築

**User Story:** As a developer, I want a well‑structured monorepo setup with modern tooling, so that I can efficiently develop and maintain a full‑stack application.

#### Acceptance Criteria

1. WHEN the project is initialized THEN the system SHALL use Turborepo for monorepo management with apps/ and packages/ structure
2. WHEN development starts THEN the system SHALL provide devcontainer configuration with Ubuntu 22.04 base
3. WHEN code is written THEN the system SHALL enforce TypeScript strict mode across all packages
4. WHEN dependencies are managed THEN the system SHALL use pnpm v10+ for package management
5. WHEN code quality is checked THEN the system SHALL use Biome for linting and formatting
6. WHEN the project structure is reviewed THEN the system SHALL follow Clean Architecture principles with feature/shared/entities/pages organization

### Requirement 2: 認証・認可システム

**User Story:** As a user, I want secure authentication with multiple providers, so that I can safely access the application with my preferred login method.

#### Acceptance Criteria

1. WHEN a user visits the login page THEN the system SHALL provide OAuth options for GitHub and Google
2. WHEN a user successfully authenticates THEN the system SHALL create a secure session using NextAuth.js
3. WHEN user roles are assigned THEN the system SHALL support RBAC with ADMIN and USER roles
4. WHEN an admin accesses restricted areas THEN the system SHALL verify admin permissions
5. WHEN a user requests password reset THEN the system SHALL send verification email via Resend
6. WHEN email verification is required THEN the system SHALL implement email confirmation flow

### Requirement 3: ユーザー管理機能

**User Story:** As a user, I want to manage my profile information, so that I can customize my presence in the application.

#### Acceptance Criteria

1. WHEN a user accesses profile settings THEN the system SHALL allow editing of bio, avatar, and SNS links
2. WHEN a user uploads an avatar THEN the system SHALL handle image upload and storage
3. WHEN profile information is updated THEN the system SHALL validate and save changes to database
4. WHEN a user views their profile THEN the system SHALL display current profile information
5. WHEN profile data is invalid THEN the system SHALL show appropriate validation errors

### Requirement 4: 投稿管理システム

**User Story:** As a user, I want to create, edit, and manage posts with rich content, so that I can share information effectively.

#### Acceptance Criteria

1. WHEN a user creates a post THEN the system SHALL support Markdown formatting
2. WHEN a user adds images to posts THEN the system SHALL handle image attachment and display
3. WHEN a user adds tags THEN the system SHALL allow tag creation and association with posts
4. WHEN users search for content THEN the system SHALL provide full‑text search functionality using pgvector
5. WHEN a user views posts THEN the system SHALL display posts in a paginated list
6. WHEN a user edits their post THEN the system SHALL allow modification of content, tags, and images
7. WHEN a user deletes a post THEN the system SHALL remove the post and associated data

### Requirement 5: 国際化対応

**User Story:** As a user, I want the application in my preferred language, so that I can use it comfortably.

#### Acceptance Criteria

1. WHEN a user visits the application THEN the system SHALL detect browser language preference
2. WHEN a user switches language THEN the system SHALL provide Japanese and English options
3. WHEN content is displayed THEN the system SHALL show text in the selected language using next‑i18next
4. WHEN language is changed THEN the system SHALL persist the preference across sessions

### Requirement 6: リアルタイム通知システム

**User Story:** As a user, I want to receive timely notifications about important events, so that I stay informed about application activities.

#### Acceptance Criteria

1. WHEN important events occur THEN the system SHALL display real‑time toast notifications
2. WHEN email notifications are required THEN the system SHALL send emails via Resend service
3. WHEN notifications are displayed THEN the system SHALL show appropriate message content and styling
4. WHEN users interact with notifications THEN the system SHALL handle dismissal and actions appropriately

### Requirement 7: 管理ダッシュボード

**User Story:** As an admin, I want a comprehensive dashboard to manage users and posts, so that I can effectively moderate the application.

#### Acceptance Criteria

1. WHEN an admin accesses the dashboard THEN the system SHALL display user management interface using React Table
2. WHEN an admin views user data THEN the system SHALL show user statistics and activity information
3. WHEN an admin manages posts THEN the system SHALL provide post moderation capabilities
4. WHEN admin actions are performed THEN the system SHALL log administrative activities
5. WHEN dashboard data is loaded THEN the system SHALL use shadcn/ui components for consistent UI

### Requirement 8: レスポンシブデザイン

**User Story:** As a user, I want the application to work well on all devices, so that I can access it from anywhere.

#### Acceptance Criteria

1. WHEN the application is viewed on mobile devices THEN the system SHALL provide optimized mobile layout
2. WHEN the application is viewed on tablets THEN the system SHALL adapt layout for tablet screens
3. WHEN the application is viewed on desktop THEN the system SHALL utilize full screen space effectively
4. WHEN responsive breakpoints are reached THEN the system SHALL smoothly transition between layouts
5. WHEN touch interactions are used THEN the system SHALL provide appropriate touch targets and gestures

### Requirement 9: テスト実装

**User Story:** As a developer, I want comprehensive test coverage, so that I can ensure application reliability and maintainability.

#### Acceptance Criteria

1. WHEN unit tests are run THEN the system SHALL achieve >80% code coverage using Vitest
2. WHEN component tests are executed THEN the system SHALL test React components using Testing Library
3. WHEN E2E tests are run THEN the system SHALL verify critical user flows using Playwright
4. WHEN Storybook is used THEN the system SHALL provide component documentation and testing
5. WHEN tests fail THEN the system SHALL provide clear error messages and debugging information

### Requirement 10: CI/CD パイプライン

**User Story:** As a developer, I want automated deployment and quality checks, so that I can deliver reliable software efficiently.

#### Acceptance Criteria

1. WHEN code is pushed to PR THEN the system SHALL run lint, test, and build checks via GitHub Actions
2. WHEN PR is created THEN the system SHALL deploy preview environment on Vercel
3. WHEN code is merged to main THEN the system SHALL deploy to production on Vercel
4. WHEN security scans are performed THEN the system SHALL use Trivy and CodeQL for vulnerability detection
5. WHEN performance is measured THEN the system SHALL run Lighthouse CI with >90 score requirement

### Requirement 11: パフォーマンス最適化

**User Story:** As a user, I want fast application performance, so that I have a smooth user experience.

#### Acceptance Criteria

1. WHEN pages load THEN the system SHALL achieve LCP < 2.5s and TTFB < 200ms
2. WHEN Lighthouse audit runs THEN the system SHALL score ≥90 in all categories (Performance, Accessibility, Best Practices, SEO)
3. WHEN database queries execute THEN the system SHALL use Prisma connection pooling for optimization
4. WHEN static assets are served THEN the system SHALL implement proper caching strategies
5. WHEN images are displayed THEN the system SHALL use Next.js Image optimization

### Requirement 12: セキュリティ対策

**User Story:** As a user, I want my data to be secure, so that I can trust the application with my information.

#### Acceptance Criteria

1. WHEN the application handles requests THEN the system SHALL implement CSRF protection
2. WHEN user input is processed THEN the system SHALL prevent XSS attacks through proper sanitization
3. WHEN dependencies are used THEN the system SHALL monitor for vulnerabilities using Dependabot
4. WHEN cookies are set THEN the system SHALL use secure, SameSite cookie configuration
5. WHEN rate limiting is applied THEN the system SHALL prevent abuse through request throttling

### Requirement 13: 観測性とモニタリング

**User Story:** As a developer, I want comprehensive monitoring and logging, so that I can maintain and troubleshoot the application effectively.

#### Acceptance Criteria

1. WHEN application events occur THEN the system SHALL log structured data using pino
2. WHEN errors happen THEN the system SHALL capture and trace errors with proper context
3. WHEN metrics are collected THEN the system SHALL expose Prometheus‑compatible metrics
4. WHEN tracing is enabled THEN the system SHALL implement OpenTelemetry for distributed tracing
5. WHEN logs are reviewed THEN the system SHALL provide searchable, structured log format

### Requirement 14: アクセシビリティ対応

**User Story:** As a user with accessibility needs, I want the application to be usable with assistive technologies, so that I can access all features.

#### Acceptance Criteria

1. WHEN accessibility is tested THEN the system SHALL meet WCAG 2.1 AA standards
2. WHEN CI runs THEN the system SHALL include axe-core accessibility checks
3. WHEN keyboard navigation is used THEN the system SHALL provide full keyboard accessibility
4. WHEN screen readers are used THEN the system SHALL provide proper ARIA labels and descriptions
5. WHEN color contrast is checked THEN the system SHALL meet minimum contrast requirements

### Requirement 15: データモデル & マイグレーション

**User Story:** As a developer, I want safe schema evolution, so that database changes do not break the application.

#### Acceptance Criteria

1. WHEN schema changes are made THEN Prisma Migrate SHALL generate and apply migrations in every environment
2. WHEN CI runs THEN `prisma migrate deploy` SHALL synchronize production schema automatically
3. WHEN rollback is needed THEN the system SHALL provide documented commands to revert to the previous migration

### Requirement 16: バックアップ & リストア

**User Story:** As an operator, I want automated backups and clear restore steps, so that I can recover from data loss quickly.

#### Acceptance Criteria

1. WHEN 24 hours pass THEN the system SHALL create automated DB snapshots
2. WHEN a backup completes THEN it SHALL be stored for at least 14 days in a secure location
3. WHEN restore is tested THEN the README SHALL include a runbook and the process SHALL succeed at least twice a year

### Requirement 17: Infrastructure as Code

**User Story:** As a developer, I want reproducible environments, so that onboarding and deployments are predictable.

#### Acceptance Criteria

1. WHEN the repo is cloned THEN `docker-compose.yaml` SHALL bootstrap a full local stack with one command
2. WHEN production resources are provisioned THEN Terraform SHALL describe Vercel, database, and secrets declaratively
3. WHEN infrastructure changes are proposed THEN Terraform plan SHALL run in CI with human approval gates

### Requirement 18: Feature Flags / 環境切替

**User Story:** As a developer, I want to toggle features safely, so that I can release incrementally and run A/B tests.

#### Acceptance Criteria

1. WHEN feature toggles are evaluated THEN open‑feature SHALL control rollout logic at runtime
2. WHEN flags are updated THEN they SHALL be driven by environment variables or remote JSON without redeploy
3. WHEN disabled features are accessed THEN the system SHALL gracefully degrade without breaking UX

### Requirement 19: PWA & オフライン対応

**User Story:** As a mobile user, I want the app to work offline, so that I can view cached content without connectivity.

#### Acceptance Criteria

1. WHEN first visit occurs THEN a Service Worker SHALL be registered via next‑pwa
2. WHEN the device goes offline THEN previously viewed posts SHALL be available from cache
3. WHEN connectivity is restored THEN the app SHALL sync and display fresh content automatically

### Requirement 20: SEO & Analytics

**User Story:** As a hiring manager, I want to discover the portfolio easily, so that I can evaluate the candidate.

#### Acceptance Criteria

1. WHEN pages are rendered THEN OGP and meta tags SHALL be generated dynamically
2. WHEN page views occur THEN analytics events SHALL be sent via Next.js Analytics or Plausible
3. WHEN sitemap is requested THEN the system SHALL expose an up‑to‑date `sitemap.xml`

### Requirement 21: ドキュメント & ADR

**User Story:** As a contributor, I want clear documentation of decisions, so that I understand project context quickly.

#### Acceptance Criteria

1. WHEN significant architectural choices are made THEN an ADR SHALL be added under `docs/adr/`
2. WHEN the repository is browsed THEN README SHALL include a C4 architecture diagram and quick‑start guide
3. WHEN new APIs are introduced THEN OpenAPI or tRPC reference SHALL be updated automatically

### Requirement 22: リリース管理 & セマンティックバージョン

**User Story:** As a developer, I want automated versioning and changelogs, so that releases are consistent.

#### Acceptance Criteria

1. WHEN PRs are merged to main THEN semantic‑release SHALL generate version tags and CHANGELOG entries
2. WHEN commits are pushed THEN commit messages SHALL follow Conventional Commits and be linted in CI
3. WHEN a release is published THEN GitHub Releases SHALL include autogenerated notes

### Requirement 23: アラート & SLO

**User Story:** As an operator, I want actionable alerts based on SLOs, so that I can react before users notice problems.

#### Acceptance Criteria

1. WHEN error rate exceeds 1% over 5 minutes THEN Alertmanager SHALL send a notification to Slack
2. WHEN LCP > 2.5s for more than 1% of requests weekly THEN a performance alert SHALL be triggered
3. WHEN alerts fire THEN runbook links SHALL be included for quick remediation

### Requirement 24: プライバシー & 法令遵守

**User Story:** As a user, I want my privacy protected and legal compliance ensured, so that I can trust the application.

#### Acceptance Criteria

1. WHEN the site loads THEN a Cookie Consent banner SHALL appear and store user preferences
2. WHEN users request data deletion THEN an API endpoint SHALL remove their personal data within 30 days
3. WHEN legal documents are viewed THEN Terms of Service and Privacy Policy SHALL be accessible from the footer

### Requirement 25: AI 駆動開発ワークフロー

**User Story:**  
As a developer, I want integrated AI assistants that generate code, tests, and documentation, so that I can deliver high-quality features faster.

#### Acceptance Criteria

1. WHEN VS Code is open in the DevContainer  
   THEN `gpt-cli` or GitHub Copilot SHALL be available for inline code suggestions.
2. WHEN a new PR is created  
   THEN an AI tool SHALL auto-generate **release notes** and **risk summaries** as comments.
3. WHEN unit-test coverage for a file drops below 80 %  
   THEN an AI script SHALL propose additional **Vitest** cases via a CLI command.
4. WHEN database schema changes are detected  
   THEN an AI assistant SHALL draft the corresponding **Prisma migration** and rollback script.
5. WHEN architectural decisions are discussed  
   THEN an ADR template SHALL be pre-filled by an AI summarizer based on PR conversation.
6. WHEN secrets or PII risk is detected in prompts  
   THEN the system SHALL block the request and log a warning (privacy guardrail).

## Glossary

- **Acceptance Criteria** – 条件定義: 具体的・検証可能な "DONE の定義" を示すリスト。User Story が満たされたかどうかを PO/QA が判定するためのチェックポイント
- **EARS** – Easy Approach to Requirements Syntax: 要件記述のための構造化された記法
- **SLO** – Service Level Objective: サービスレベル目標
- **ADR** – Architecture Decision Record: アーキテクチャ決定記録
- **WCAG** – Web Content Accessibility Guidelines: ウェブアクセシビリティガイドライン
- **LCP** – Largest Contentful Paint: 最大コンテンツの描画時間
- **TTFB** – Time To First Byte: 最初のバイト到達時間
- **RBAC** – Role-Based Access Control: ロールベースアクセス制御
