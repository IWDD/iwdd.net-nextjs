# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) and other coding agents
when working with code in this repository. `AGENTS.md` is a symlink to this file,
so every agent reads the same content — edit only `CLAUDE.md`.

## Project Overview

IWDD公式サイト (iwdd.net) - vinext (Vite + Next.js) + React 19で構築されたCloudflare Workers向けのサイト。岩手県盛岡市で毎月開催されるWeb系勉強会コミュニティのウェブサイト。

## Commands

```bash
pnpm dev             # 開発サーバー起動（vite dev、http://localhost:5173）
pnpm lint            # ESLint（Prettier を含む）
pnpm test            # Vitest
pnpm test:e2e        # Playwright（pnpm preview を起動して叩く。UI モードは test:e2e:ui）
pnpm build           # vite build（Build Output は .cloudflare/output/v0）
pnpm preview         # build してから workerd で起動（vite preview、http://localhost:4173）
pnpm run deploy      # Cloudflare Workers へデプロイ（vinext-cloudflare deploy）
```

`pnpm deploy` は pnpm 組み込みの workspace 用コマンドで、package.json の `deploy` スクリプトは
動かない。デプロイは `pnpm run deploy`。その他（`start` / `cf-typegen`）は
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
- ビルドした Worker は `vinext start`（Node の本番サーバー）では動かない。vinext の Worker 出力が
  `cloudflare:workers` を import するため。ローカルでの確認は `pnpm preview`（`vite preview`）を使う。
- Cloudflare の型（`Env` とランタイム型）は dev / build のたびに `.cloudflare/types` へ生成される
  （gitignore 済み）。ビルド前に単体で型チェックするなら先に `pnpm cf-typegen` を実行する。
- `cf` と `@cloudflare/vite-plugin` v2 はベータ。vite-plugin v2 の版は
  `2.0.0-beta.sha-<commit>` 形式で semver の順序が公開順と一致しないので、
  Renovate は beta タグを追う（`renovate.json5`）。
  `pnpm-workspace.yaml` の `minimumReleaseAge` により、公開から 48 時間未満のベータは入らない。

## Deployment

- Cloudflare Workers。vinext の既定構成（cf）で、Worker の設定は `cloudflare.config.ts`
  （`cf/config`）に書く。wrangler.jsonc と wrangler は使わない
- `pnpm run deploy`（`vinext-cloudflare deploy`）は `vite build` のあと
  `cf deploy --prebuilt` を実行する。手元から実行するときは `pnpm exec cf auth login`、
  CI では `CLOUDFLARE_API_TOKEN` と `CLOUDFLARE_ACCOUNT_ID` を渡す
- Node.js と pnpm のバージョンは `mise.toml` と `package.json` の `packageManager` で固定
