# Launchwatch for X 🟢

This Chrome extension lets you **hover over Solana memecoin tickers** on **X**, and instantly see a Dexscreener link popup.

---

## 🚀 Features
- Detects `$TICKER` format in live tweets
- On hover, fetches real-time pair info from Dexscreener
- Displays a clickable floating link to view the chart

---

## 🛠 How to Install

1. Clone or download this repo locally

2. Open Chrome and go to:
   ```
   chrome://extensions
   ```

3. Enable **Developer Mode** (top right toggle)

4. Click **Load unpacked** and select the launchwatch folder with:
   - `manifest.json`
   - `content.js`
   - `styles.css`

5. Open [x.com](https://x.com), scroll posts with tickers

6. Hover over the ticker → green popup shows with chart link

---

## ⚠️ Notes
- Only works with **Solana** tickers listed on Dexscreener
- Dexscreener blocks iframe embeds, so the chart opens in a new tab
- If popup is hard to click, it stays briefly on hover-out to help

---

## 🔒 Permissions Used
- `activeTab`, `scripting` for content injection
- `https://*.x.com/*` to read tweets
- `https://api.dexscreener.com/*` to resolve tickers

---

## ✅ To-Do / Future Ideas
- Pin/favorite tokens in sidebar
- Multi-chain support (ETH, BSC)
- Theme settings

---

Built for degens, by degens 🧪