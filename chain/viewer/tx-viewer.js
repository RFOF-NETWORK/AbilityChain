// chain/viewer/tx-viewer.js – Transaktions-Viewer (PZQQET-0 konform)
import { Schema } from "../protocol/schema.js";

export function renderTxDetails(tx) {
  // Validierung gegen das PZQQET-Schema
  if (!Schema.validate('Transaction', tx)) {
    return `<div class="error">Ungültige Transaktionsstruktur.</div>`;
  }

  return `
    <div class="tx-details">
      <h2>Transaktion</h2>
      <p><strong>Von:</strong> ${tx.from}</p>
      <p><strong>An:</strong> ${tx.to}</p>
      <p><strong>Betrag:</strong> ${tx.amount}</p>
      <p><strong>Hash:</strong> ${tx.hash || "n/a"}</p>
    </div>
  `;
}
