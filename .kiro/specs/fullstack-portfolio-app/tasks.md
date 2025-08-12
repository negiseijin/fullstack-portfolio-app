# Implementation Plan

- [x] 1. プロジェクト基盤とモノレポ構造の構築
  - [x] Turborepo 設定ファイル (turbo.json) を作成
  - [x] pnpm workspace 設定 (pnpm-workspace.yaml) を作成
  - [x] apps/web (Next.js) と apps/api (Hono) ディレクトリ構造を作成
  - [x] packages/* 共有ライブラリの基本構造を設定
  - [x] TypeScript設定ファイルとTurborepo設定を更新
  - [x] Biome設定ファイルを作成してコード品質ツールを設定
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [x] 2. 共有パッケージの実装
- [x] 2.1 TypeScript型定義パッケージの作成
  - [x] packages/types でAPI、User、Post、認証関連の型定義を実装
  - [x] Zodスキーマによるバリデーション型を定義
  - _Requirements: 1.3_

- [x] 2.2 データベースパッケージの実装
  - [x] packages/database でPrismaスキーマを実装
  - [x] User、Post、Tag、Account、Sessionモデルを定義
  - [x] PostgreSQL接続設定とマイグレーション設定を構築
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

- [x] 2.3 認証パッケージの実装
  - [x] packages/auth でNextAuth.js設定を実装
  - [x] GitHub、Google OAuth プロバイダー設定
  - [x] RBAC (ADMIN/USER) ロール管理機能を実装
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 2.4 共有UIコンポーネントパッケージの実装
  - [x] packages/ui でshadcn/ui基盤コンポーネントを実装
  - [x] Button、Input、Card、Table等の基本コンポーネント
  - [x] Tailwind CSS設定とテーマ設定を構築
  - _Requirements: 7.5, 8.1, 8.2, 8.3, 8.4_

- [ ] 3. Next.js フロントエンドアプリケーションの実装
- [x] 3.1 Next.js App Routerの基本構造実装
  - [x] apps/web でNext.js 15 App Router設定
  - [x] レイアウトコンポーネントとナビゲーション実装
  - [x] React 19統合とServer Components設定
  - [ ] 国際化 (i18n) 設定とlanguage switcher実装
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 26.1, 26.2, 26.3_

- [x] 3.2 認証関連ページとコンポーネントの実装
  - [x] ログイン、ログアウトページの作成
  - [x] NextAuth.js APIルートの作成とOAuth認証フローの統合
  - [x] 認証状態に応じたUIコンポーネントの実装
  - _Requirements: 2.1, 2.2, 2.3_

- [ ] 3.3 ユーザープロフィール機能の実装
  - [ ] プロフィール表示・編集ページの実装
  - [ ] アバター画像アップロード機能の実装
  - [ ] SNSリンク管理機能の実装
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 3.4 投稿管理機能の実装
  - [ ] 投稿一覧表示ページの実装
  - [ ] 投稿詳細表示ページの実装
  - [ ] Markdownエディターによる投稿作成・編集機能の実装
  - [ ] 画像添付とタグ付与機能の実装
  - _Requirements: 4.1, 4.2, 4.3, 4.6, 4.7_

- [ ] 3.5 検索機能の実装
  - [ ] 全文検索UIコンポーネントの実装
  - [ ] 検索結果表示とフィルタリング機能の実装
  - [ ] タグベース検索機能の実装
  - _Requirements: 4.4, 4.5_

- [ ] 3.6 管理ダッシュボードの実装
  - [ ] 管理者専用ダッシュボードページの実装
  - [ ] React Tableによるユーザー管理機能の実装
  - [ ] 投稿モデレーション機能の実装
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ] 4. Hono APIアプリケーションの実装
- [x] 4.1 Hono API基盤の構築
  - [x] apps/api でHonoアプリケーション基本構造を実装
  - [x] CORS、ロガー、レート制限、セキュリティヘッダーミドルウェアを実装
  - [x] 構造化されたエラーハンドリングとトレースID生成を実装 (Zod, Prisma, HTTPException)
  - [x] 環境変数・設定ファイルの管理と型安全なバリデーションの実装（dotenv, zod等）
  - [x] APIバージョニング（例: /api/v1 など）のルーティング設計
  - [x] OpenAPI（Swagger）仕様の自動生成・APIドキュメントエンドポイントの用意
  - [x] Zodによるリクエストbody/paramsのバリデーションとエラーハンドリング
  - [x] 共通レスポンスフォーマット・エラーコード設計
  - [x] ヘルスチェックエンドポイント（/healthz等）の実装
  - [x] CORSの詳細設定（オリジン・メソッド・ヘッダー制御、プリフライト対応）
  - [x] 開発用ホットリロード・デバッグ設定（tsx, pino-pretty, pretty-json等）
  - [x] ルート、ミドルウェア、エラー処理等のモジュール分割
  - _Requirements: 12.5, 13.1, 13.2_

- [x] 4.2 認証・認可APIエンドポイントの実装
  - [x] /api/auth/session エンドポイントを実装
  - [x] @repo/authを利用したセッション管理と検証を実装
  - [x] ユーザー認証(userAuth)・管理者権限(adminAuth)チェックミドルウェアを実装
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ] 4.3 ユーザー管理APIエンドポイントの実装
  - [ ] /api/users/* CRUD エンドポイントの実装
  - [ ] プロフィール更新とアバターアップロード処理の実装
  - [ ] メール認証とパスワードリセット機能の実装
  - _Requirements: 2.5, 2.6, 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 4.4 投稿管理APIエンドポイントの実装
  - [ ] /api/posts/* CRUD エンドポイントの実装
  - [ ] Markdownコンテンツ処理とバリデーションの実装
  - [ ] 画像アップロードとタグ管理の実装
  - [ ] ページネーションと検索機能の実装
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

- [ ] 4.5 通知システムAPIの実装
  - [ ] リアルタイム通知エンドポイントの実装
  - [ ] Resendによるメール送信機能の実装
  - [ ] 通知設定管理機能の実装
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 5. データベース設定とマイグレーション
- [ ] 5.1 devcontainerを利用したPostgreSQL環境構築
  - [ ] devcontainer.json と Docker Compose でPostgreSQLのサービスを定義
  - [ ] pgvector拡張の設定と全文検索インデックス作成
  - [ ] Prismaマイグレーションファイルの作成と実行
  - _Requirements: 4.4_

- [ ] 5.2 シードデータの作成
  - [ ] 開発用テストユーザーとサンプル投稿データの作成
  - [ ] 管理者ユーザーとロール設定のシードデータ実装
  - [ ] タグとカテゴリのマスターデータ作成
  - _Requirements: 2.3, 7.1_

- [ ] 6. テスト実装
- [ ] 6.1 ユニットテストの実装
  - [ ] Vitestによるユーティリティ関数とビジネスロジックのテスト
  - [ ] Zodバリデーションスキーマのテスト
  - [ ] データ変換処理のテスト
  - _Requirements: 9.1, 9.5_

- [ ] 6.2 コンポーネントテストの実装
  - [ ] Testing LibraryによるReactコンポーネントのテスト
  - [ ] ユーザーインタラクションとプロパティ受け渡しのテスト
  - [ ] 条件付きレンダリングのテスト
  - _Requirements: 9.2_

- [ ] 6.3 API統合テストの実装
  - [ ] Honoエンドポイントの統合テスト
  - [ ] データベース操作とトランザクションのテスト
  - [ ] 認証・認可フローのテスト
  - _Requirements: 9.1, 9.5_

- [ ] 6.4 E2Eテストの実装
  - [ ] Playwrightによるユーザージャーニーテスト
  - [ ] 認証フローと投稿CRUD操作のE2Eテスト
  - [ ] 管理者機能のE2Eテスト
  - _Requirements: 9.3, 9.5_

- [ ] 6.5 Storybookの実装
  - [ ] UIコンポーネントのStorybook設定
  - [ ] コンポーネントドキュメンテーションの作成
  - [ ] ビジュアルリグレッションテストの設定
  - _Requirements: 9.4_

- [ ] 7. セキュリティ対策の実装
- [ ] 7.1 CSRF・XSS対策の実装
  - [ ] CSRFトークン生成と検証の実装
  - [ ] XSS防止のための入力サニタイゼーション実装
  - [ ] セキュアなCookie設定の実装
  - _Requirements: 12.1, 12.2, 12.4_

- [ ] 7.2 レート制限とセキュリティヘッダーの実装
  - [ ] API レート制限ミドルウェアの実装
  - [ ] セキュリティヘッダー (Helmet) の設定
  - [ ] 依存関係脆弱性スキャンの設定
  - _Requirements: 12.3, 12.5_

- [ ] 8. パフォーマンス最適化
- [ ] 8.1 Next.js パフォーマンス最適化
  - [ ] 画像最適化とlazy loading の実装
  - [ ] コード分割とdynamic import の実装
  - [ ] キャッシュ戦略の実装
  - _Requirements: 11.4, 11.5_

- [ ] 8.2 データベースパフォーマンス最適化
  - [ ] Prisma接続プール設定の最適化
  - [ ] データベースインデックスの最適化
  - [ ] クエリパフォーマンスの測定と改善
  - _Requirements: 11.3_

- [ ] 9. 観測性とモニタリングの実装
- [ ] 9.1 ログ・メトリクス・トレーシングの実装
  - [ ] pino構造化ログの実装
  - [ ] OpenTelemetryトレーシングの設定
  - [ ] Prometheusメトリクス収集の実装
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

- [ ] 10. アクセシビリティ対応
- [ ] 10.1 WCAG 2.1 AA準拠の実装
  - [ ] ARIAラベルとセマンティックHTMLの実装
  - [ ] キーボードナビゲーション対応の実装
  - [ ] カラーコントラスト最適化の実装
  - [ ] axe-core自動テストの設定
  - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5_

- [ ] 11. CI/CDパイプラインの構築
- [ ] 11.1 GitHub Actions ワークフローの実装
  - [ ] lint、test、buildチェックのワークフロー作成
  - [ ] Vercel Preview環境デプロイの自動化
  - [ ] 本番環境デプロイの自動化
  - _Requirements: 10.1, 10.2, 10.3_

- [ ] 11.2 セキュリティスキャンの統合
  - [ ] Trivy脆弱性スキャンの設定
  - [ ] CodeQL静的解析の設定
  - [ ] Lighthouse CI パフォーマンステストの統合
  - _Requirements: 10.4, 10.5_

- [ ] 12. ドキュメンテーションの整備
- [ ] 12.1 プロジェクトドキュメントの作成
  - [ ] README.md でプロジェクト概要とクイックスタートガイド作成
  - [ ] CONTRIBUTING.md で開発ガイドライン作成
  - [ ] SECURITY.md でセキュリティポリシー作成
  - _Requirements: 全般_

- [ ] 12.2 API ドキュメンテーションの作成
  - [ ] OpenAPI仕様書の作成
  - [ ] API エンドポイントの使用例とレスポンス例
  - [ ] 認証方法とエラーハンドリングの説明
  - _Requirements: 2.1, 2.2, 3.1, 4.1, 6.1, 7.1_

- [ ] 12.3 アーキテクチャドキュメントの作成
  - [ ] システム構成図とC4モデル図の作成
  - [ ] ADR (Architecture Decision Records) の作成
  - [ ] データベース設計書とER図の作成
  - _Requirements: 全般_

- [ ] 13. 最終統合とデプロイ準備
- [ ] 13.1 環境変数と設定の整備
  - [ ] 開発・ステージング・本番環境の設定分離
  - [ ] シークレット管理とGitHub OIDC設定
  - [ ] 環境変数バリデーションの実装
  - _Requirements: 10.1, 10.2, 10.3_

- [ ] 13.2 本番デプロイとヘルスチェック
  - [ ] Vercel本番環境へのデプロイ
  - [ ] ヘルスチェックエンドポイントの実装
  - [ ] デプロイ後の動作確認とパフォーマンステスト
  - _Requirements: 11.1, 11.2_

- [ ] 14. React 19 & Next.js 15 最新機能の実装
- [ ] 14.1 Server Components & Actions の実装
  - [ ] Server Componentsによる非同期データフェッチングの実装
  - [ ] Server Actionsによるフォーム処理の実装
  - [ ] useActionStateフックによる状態管理の実装
  - [ ] useOptimisticフックによる楽観的更新の実装
  - _Requirements: 26.1, 26.2, 26.3, 26.4_

- [ ] 14.2 Next.js 15 高度なキャッシュ戦略の実装
  - [ ] unstable_cacheによるデータキャッシングの実装
  - [ ] revalidatePathとrevalidateTagによる再検証の実装
  - [ ] generateMetadataによる動的メタデータ生成の実装
  - [ ] Suspense boundariesによるストリーミングの実装
  - _Requirements: 26.4, 26.5, 26.6_

- [ ] 15. 高度なテスト戦略の実装
- [ ] 15.1 モダンテストツールの統合
  - [ ] Vitest + React Testing Libraryによるコンポーネントテスト
  - [ ] MSW (Mock Service Worker) によるAPIモッキング
  - [ ] Storybook Interaction Testingの実装
  - [ ] Chromatic Visual Regression Testingの設定
  - _Requirements: 27.1, 27.2, 27.3, 27.5_

- [ ] 15.2 Playwright E2Eテストの強化
  - [ ] 並列実行とシャーディングの設定
  - [ ] クロスブラウザテストの実装
  - [ ] モバイルデバイステストの追加
  - [ ] パフォーマンステストの統合
  - _Requirements: 27.4, 27.6_

- [ ] 16. 高度なセキュリティ対策の実装
- [ ] 16.1 NextAuth.js v5 セキュリティ強化
  - [ ] PKCE flowによるOAuth認証の実装
  - [ ] JWT refresh token rotationの実装
  - [ ] セッション管理の強化
  - _Requirements: 28.1, 28.2_

- [ ] 16.2 Content Security Policy & セキュリティヘッダー
  - [ ] Strict CSP with nonceの実装
  - [ ] セキュリティヘッダーの強化
  - [ ] 自動脆弱性スキャンの設定
  - [ ] セキュリティ監査ログの実装
  - _Requirements: 28.3, 28.4, 28.5, 28.6_

- [ ] 17. AI駆動開発ワークフローの実装
- [ ] 17.1 AI開発ツールの統合
  - [ ] Claude CLI & Gemini CLIの設定と活用
  - [ ] GitHub Copilotの最適化設定
  - [ ] AI支援によるコード生成ワークフローの構築
  - _Requirements: 25.1, 25.2_

- [ ] 17.2 AI自動化パイプラインの構築
  - [ ] PR作成時の自動リリースノート生成
  - [ ] テストカバレッジ低下時の自動テスト生成
  - [ ] ADR自動生成システムの構築
  - [ ] プライバシーガードレールの実装
  - _Requirements: 25.2, 25.3, 25.5, 25.6_
