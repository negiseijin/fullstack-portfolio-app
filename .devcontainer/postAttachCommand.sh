#!/bin/bash

set -euo pipefail  # 安全構文：未定義変数・パイプ失敗も即終了
IFS=$'\n\t'        # 空白トラブル防止用：単語分割の明示

log() {
  echo "▶️ $1"
}

error_exit() {
  echo "❌ エラーが発生しました。中断します。"
  exit 1
}

trap error_exit ERR

log "🔧 Post-attach setup starting..."

if command -v gh &> /dev/null; then
  if ! gh auth status &> /dev/null; then
    log "🔑 GitHub CLI not authenticated. Try 'gh auth login'"
  else
    log "✅ GitHub CLI authenticated"
  fi
else
  log "⚠️ GitHub CLI not found (gh)"
fi

if command -v ssh &> /dev/null; then
  ssh -T git@github.com || log "⚠️ SSH認証に失敗（GitHub連携未設定？）"
fi

if command -v node &> /dev/null; then
  log "📦 node: $(node -v)"
else
  log "⚠️ Node.js not installed"
fi

if command -v pnpm &> /dev/null; then
  log "📦 pnpm: $(pnpm -v)"
else
  log "⚠️ pnpm not installed"
fi

if [ -f "package.json" ]; then
  if command -v pnpm &> /dev/null; then
    log "📦 Installing Node.js dependencies via pnpm..."
    pnpm install
  else
    log "⚠️ pnpm が見つかりませんでした。依存は手動でインストールしてください。"
  fi
else
  log "ℹ️ package.json not found. スキップします。"
fi

if [ -f .env ]; then
    echo "🔧 Loading environment variables..."
    source .env

    if [ -n "${GEMINI_API_KEY:-}" ]; then
        echo "GEMINI_API_KEY: $GEMINI_API_KEY"
        export GEMINI_API_KEY
    else
        echo "⚠️  GEMINI_API_KEY not set in .env file"
    fi
else
    echo "⚠️  .env file not found. Please create one from .env.example"
fi

# ── 追加スクリプトをここに追記可能 ─────────────────────
# 例）データベース起動確認、Lint実行、Playwright install など
# if [ -f "playwright.config.ts" ]; then
#   log "🎭 Installing Playwright deps..."
#   npx playwright install
# fi

log "✅ postAttachCommand 完了！"
