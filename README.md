## About

This project use [jaredpalmer/react-production-starter@0.2.0](https://github.com/jaredpalmer/react-production-starter) to be the file structure.

## COMMAND LINE


### HOW TO START FOR DEV MODE

```
npm install
npm start
```

### HOW TO START FOR PROD MODE
```
npm install --only=production
npm run build
npm run start:prod
```

### HOW TO START FOR PM2

```
npm install --only=production
npm run build
env NODE_ENV=staging pm2 start ./build/server.js --name 'official-web-staging'
```

### HOW TO RUN Test

再開始 run 測試前，要啟動 Local Prod Mode 
```
npm install
npm run test
```

> NOTE: 依據你的 NODE_ENV 切換

## Structure

```
.
├── /build/                     # npm run build 會產生的資料夾
├── /client/                    #
│   └── /index.js               # 前端啟動相關 script
├── /common/                    # 主要 React 程式放在這
│   ├── /components/            # 共用元件（記得開頭要大寫）
│   │   ├── /Layout/            # Container、Loading，等都放在這邊 依據相關性分類，例如：Ad、Footer、Header ...。
│   │   ├── /.../               # 依據相關性分類，例如：Ad、Footer、Header ...。
│   │   └── /App.js             # 基底 Layout
│   │
│   ├── /modules/               # 共用 Redux ( = constant + action + reducer)
│   ├── /routes/
│   │   ├── /.../               # 各頁面路由與 Layout 設定
│   │   │   ├── *components     # 專屬元件 (非必需)
│   │   │   ├── containers      # 基底：呼叫初始 action、連結 state
│   │   │   ├── index.js        # 路由設定
│   │   │   └── module.js       # 專屬的 Redux (非必需)
│   │   └── /root.js            # 所有頁面路由設定
│   │
│   ├── /createReducer.js       # 整合所有 module
│   ├── /store.js               # 整合 store 與 createReducer
│   └── /style.js               # 全域 style (目前沒有使用先移除)
│
├── /config/                    # 各環境相關值設定
├── /node_modules/              # npm 第三方套件
├── /public/                    # 靜態檔案存放位置
│   ├── /assets                 # npm run build 會產生的資料夾
│   └── ...                     # 網站所需的 Logo、icon 放在這
├── /server/                    #
│   ├── /index.dev.js           # 後端啟動相關 script 給 develop
│   └── /index.prod.js          # 後端啟動相關 script 給 Production
├── /test/                    	# 放測試
└── /tools/                     # webpack 相關設定


```
