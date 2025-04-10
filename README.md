# 專案名稱:ArtRequest

ArtRequest 是一個提供繪師與客戶之間進行繪圖委託的平台，支援會員系統、委託單建立等功能。

## 功能特色

- ✅ 使用者註冊 / 登入 / 驗證（JWT + Cookie）
- 🎨 建立、瀏覽繪師作品集
- 📦 委託流程管理（建立、接受、付款、完成）

## 技術棧

- 前端：Vue 3 + Pinia + Bootstrap 5
- 後端：Laravel + JWT 驗證（php-open-source-saver/jwt-auth）
- 資料庫：MySQL

## 開發環境建置

### 前端

```bash
cd frontend
npm install
npm run dev
```

### 後端

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

## 🙋‍♀️ 聯絡方式

有任何問題歡迎聯絡我：

GitHub: @lucky08451

Email: qfkuch08451@gmail.com
