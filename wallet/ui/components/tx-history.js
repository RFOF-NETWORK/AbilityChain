export function renderTxHistory(txs) {
  return `
    <div class="tx-history">
      <h2>Transaktionen</h2>
      ${txs
        .map(
          tx => `
        <div class="tx">
          <p>${tx.from} → ${tx.to}</p>
          <p>${tx.amount} AC</p>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}
