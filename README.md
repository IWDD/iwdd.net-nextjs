# iwdd.net-nextjs

[IWDD公式サイト](https://iwdd.net)のソースコードです。

[https://github.com/IWDD/iwdd.net-nextjs](https://github.com/IWDD/iwdd.net-nextjs)
がオリジナルのレポジトリです。

## 開発準備

1. [mise-en-place](https://mise.jdx.dev/) をインストールする

2. mise で nodejs と pnpm をインストールする

   ```shell
   mise install
   ```

3. 依存パッケージをインストールする

   ```shell
   pnpm install
   ```

## 開発サイクル

1. 開発サーバーの起動

   ```shell
   pnpm dev
   ```

2. Lint

   ```shell
   pnpm lint
   ```

3. Build

   ```shell
   pnpm build
   ```

4. CloudFlare Pages のプレビュー

   ```shell
   pnpm preview
   ```
