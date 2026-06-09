export function renderMiningBox(xp) {
  return `
    <div class="mining-box" id="mining-box">
      <h2>XP Mining</h2>
      <p class="xp-amount">XP: ${xp}</p>

      <div class="mining-status">
        <div id="mining-progress" class="progress-bar"></div>
      </div>

      <button id="mine">Tipp‑Mining starten</button>
    </div>
  `;
}
