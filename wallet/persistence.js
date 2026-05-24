// Persistenz Engine – lokale Speicherung

export const db = {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  load(key, fallback = null) {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  }
};
