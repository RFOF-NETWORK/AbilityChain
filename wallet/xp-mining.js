// XP Mining – Tipp-Mining Engine

export function startXPMining(onUpdate) {
  let xp = 0;
  let last = Date.now();

  document.addEventListener("click", () => {
    const now = Date.now();
    const delta = now - last;
    last = now;

    const gained = Math.floor(delta / 100);
    xp += gained;

    onUpdate(xp);
  });
}
