export function renderTxHistory(txs) {
  return `
    <div class="tx-history" id="tx-history">
      <h2>Transaktionen</h2>

      ${txs
        .map(
          tx => `
        <div class="tx" data-hash="${tx.hash}">
          <p><strong>${tx.from}</strong> → <strong>${tx.to}</strong></p>
          <p>${tx.amount} AC</p>
          ${tx.hash ? `<p class="tx-hash">Hash: ${tx.hash}</p>` : ""}
          ${tx.timestamp ? `<p class="tx-time">${new Date(tx.timestamp).toLocaleString("de-DE")}</p>` : ""}
        </div>
      `
        )
        .join("")}
    </div>
  `;
}
