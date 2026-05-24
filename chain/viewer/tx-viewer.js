// TX Viewer – zeigt Details einer einzelnen Transaktion

export function renderTxDetails(tx) {
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
