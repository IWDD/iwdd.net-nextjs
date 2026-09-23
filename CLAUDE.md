# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) and other coding agents
when working with code in this repository. `AGENTS.md` is a symlink to this file,
so every agent reads the same content — edit only `CLAUDE.md`.

## Project Overview

IWDD公式サイト (iwdd.net) - vinext (Vite + Next.js) + React 19で構築されたCloudflare Workers向けのサイト。岩手県盛岡市で毎月開催されるWeb系勉強会コミュニティのウェブサイト。

## Commands

```bash
pnpm dev             # 開発サーバー起動
pnpm lint            # ESLint（Prettier を含む）
pnpm test            # Vitest
pnpm test:e2e        # Playwright（UI モードは test:e2e:ui）
pnpm build           # vinext build
pnpm run deploy      # Cloudflare Workers へデプロイ（vinext deploy）
```

`pnpm deploy` は pnpm 組み込みの workspace 用コマンドで、package.json の `deploy` スクリプトは
動かない。デプロイは `pnpm run deploy`。その他（`start` / `preview` / `cf-typegen`）は
`package.json` の scripts を参照。

## Architecture

### Data Flow

イベントデータは `src/data.json` に格納。イベント更新時はこのファイルのみを編集する。

```text
src/data.json
 ├─ lib/getNextEvent.ts → lib/getHomeParams.ts → app/page.tsx
 └─ lib/getTopics.ts ──────────────────────────→ app/components/RecentTopics.tsx
```

`getHomeParams` が `DataEvent` を表示用 `HomeParams` に変換する中核。
`formatEventDate` / `formatPrice` は表示整形に使う。

### Key Directories

- `src/app/` - App Router (page.tsx, layout.tsx, sitemap.ts)
- `src/app/components/` - ページ内Reactコンポーネント (RecentTopics.tsx)
- `src/lib/` - ユーティリティ関数（イベント取得、パラメータ変換、日付・価格整形など）
- `src/types/` - TypeScript型定義
- `src/styles/globals.css` - グローバルCSS (Tailwind)
- `src/data.json` - 全イベントデータ（vol, topics, start_at, place等）
- `public/` - 静的ファイル（ロゴ, robots.txt等）
- `test/` - ユニットテスト (Vitest)
- `e2e/` - E2Eテスト (Playwright)

### Type Definitions

- `src/types/DataEvents.d.ts` - `DataEvents`（events配列のラッパー）と
  `DataEvent`（vol, topics, start_at, price, cancelled等）
- `src/types/HomeParams.ts` - `HomeParams`（ホームページ表示用のパラメータ型）

## Code Style

- ESLint + Prettier (セミコロンなし、シングルクォート)
- `simple-import-sort` でimport自動ソート
- 相対パス禁止 (`./`, `../`) - `@/` エイリアスを使用
- `@typescript-eslint/consistent-type-imports` - 型importには `type` キーワード必須

## Gotchas

- イベント更新は `src/data.json` のみ編集する（単一ソース）。
- `getNextEvent` は `cancelled` でなく開始日時が未来のイベントのみ返す。該当なしの場合は `getHomeParams` が「未定」プレースホルダーを返す。
- `getTopics` はお題一覧から `'募集中'` を除外し、重複も排除する。
- `getTopics` の `shuffle` は `Math.random()` を使うため出力が非決定的。テストは順序に依存しない検証にする。

## Deployment

- Cloudflare Workers via vinext (`vinext deploy`)
- Node.js と pnpm のバージョンは `mise.toml` と `package.json` の `packageManager` で固定
