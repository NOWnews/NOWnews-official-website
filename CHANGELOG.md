# Change Log
[NOWnews-official-website](https://github.com/NOWnews/NOWnews-official-website/issues) 的所有改變將在此 CHANGELOG 文件中記錄。

格式基於 [Keep a Changelog](http://keepachangelog.com/zh-CN/1.0.0/)
而項目則基於 [Semantic Versioning](http://semver.org/lang/zh-TW/).

## [Unreleased]

### Changed
- 調整子網站的圖片變為多彩 @esbb48

### Fixed
- `window.document.body.scrollTop` 有時沒作用，使用 `window.document.documentElement.scrollTop` 取代 @esbb48

## 1.0.33 - 2017-10-05
### Changed
- 調整特輯列表預設數量從 15 變 40 @esbb48

## 1.0.32 - 2017-10-02
### Added
- 首頁增加 12 條新聞空間再特輯上方 @esbb48

### Changed
- 調整 CI @esbb48
- 調整首頁特輯區塊改成各特色頻道 @esbb48

## 1.0.31 - 2017-09-28
### Added
- 加上 JestTest @esbb48
- 安裝測試相關套件 `jest`, `phantom`, `should` @esbb48
### Changed
- 調整 GA 追蹤碼，避免重複打或者漏打台中 26 的 GA @esbb48
- 完全移除在 `server/index.xx.js` send ga 的行為 @esbb48

## 1.0.30 - 2017-09-21
### Changed
- 打開廣告版位新聞全網文末iframe `Nownews_${adType}_article_600x225_i_new2` @esbb48
- 使用虛擬欄位 `sizeFormat` @esbb48
- 調整特輯的 `og:iamge` 不使用預設圖 @esbb48

### Fixed
- 修復圖片問題 @wb

## 1.0.29 - 2017-09-14
### Fixed
- 主圖無法正常預覽 @esbb48
- 調整聯絡我們 @esbb48
- 修復預覽新聞圖片過格式化時沒有 sizeFormat 的錯誤 @esbb48

## 1.0.28 - 2017-09-13
### Added
- （先隱藏）增加廣告版位新聞全網文末iframe `Nownews_${adType}_article_600x225_i_new2` @esbb48
- 追蹤因滑動而觸發的 pageview @esbb48
- 增加專欄頁面的特輯版型 @esbb48

### Changed
- 精選特輯換成火線話題 @esbb48
- 專題文字換成熱門專題 @esbb48
- 對調專題與特輯的位置 @esbb48
- 微調首頁 Video 的樣式，讓換影片的體驗不會有瞬間抽換的感覺 @esbb48
- 使用新版 imgLib  @esbb48
- 調整 popin:image 屬性 @esbb48
- 新 CI 樣式改版 @esbb48
- 移除已經停止的議題票選 @esbb48

### Fixed
- 首頁點選影音滑到對應高度會因上方有無廣告影響 @esbb48
- 影音新聞沒有關鍵字 @esbb48
- firebase 重複 init @esbb48

## 1.0.27 - 2017-08-29
### Added
- 增加廣告版位 `/5799246/column_300x250_amm_3` @esbb48
- 加上 `ad=0` @esbb48

### Changed
- 隱藏作者圖片，避免爬蟲因為抓不到主圖而抓到作者圖 @esbb48


## 1.0.26 - 2017-08-25
### Fixed
  - 圖片新聞沒有相關 CSS @esbb48

## 1.0.25 - 2017-08-24
### Note
- `npm install happypack`

### Changed
- 優化 webpack bundle @esbb48
  - client 端使用 CDN 取代套件，減少壓縮時間
  - 移除不需要載入的元件（世大運）、Router（帳號密碼註冊登入）
  - 把共用的套件加到 Vendor
  - 將 server 分成 prod 和 dev 兩種（避免在 build 的時候載入 dev 的 lib）並調整 script
  - 把 dev 的 lib 移到 devDependence
  - 使用 happypack 套件併發 build 的時間
  - 壓縮 onead_ir 的 js 檔案，並移到本地端
  - 預防 CDN 掛掉，像是 moment、video、firebase
  - 調整新聞內頁的 title @esbb48

### Fixed
  - 影音第一次載入沒有辦法播放 @esbb48

## 1.0.24 - 2017-08-15
### Changed
- 加縮圖在廣告新聞內頁與首頁 @wayne1025

### Fixed
- PageSpeed 的清除前幾行內容中的禁止轉譯 JavaScript 和 CSS 項目 @esbb48
- 調整預覽圖的最大寬度 @esbb48

## 1.0.23 - 2017-08-14
### Added
- 加中信廣告在新聞內頁 @esbb48

### Changed
- 調整世大運蓋板權重 @esbb48

## 1.0.22 - 2017-08-11
### Note: 安裝 `reselect` 套件
### Changed
- 將 state 資料先做格式化 @esbb48
- 移除整理不需要的檔案，ex: `HotVideoBlocks` @esbb48
- 微調 css 樣式與顯示 @esbb48
- 調整首頁的影音區塊 @esbb48
- 資料格式化時，可能沒有傳遞縮圖進來 @esbb48

## 1.0.21 - 2017-08-10
### Fixed
- 世大運關閉按鈕位置 @esbb48
- 顯示專題頁的 title @esbb48

## 1.0.20 - 2017-08-09
### Add
- 世大運 @esbb48

### Fixed
- isAdult 成人新聞提醒 @esbb48

## 1.0.19 - 2017-08-08
### Changed
- 把 sitemap 移到 middleware作 @esbb48

### Fixed
- sitemap 加上 CDATA 防護 @esbb48

## 1.0.18 - 2017-08-07
### Changed
- 將圖片調整長 GoogleCDN @esbb48

### Fixed
- 減少 firebase 不需要的套件的載入 @esbb48
- 在 ie 時，執行推播會 404 @esbb48

## 1.0.17 - 2017-08-04
### Fixed
- 內頁無限下滑 PV 追蹤網址 Bug @esbb48

## 1.0.16 - 2017-08-02
### Changed
- [廣告Final] OneAdICIP 改成 DFP @esbb48
- [廣告Final] 內頁 OneAdIR 加回 @esbb48

### Add
- 加上 firebase 推播 @wb

## 1.0.15 - 2017-08-01
### Changed
- 調整內頁好康報報版位的上下間距 @esbb48
- 調整首頁中信廣告改成 DFP @esbb48
- 內頁文字大小失效 @esbb48
- 內頁 OneAdICIP 拿掉 @esbb48

## 1.0.14 - 2017-07-30
### Changed
- 調整新聞關鍵字的顯示 @appleoxxo

## 1.0.13 - 2017-07-27
- 新聞內頁增加好康報報版位(GrabBag) @esbb48

## 1.0.12 - 2017-07-26
### Changed
- 更新 popin:image 的連結 https 變 http @esbb48
- 將 OneAdIR 改成 DFP(Nownews_PC_pushdown) @esbb48

## 1.0.11 - 2017-07-19
### Changed
- 將 completeUrl 移到 api 做 @esbb48

## 1.0.10 - 2017-07-17
### Changed
- 調整 LBS 使用者拒絕提供位置資訊的提示 ＠appleoxxo
- 調整 line 分享的預覽圖 @esbb48
- 調整 lbs 個階段的訊息 @esbb48
- 提出 completeUrl 的參數 @esbb48
- og:img 使用原圖就好，避免給兩個受到干擾 @esbb48

### Fixed
- api 壞掉避免完全 crash @esbb48
- 救回舊新聞的讚 @esbb48
- 避免是否為成人一直跳出 @esbb48

## 1.0.9 - 2017-07-14
### Added
- Popin 的 meta @esbb48

### Changed
- 使用 imgApi @esbb48
- 專欄分類頁的 Slide 可以控制 @esbb48
- 更新立院直播的新聞來源 @esbb48

### Fixed
- 地方新聞內頁都是生活廣告 @esbb48
- 避免選到的專題沒有新聞 @esbb48
### Fixed
- 溫度計指標 PV 太大會消失在盡頭 @esbb48

## 1.0.8 - 2017-07-12
### Fixed
- 救回幾則舊的新聞 FB 讚 @esbb48
- 修復切回內頁 news 第一下會沒有的問題 @esbb48

## 1.0.7 - 2017-07-11
### Fixed
- 影音分類 api 呼叫大小寫問題 @esbb48

## 1.0.6 - 2017-07-10
### Changed
- 內文分享調整回原始方式 @esbb48
- react-helmet 在 meta 上時移除不必要參數 @esbb48
- 讓非必填的 image & video 就不串 @esbb48

### Fixed
- ie11 Minified 的問題 @esbb48
- 調整 china 參數 @esbb48

## 1.0.5 - 2017-07-07
### Fixed
- 調整 OneAd 位置  @esbb48

## 1.0.4 - 2017-07-06
### Added
- 增加好康報報版位
- 增加 Popin
- 加上觸發渲染twitter嵌入元素 @appleoxxo
### Fixed
- OneAd、DFP 廣告版位調整 @esbb48
- 內頁 NOWnews 推薦字數超過兩行會跑版 @esbb48

## 1.0.3 - 2017-07-04
### Changed
- 更新飆網超省連結 @esbb48
- 調整追蹤碼觸發時機、多帶的參數維度 @esbb48

### Fixed
- 搜尋切換分頁時資料會被初始 @esbb48

## 1.0.2 - 2017-07-03
### Added
- 加回舊有的你可能喜歡 @esbb48

### Changed
- 防呆與避免重複呼叫 api @esbb48

## 1.0.1 - 2017-06-19
### Added
- 加入 CHANGELOG 文件做紀錄 @esbb48
- 第一個版本正式上線 @esbb48
