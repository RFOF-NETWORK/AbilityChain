// chain/protocol/encoding.js
export const Encoding = {
  encode(obj) {
    if (obj === null || typeof obj !== 'object') return JSON.stringify(obj);
    return JSON.stringify(obj, Object.keys(obj).sort());
  },

  decode(str) {
    try { return JSON.parse(str); } 
    catch { return null; }
  }
};
