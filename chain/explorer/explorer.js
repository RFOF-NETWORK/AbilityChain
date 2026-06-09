// AbilityChain Explorer – Fraktale Ansicht (TX, TIME, XP)

async function fetchChain() {
  const res = await fetch("/public/chain.json").catch(() => null);
  if (!res) return { streams: { TX: [], TIME: [], XP: [] } };
  return await res.json();
}

function renderBlock(block) {
  return `
    <div class="block stream-${block.streamType.toLowerCase()}">
      <h4>${block.streamType} #<small>${block.index}</small></h4>
      <small>Hash: ${block.hash.substring(0, 8)}...</small>
      <p>Items: ${block.transactions.length}</p>
    </div>
  `;
}

async function update() {
  const data = await fetchChain();
  const container = document.getElementById("explorer-root");

  // Rendert jeden Strom in einen eigenen Bereich
  container.innerHTML = `
    <section>
      <h2>TX Strom</h2>
      <div id="tx-stream">${data.streams.TX.map(renderBlock).join("")}</div>
    </section>
    <section>
      <h2>TIME Strom</h2>
      <div id="time-stream">${data.streams.TIME.map(renderBlock).join("")}</div>
    </section>
    <section>
      <h2>XP Strom</h2>
      <div id="xp-stream">${data.streams.XP.map(renderBlock).join("")}</div>
    </section>
  `;
}

update();
setInterval(update, 2000);
