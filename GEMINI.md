### IWDDイベントトピックの更新手順

このドキュメントは、`iwdd.net-nextjs`プロジェクトにおいて、イベントのトピックを更新する際の標準的な手順を定めたものです。

#### 手順

1.  **作業ブランチの作成**
    *   `git switch -c feature/add-vol<number>-topics` のような形式で、作業内容がわかるブランチを作成します。

2.  **トピックの編集**
    *   `src/data.json` ファイルを開きます。
    *   更新対象の `vol` 番号に対応するイベントオブジェクトを見つけ、`topics` 配列を編集します。

3.  **変更内容の検証**
    *   `npm run build` を実行し、ビルドが成功することを確認します。
    *   `npm run lint` を実行し、Linterがエラーを報告しないことを確認します。
    *   これらの検証は、コミット前に**必ず**実施します。

4.  **コミット**
    *   `git add src/data.json` で変更をステージングします。
    *   `feat(data): iwdd vol.XXXのトピックを追加` という形式のコミットメッセージを作成し、ユーザーに確認を取ります。
    *   ユーザーの承認後、`git commit` を実行します。

5.  **プルリクエストの作成**
    *   `git push` でブランチをリモートにプッシュします。
    *   `gh pr create` コマンドを使い、コミットメッセージをタイトルと本文にしてプルリクエストを作成します。

6.  **CI/CDの確認**
    *   `gh pr checks <PR番号>` を実行し、すべてのGitHub Actionsが `pass` していることを確認します。
    *   すべてのチェックが成功するまでマージは行いません。

7.  **マージ**
    *   `gh pr merge <PR番号> --merge --delete-branch` を実行し、プルリクエストをマージしてリモートブランチを削除します。

8.  **後片付け**
    *   `git switch main` で `main` ブランチに切り替えます。
    *   `git pull` を実行し、ローカルの `main` ブランチを最新の状態に更新します。

#### 遵守事項・注意事項

*   **編集対象ファイル:** この手順における編集対象は `src/data.json` のみです。他のファイルは変更しません。
*   **検証の徹底:** `build` と `lint` の事前検証は、品質を担保するための重要なステップです。絶対に省略しません。
*   **コミットメッセージ:** コミットメッセージは日本語で、`feat(data):` のようなConventional Commitsの規約に準拠した形式で記述します。本文には変更内容の詳細を記載します。
*   **ユーザー確認:** コミットやマージなど、重要な操作の前には必ずユーザーに確認を取ります。