# CLAUDE.md

## Project Overview

IWDD公式サイト (iwdd.net) - vinext (Vite + Next.js) + React 19で構築されたCloudflare Workers向けのサイト。岩手県盛岡市で毎月開催されるWeb系勉強会コミュニティのウェブサイト。

## Commands

```bash
# 開発サーバー起動
pnpm dev

# Lint (ESLint + Prettier)
pnpm lint

# テスト (Vitest)
pnpm test

# E2Eテスト (Playwright)
pnpm test:e2e

# E2Eテスト (Playwright UIモード)
pnpm test:e2e:ui

# ビルド
pnpm build

# ビルド済み成果物を起動
pnpm start

# ローカルプレビュー (vinext build && vinext start)
pnpm preview

# Cloudflare Workersデプロイ
pnpm deploy

# Cloudflare環境型を生成 (wrangler.jsonc変更後に実行 → cloudflare-env.d.ts)
pnpm cf-typegen
```

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
- `wrangler.jsonc`（Cloudflareバインディング）を変更したら
  `pnpm cf-typegen` で `cloudflare-env.d.ts` を再生成する。

## Deployment

- Cloudflare Workers via vinext (`vinext deploy`)
- Node.js 24 (mise.toml で管理)
- pnpm (packageManager field で管理)
