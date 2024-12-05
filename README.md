# Todo App

Next.js 13とPrismaを使用したモダンなTodoアプリケーション。

## 機能

- ユーザー認証（NextAuth.js）
  - GitHub認証
  - Google認証
  - メール/パスワード認証
- Todoの作成、読み取り、更新、削除（CRUD）
- Todoのフィルタリング（全て、アクティブ、完了済み）
- レスポンシブデザイン

## ER図

```mermaid
erDiagram
    User {
        String id PK
        String name
        String email UK
        String password
        DateTime createdAt
        DateTime updatedAt
    }
    Todo {
        String id PK
        String title
        Boolean completed
        String userId FK
        DateTime createdAt
        DateTime updatedAt
    }
    TaskHistory {
        String id PK
        String todoId FK
        String action
        String title
        Boolean completed
        String userId FK
        DateTime createdAt
    }

    User ||--o{ Todo : "has"
    User ||--o{ TaskHistory : "has"
    Todo ||--o{ TaskHistory : "has"
```

## シーケンス図

```mermaid
sequenceDiagram
    actor User
    participant Client
    participant Server
    participant Auth
    participant DB

    %% 認証フロー
    User->>Client: アクセス
    Client->>Server: ページリクエスト
    Server->>Auth: セッション確認
    alt 未認証
        Auth-->>Server: 未認証
        Server-->>Client: /auth/loginにリダイレクト
        Client-->>User: ログインページ表示
    else 認証済み
        Auth-->>Server: セッション情報
        Server->>DB: Todoデータ取得
        DB-->>Server: Todoリスト
        Server-->>Client: ページ表示
        Client-->>User: Todoリスト表示
    end

    %% Todo操作フロー
    User->>Client: Todo作成
    Client->>Server: POST /api/todos
    Server->>Auth: 認証確認
    Auth-->>Server: OK
    Server->>DB: Todo保存
    DB-->>Server: 保存完了
    Server->>DB: 履歴保存
    DB-->>Server: 履歴保存完了
    Server-->>Client: 作成完了
    Client-->>User: UI更新
```

## 技術スタック

- フロントエンド
  - Next.js 13 (App Router)
  - TypeScript
  - Tailwind CSS
  - shadcn/ui

- バックエンド
  - Next.js API Routes
  - Prisma
  - PostgreSQL
  - NextAuth.js

## セットアップ

1. リポジトリのクローン

```bash
git clone <repository-url>
cd todo-app
```

2. 依存関係のインストール

```bash
npm install
```

3. 環境変数の設定

```bash
cp .env.example .env
# .envファイルを編集して必要な環境変数を設定
```

4. データベースのセットアップ

```bash
npx prisma migrate dev
```

5. 開発サーバーの起動

```bash
npm run dev
```

## 環境変数

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth providers
GITHUB_ID="your-github-id"
GITHUB_SECRET="your-github-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## ライセンス

MIT
