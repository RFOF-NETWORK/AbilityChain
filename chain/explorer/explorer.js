// AbilityChain Explorer – zeigt Blöcke & Transaktionen

async function fetchChain() {
  const res = await fetch("/public/chain.json").catch(() => null);
  if (!res) return { blocks: [], txs: [] };
  return await res.json();
}

function renderBlock(block) {
  return `
    <div class="block">
      <h3>Block #${block.index}</h3>
      <p>Hash: ${block.hash}</p>
      <p>TXs: ${block.transactions.length}</p>
    </div>
  `;
}

function renderTx(tx) {
  return `
    <div class="tx">
      <p><strong>${tx.from}</strong> → <strong>${tx.to}</strong></p>
      <p>Amount: ${tx.amount}</p>
    </div>
  `;
}

async function update() {
  const chain = await fetchChain();

  document.getElementById("latest-blocks").innerHTML =
    chain.blocks.map(renderBlock).join("");

  document.getElementById("latest-txs").innerHTML =
    chain.txs.map(renderTx).join("");
}

update();
setInterval(update, 2000);
