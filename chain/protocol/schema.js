// chain/protocol/schema.js – PZQQET-0 Validierungs-Schema
import { Encoding } from './encoding.js';

export const Schema = {
  Transaction: { from: "string", to: "string", amount: "number" },
  Block: { index: "number", prevHash: "string", transactions: "array", timestamp: "number" },

  // Zentrale Validierungs-Logik für den PZQQET-Standard
  validate(type, data) {
    const definition = this[type];
    if (!definition) return false;

    return Object.keys(definition).every(key => {
      const expectedType = definition[key];
      const value = data[key];
      // Typ-Prüfung gemäß PZQQET-Standard
      return typeof value === expectedType || (expectedType === "array" && Array.isArray(value));
    });
  }
};
