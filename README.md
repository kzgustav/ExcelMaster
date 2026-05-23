# ExcelMaster

Excel関数の中級〜上級トレーニング用Webサイトです。

ブラウザ上で問題を選び、疑似Excelグリッドを見ながら数式を入力し、答え合わせをしながら反復学習できます。

## 使い方

1. `index.html` をブラウザで開きます。
2. 左の問題一覧から問題を選びます。
3. 黄色の解答セルにExcel風の数式を入力します。
4. 「答え合わせ」で採点します。
5. わからない場合はヒントや「答えを見る」で確認できます。

## 主な機能

- 中級〜上級のExcel関数トレーニング
- 疑似Excelグリッド
- 数式バー
- 答え合わせ
- ヒント表示
- 答え表示
- ランダム出題
- 検索
- 難易度フィルター
- 進捗保存（ブラウザのlocalStorage）

## 練習できる主な関数

`SUMIFS`, `COUNTIFS`, `AVERAGEIFS`, `MAXIFS`, `MINIFS`, `SUMPRODUCT`, `XLOOKUP`, `VLOOKUP`, `INDEX`, `MATCH`, `XMATCH`, `FILTER`, `UNIQUE`, `SORT`, `TAKE`, `CHOOSECOLS`, `TEXTJOIN`, `TEXTBEFORE`, `TEXTAFTER`, `TEXTSPLIT`, `LEFT`, `FIND`, `SUBSTITUTE`, `IF`, `IFS`, `IFERROR`, `LET`, `LAMBDA`, `ROUNDUP`, `DATEDIF`, `EOMONTH`, `NETWORKDAYS`, `WORKDAY` など。

## GitHub Pagesで公開する場合

GitHubのリポジトリ画面で、`Settings` → `Pages` → `Build and deployment` を開き、以下のように設定します。

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/ (root)`

保存後、しばらくすると以下のURL形式で公開されます。

```text
https://kzgustav.github.io/ExcelMaster/
```

## 注意

このサイトは学習用の簡易トレーニングサイトです。Excelそのものではないため、すべてのExcel関数・すべてのExcel構文を完全再現するものではありません。
