# Renovate npm Package Grouping Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Renovate の非メジャー npm 更新を production と development の 2 PR に集約し、major 更新と脆弱性更新を通常グループから隔離する。

**Architecture:** `renovate.json5` のローカル設定に、脆弱性更新用の例外と dependency type 別の `packageRules` を追加する。既存の `config:best-practices`、スケジュール、lockfile maintenance は変更せず、後勝ちのローカルルールで対象となる非メジャー npm 更新だけを再分類する。

**Tech Stack:** Renovate JSON5 configuration、npm datasource、pnpm、`renovate-config-validator`

## Global Constraints

- 2 スペースインデント、UTF-8、LF を維持する
- npm 以外の manager にグルーピングルールを追加しない
- `major` 更新は production / development グループへ含めない
- 脆弱性更新はグループ化せず、定期 schedule を待たない
- Renovate の既存 schedule、PR 上限、lockfile maintenance を変更しない
- 依存パッケージを `dependencies` と `devDependencies` の間で移動しない
- コミットは Conventional Commits の英語 type と日本語本文を使い、署名付きにする

---

## File Structure

- Modify: `renovate.json5`
  - 脆弱性更新の個別・即時処理を指定する
  - 非メジャー npm 更新を dependency type ごとにグループ化する
- Reference: `docs/superpowers/specs/2026-07-27-renovate-npm-grouping-design.md`
  - 承認済み要件と運用上の期待動作を確認する

### Task 1: npm 更新のグルーピングを設定する

**Files:**

- Modify: `renovate.json5:24-33`
- Reference: `docs/superpowers/specs/2026-07-27-renovate-npm-grouping-design.md`

**Interfaces:**

- Consumes: Renovate の `vulnerabilityAlerts`、`packageRules`、`matchManagers`、`matchDepTypes`、`matchUpdateTypes`
- Produces: `npm production` と `npm development` のグループ PR 設定

- [ ] **Step 1: 変更前の Renovate 設定が有効であることを確認する**

Run:

```bash
npx --yes --package renovate -- renovate-config-validator --strict
```

Expected:

```text
INFO: Validating renovate.json5
INFO: Config validated successfully
```

- [ ] **Step 2: 脆弱性更新と npm グループのルールを追加する**

`dependencyDashboardOSVVulnerabilitySummary` の後へ脆弱性更新の例外を追加する。

```json5
  // 脆弱性由来の更新はグループ化・スケジュールを無視して即時・個別 PR にする。
  // (下の packageRules でまとめてしまい security fix が月曜まで遅延するのを防ぐ)
  vulnerabilityAlerts: {
    groupName: null,
    schedule: [],
  },
```

`lockFileMaintenance` の後へ dependency type 別のルールを追加する。

```json5
  // 非メジャーの npm 更新を利用目的ごとにまとめ、PR 件数と CI 実行回数を抑える。
  // major 更新は破壊的変更を隔離してレビューできるよう、既存ルールのまま扱う。
  packageRules: [
    {
      matchManagers: ['npm'],
      matchDepTypes: ['dependencies'],
      matchUpdateTypes: ['minor', 'patch', 'pin', 'pinDigest', 'digest'],
      groupName: 'npm production',
    },
    {
      matchManagers: ['npm'],
      matchDepTypes: ['devDependencies'],
      matchUpdateTypes: ['minor', 'patch', 'pin', 'pinDigest', 'digest'],
      groupName: 'npm development',
    },
  ],
```

- [ ] **Step 3: 更新後の Renovate 設定を strict mode で検証する**

Run:

```bash
npx --yes --package renovate -- renovate-config-validator --strict
```

Expected:

```text
INFO: Validating renovate.json5
INFO: Config validated successfully
```

- [ ] **Step 4: 変更範囲と書式を検証する**

Run:

```bash
git diff --check
git diff -- renovate.json5
```

Expected:

- `git diff --check` が終了コード 0 になる
- 差分が `vulnerabilityAlerts` と 2 件の npm `packageRules` だけである
- `major` が `matchUpdateTypes` に含まれていない
- production は `dependencies`、development は `devDependencies` のみを対象にする

- [ ] **Step 5: 設定変更を署名付きでコミットする**

Run:

```bash
git add renovate.json5
git commit -m "chore: Renovateのnpm更新を用途別に集約" \
  -m "非メジャー更新をproductionとdevelopmentに分割。脆弱性更新は通常グループから除外して即時・個別PRを維持。"
git verify-commit HEAD
```

Expected:

- `git verify-commit HEAD` が Good signature を表示する
- コミットには `renovate.json5` だけが含まれる

### Task 2: 次回 Renovate 実行後の受け入れ確認

**Files:**

- Inspect: GitHub PR branches `renovate/npm-production`、`renovate/npm-development`

**Interfaces:**

- Consumes: Task 1 の設定がデフォルトブランチへ反映されたリポジトリ
- Produces: グループ PR が期待どおり作成されたという運用確認

- [ ] **Step 1: production グループ PR を確認する**

Run:

```bash
gh pr list --repo IWDD/iwdd.net-nextjs --state open \
  --head renovate/npm-production \
  --json number,title,headRefName,url
```

Expected:

- 対象となる更新が同時に 2 件以上存在する場合、`renovate/npm-production` の
  PR が最大 1 件表示される
- タイトルが `fix(deps): update npm production` になる

- [ ] **Step 2: development グループ PR を確認する**

Run:

```bash
gh pr list --repo IWDD/iwdd.net-nextjs --state open \
  --head renovate/npm-development \
  --json number,title,headRefName,url
```

Expected:

- 対象となる更新が同時に 2 件以上存在する場合、`renovate/npm-development` の
  PR が最大 1 件表示される
- タイトルが `chore(deps): update npm development` になる

- [ ] **Step 3: 除外対象が通常グループへ混入していないことを確認する**

Run:

```bash
gh pr list --repo IWDD/iwdd.net-nextjs --state open \
  --head renovate/npm-production \
  --json number,title,body,files,url
gh pr list --repo IWDD/iwdd.net-nextjs --state open \
  --head renovate/npm-development \
  --json number,title,body,files,url
```

Expected:

- PR 本文の更新一覧に major 更新が含まれない
- `[security]` を付けた脆弱性更新が production / development PR に含まれない
- `lock file maintenance` は独立した PR のままである

同一グループ内の対象更新が 2 件未満でグループ PR が作成されない場合は、
Renovate の実行ログで `packageRules` の適用に設定エラーがないことを確認し、
次回更新時まで受け入れ確認を保留する。
