// Encoding – Serialisierung für Netzwerk & Storage

export const Encoding = {
  encode(obj) {
    return JSON.stringify(obj);
  },

  decode(str) {
    try {
      return JSON.parse(str);
    } catch {
      return null;
    }
  }
};
