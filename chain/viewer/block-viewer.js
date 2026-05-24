// Block Viewer – zeigt Details eines Blocks

import { renderTxDetails } from "./tx-viewer.js";

export function renderBlockDetails(block) {
  const txs = block.transactions.map(renderTxDetails).join("");

  return `
    <div class="block-details">
      <h2>Block #${block.index}</h2>
      <p><strong>Hash:</strong> ${block.hash}</p>
      <p><strong>Vorheriger Hash:</strong> ${block.prevHash}</p>
      <p><strong>Timestamp:</strong> ${new Date(block.timestamp).toLocaleString()}</p>

      <h3>Transaktionen</h3>
      ${txs}
    </div>
  `;
}
