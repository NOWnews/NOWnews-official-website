# Change Log
[NOWnews-official-website](https://github.com/NOWnews/NOWnews-official-website/issues) 的所有改變將在此 CHANGELOG 文件中記錄。

格式基於 [Keep a Changelog](http://keepachangelog.com/zh-CN/1.0.0/)
而項目則基於 [Semantic Versioning](http://semver.org/lang/zh-TW/).

## 1.0.10 - 2017-07-17
### Changed
- 調整 LBS 使用者拒絕提供地位置的提示 ＠appleoxxo
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
