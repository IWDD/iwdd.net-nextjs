# iwdd.net-nextjs

[IWDD公式サイト](https://iwdd.net)のソースコードです。

[https://github.com/IWDD/iwdd.net-nextjs](https://github.com/IWDD/iwdd.net-nextjs)
がオリジナルのレポジトリです。

## 開発準備

1. [mise-en-place](https://mise.jdx.dev/) をインストールする

   ```shell
   npm install -g mise-en-place
   ```

   `mise-en-place`は、プロジェクトの依存関係を管理するためのツールです。これを使うことで、プロジェクトのセットアップが簡単になります。

2. mise で nodejs をインストールする

   ```shell
   mise install
   ```

   このコマンドは、プロジェクトに必要なNode.jsのバージョンをインストールします。`mise-en-place`が自動的に適切なバージョンを選択します。

3. 依存パッケージをインストールする

   ```shell
   npm ci
   ```

   `npm ci`は、`package-lock.json`に基づいて依存関係をインストールします。これにより、依存関係のバージョンが正確に一致し、プロジェクトが一貫して動作することが保証されます。

## 開発サイクル

1. 開発サーバーの起動

   ```shell
   npm run dev
   ```

   このコマンドは、開発サーバーを起動し、ローカル環境でアプリケーションを実行します。ブラウザで`http://localhost:3000`にアクセスすると、アプリケーションの動作を確認できます。

2. Lint

   ```shell
   npm run lint
   ```

   `lint`コマンドは、コードの品質をチェックし、スタイルガイドに従っているかを確認します。エラーや警告が表示された場合は、コードを修正してください。

3. Build

   ```shell
   npm run build
   ```

   `build`コマンドは、プロジェクトをビルドし、最適化された静的ファイルを生成します。これにより、プロジェクトを本番環境にデプロイする準備が整います。

4. CloudFlare Pages のプレビュー

   ```shell
   npm run preview
   ```

   `preview`コマンドは、CloudFlare Pagesでプロジェクトをプレビューするための環境を設定します。これにより、本番環境にデプロイする前に、プロジェクトの動作を確認できます。

5. 開発サーバーにブラウザで接続する

   開発サーバーが起動したら、ブラウザを開いて以下のURLにアクセスします。

   ```
   http://localhost:3000
   ```

   このURLにアクセスすることで、ローカル環境で実行中のアプリケーションを確認できます。
