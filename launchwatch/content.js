const regex = /\$(\w{2,})/g;
const tokenCache = {};
console.log("🔥 DexHover content script loaded");

async function getPairAddress(ticker) {
    if (tokenCache[ticker]) return tokenCache[ticker];
    try {
      const res = await fetch(`https://api.dexscreener.com/latest/dex/search?q=${ticker}`);
      const data = await res.json();
      const match = data.pairs.find(
        (pair) =>
          pair.chainId === "solana" &&
          pair.baseToken.symbol.toLowerCase() === ticker.toLowerCase()
      );
      if (match) {
        tokenCache[ticker] = match.pairAddress;
        return match.pairAddress;
      }
    } catch (e) {
      console.error("Dexscreener API error", e);
    }
    return null;
  }

  const injectChart = (pairAddress, rect) => {
    const existing = document.getElementById("dex-hover-popup");
    if (existing) existing.remove();
    if (!pairAddress) return;
  
    const popup = document.createElement("div");
    popup.id = "dex-hover-popup";
    popup.style.position = "absolute";
    popup.style.top = `${rect.bottom + window.scrollY + 6}px`;
    popup.style.left = `${rect.left}px`;
    popup.style.padding = "8px 12px";
    popup.style.backgroundColor = "#0f0f0f";
    popup.style.color = "#22c55e";
    popup.style.border = "2px solid #22c55e";
    popup.style.borderRadius = "8px";
    popup.style.zIndex = 9999;
    popup.style.fontSize = "14px";
    popup.style.fontFamily = "monospace";
    popup.textContent = "Open in Dexscreener →";
    popup.style.cursor = "pointer";
  
    popup.onmouseenter = () => clearTimeout(popup.dismissTimer);
    popup.onmouseleave = () => {
      popup.dismissTimer = setTimeout(() => {
        popup.remove();
      }, 1000);
    };
  
    popup.onclick = () => {
      window.open(`https://dexscreener.com/solana/${pairAddress}`, "_blank");
    };
  
    document.body.appendChild(popup);
  };
  
  const cleanChart = () => {
    const frame = document.getElementById("dex-hover-popup");
    if (frame) {
      frame.dismissTimer = setTimeout(() => frame.remove(), 300);
    }
  };

const handleMouseOver = async (e) => {
  const tokenMatch = e.target.textContent.match(/^\$(\w{2,})$/);
  if (tokenMatch) {
    const token = tokenMatch[1];
    const rect = e.target.getBoundingClientRect();
    const pairAddress = await getPairAddress(token);
    injectChart(pairAddress, rect);
  }
};

const handleMouseOut = () => cleanChart();

const observeMouseoverTargets = () => document.addEventListener("mouseover", async (e) => {
    const text = e.target?.textContent?.trim();
    if (!text) return;
  
    const match = text.match(/^\$(\w{2,})$/);
    if (match) {
      const token = match[1];
      console.log("🟢 Hovering on token:", token);
  
      const rect = e.target.getBoundingClientRect();
      const pairAddress = await getPairAddress(token);
      console.log("📈 Pair address:", pairAddress);
      injectChart(pairAddress, rect);
    }
  });
  
  document.addEventListener("mouseout", (e) => {
    cleanChart();
  });
  

observeMouseoverTargets();