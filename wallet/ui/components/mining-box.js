export function renderMiningBox(xp) {
  return `
    <div class="mining-box">
      <h2>XP Mining</h2>
      <p>XP: ${xp}</p>
      <button id="mine">Tipp-Mining</button>
    </div>
  `;
}
