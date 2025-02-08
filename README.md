# iwdd.net-nextjs

[IWDD公式サイト](https://iwdd.net)のソースコードです。

[https://github.com/IWDD/iwdd.net-nextjs](https://github.com/IWDD/iwdd.net-nextjs)
がオリジナルのレポジトリです。

## 開発準備

1. [mise-en-place](https://mise.jdx.dev/) をインストールする

2. mise で nodejs をインストールする

   ```shell
   mise install
   ```  

3. 依存パッケージをインストールする

   ```shell
   npm ci
   ```

## 開発サイクル

1. 開発サーバーの起動

   ```shell
   npm run dev
   ```

2. Lint

   ```shell
   npm run lint
   ```

3. Build

   ```shell
   npm run build
   ```

4. CloudFlare Pages のプレビュー

   ```shell
   npm run preview
   ```
