// Validatoren für fraktale Ströme (TX, TIME, XP)

export const Validators = {
  // Zentrale Validierungs-Schnittstelle für Daten-Objekte
  validate(data, streamType) {
    switch (streamType) {
      case 'TX': return this.tx(data);
      case 'TIME': return this.time(data);
      case 'XP': return this.xp(data);
      default: return false;
    }
  },

  tx(tx) {
    return (
      typeof tx.from === "string" &&
      typeof tx.to === "string" &&
      typeof tx.amount === "number" &&
      tx.amount > 0 &&
      typeof tx.hash === "string"
    );
  },

  time(timeData) {
    return (
      typeof timeData.timestamp === "number" &&
      typeof timeData.precision === "string" // z.B. "ns", "µs", "ms"
    );
  },

  xp(xpData) {
    return (
      typeof xpData.miner === "string" &&
      typeof xpData.points === "number" &&
      xpData.points > 0
    );
  },

  // Validierung für die neuen fraktalen Block-Strukturen
  block(block) {
    return (
      typeof block.index === "number" &&
      typeof block.prevHash === "string" &&
      typeof block.streamType === "string" &&
      typeof block.fractalRoot === "string" &&
      Array.isArray(block.transactions)
    );
  }
};
