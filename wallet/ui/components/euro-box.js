export function renderEuroBox(euro) {
  const formatted = Number(euro).toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return `
    <div class="euro-box" id="euro-box">
      <h2>Fiat</h2>
      <p class="euro-amount">${formatted} €</p>
    </div>
  `;
}
