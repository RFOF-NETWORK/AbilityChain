// Zeit-Token Engine – 1 XP = 1 Zeit

export function getTimeToken() {
  return Math.floor(Date.now() / 1000);
}

export function convertXPtoTime(xp) {
  return xp;
}
