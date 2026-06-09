// chain/viewer/block-viewer.js – Block Viewer (PZQQET-0 Standard konform)
import { renderTxDetails } from "./tx-viewer.js";
import { Schema } from "../protocol/schema.js"; // Import zur Validierung

export function renderBlockDetails(block) {
  // Integrierte Validierung vor dem Rendern
  if (!Schema.validate('Block', block)) {
    return `<div class="error">Fehler: Block-Datenstruktur nicht PZQQET-0 konform.</div>`;
  }

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
