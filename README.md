 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![CI](https://github.com/RYOTA-KOBA/MatchingApp/workflows/CI/badge.svg)](https://github.com/RYOTA-KOBA/MatchingApp/actions)
 
 - アプリのURL
 https://start-kokokara.com
 
 ### このアプリについて
 経験の浅いエンジニアやデザイナーのために作ったマッチングアプリです。web制作は個人で案件を受注すると案件の単価がかなり低くなってしまいます。そこで制作会社がやっているように、デザイナーとコーダーでチームを組んで案件を受注した方が結果的に一人当たりの単価も高くなると考え作成しました。
 
#### トップページ 
 ![top](https://user-images.githubusercontent.com/57514343/106434188-8b5dc000-64b4-11eb-8c1a-a7c3159781a5.png)
 
#### トップページ (スマホサイズ)
![sp-top](https://user-images.githubusercontent.com/57514343/106434202-8f89dd80-64b4-11eb-8936-a54fe1bb5d35.png)

## 使用技術
- フロントエンド
  - React 16.14.0
  - TypeScript 4.1.2
  - CSS/BootStrap/Material UI
- バックエンド
  - Firebase(Authentication, Firestore, Cloud Storage, Cloud Functions)
- インフラ
  - GCP(Cloud Storage, App Engine)
  - Github Actions
  - Docker 20.10.2 / docker-compose 1.27.4
  
フロントエンドはReact+TypeScriptで記述しています。デザインにはMaterial UIと一部BootStrapを使用しました。
バックエンドにはFirebaseを使用しており、Firestoreでは画像以外のデータの管理を、Cloud Storageでは画像の管理(+デプロイ時に一時的に使用)をしています。さらに、FirebaseのAuthenticationを用いてログイン、会員登録機能を実現しています。
また、開発環境には、Docker、docker-composeを、さらにGithub Actionsを使用し、pull requestを作成したら自動テストが走り、masterブランチにコードがmergeされると、自動ビルド自動デプロイがされます。デプロイ先はGCPのApp Engineで、オートスケールするようにしています。

## インフラ構成図
![Infra](https://user-images.githubusercontent.com/57514343/104829808-d5428580-58ba-11eb-9b8b-32d268e98b4d.png)

slackのIncoming Webhookを利用して、アプリ内の問い合わせ用モーダルからの問い合わせが開発環境のslackに通知されるようになっています。

## 機能一覧
- ユーザー関連
  - ユーザー登録機能
  - ログイン、ログアウト
  - ゲストユーザーログイン機能(1クリックでのログインができるもの)
  - フォロー、アンフォロー
- 投稿関連
  - 投稿機能(CRUD)
  - 投稿一覧表示
  - カテゴリーごとの投稿表示
  - フォローしているユーザーの投稿の一覧表示
  - 投稿へのコメント機能
- チャットボット機能
- お問い合わせのslack通知機能
- ブックマーク機能、ブックマークの一覧表示機能　
- プロフィール画像アップロード機能
- レスポンシブデザイン(SPのみ)
## License
This project is licensed under the terms of the [MIT license](https://github.com/RYOTA-KOBA/MatchingApp/blob/master/LICENSE.txt).
