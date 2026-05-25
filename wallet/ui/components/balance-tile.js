export function renderBalanceTile(balance) {
  const formatted = Number(balance).toLocaleString("de-DE");

  return `
    <div class="balance-tile" id="balance-tile">
      <h2>Balance</h2>
      <p class="balance-amount">${formatted} AC</p>
    </div>
  `;
}
