# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

IWDD公式サイト (iwdd.net) - Next.js 16 + React 19で構築されたCloudflare Pages向けの静的サイト。岩手県盛岡市で毎月開催されるWeb系勉強会コミュニティのウェブサイト。

## Commands

```bash
# 開発サーバー起動
pnpm dev

# Lint (ESLint + Prettier)
pnpm lint

# テスト (Vitest)
pnpm test

# ビルド
pnpm build

# Cloudflare Workersプレビュー
pnpm preview

# Cloudflare Workersデプロイ
pnpm deploy
```

## Architecture

### Data Flow

イベントデータは `src/data.json` に格納。イベント更新時はこのファイルのみを編集する。

```
src/data.json → lib/getNextEvent.ts → page.tsx
                      ↓
              lib/getTopics.ts → components/RecentTopics.tsx
```

### Key Directories

- `src/app/` - Next.js App Router (page.tsx, layout.tsx)
- `src/lib/` - ユーティリティ関数（日付フォーマット、イベント取得など）
- `src/types/` - TypeScript型定義
- `src/data.json` - 全イベントデータ（vol, topics, start_at, place等）

### Type Definitions

- `DataEvent` - イベントの型定義 (vol, topics, start_at, price, cancelled等)
- `HomeParams` - ホームページ表示用のパラメータ型

## Code Style

- ESLint + Prettier (セミコロンなし、シングルクォート)
- `simple-import-sort` でimport自動ソート
- 相対パス禁止 (`./`, `../`) - `@/` エイリアスを使用
- `@typescript-eslint/consistent-type-imports` - 型importには `type` キーワード必須

## Deployment

- Cloudflare Workers via OpenNext (`@opennextjs/cloudflare`)
- Node.js 24 (mise.toml で管理)
