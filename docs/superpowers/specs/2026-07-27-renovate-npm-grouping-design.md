# Renovate npm パッケージグルーピング設計

## 背景

現状の Renovate は、既知のモノレポを除き npm パッケージごとに PR を作成している。
そのため、同時更新が必要な `react` と `react-dom` も別 PR になり、片方だけを更新した
PR ではバージョン不一致によって CI が失敗している。

`rockon-cycle-frontend` で運用中の設定を参考に、通常の npm 更新を利用目的ごとの
2 グループへ集約する。

## 目的

- npm の非メジャー更新による PR 数と CI 実行回数を減らす
- 本番依存と開発依存を分離し、変更の影響範囲を判断しやすくする
- 破壊的変更とセキュリティ更新は通常更新から隔離する

## 対象外

- npm 以外の manager に対するグルーピング変更
- major 更新のグルーピング
- Renovate のスケジュール、PR 上限、lockfile maintenance の変更
- 既存依存パッケージの `dependencies` / `devDependencies` 間の移動

## 設計

`renovate.json5` に次の設定を追加する。

### npm production

- manager: `npm`
- dependency type: `dependencies`
- update type: `minor`、`patch`、`pin`、`pinDigest`、`digest`
- group name: `npm production`

### npm development

- manager: `npm`
- dependency type: `devDependencies`
- update type: `minor`、`patch`、`pin`、`pinDigest`、`digest`
- group name: `npm development`

ローカルの `packageRules` は `config:best-practices` から継承したルールより後に評価
されるため、対象となる非メジャー更新では既存のモノレポグループ名を production /
development グループ名で上書きする。

major 更新はこのルールに一致させず、Renovate の既存ルールに従って個別 PR または
既知のモノレポグループとして扱う。

## セキュリティ更新

`vulnerabilityAlerts` では `groupName: null` と空の `schedule` を指定する。
脆弱性由来の更新は通常の production / development グループへ入れず、定期実行日を
待たない個別 PR とする。

## 既存 PR への影響

次回の Renovate 実行時に、対象となる既存の単体 PR は自動クローズされ、
`renovate/npm-production` または `renovate/npm-development` ブランチの
グループ PR として再作成される可能性がある。

lockfile maintenance は依存更新とは別の PR のままとする。複数の PR が
`pnpm-lock.yaml` を変更するため、マージ順によって残りの PR に rebase が発生し得る。

## 検証

- Renovate の設定バリデーターで `renovate.json5` が有効であることを確認する
- 設定差分に npm production / development と vulnerability alert 以外の
  挙動変更が含まれないことを確認する
- 次回の Renovate 実行後、非メジャー npm 更新が dependency type ごとの
  2 グループに分かれることを確認する
- major 更新と脆弱性更新が通常グループへ混入しないことを確認する
