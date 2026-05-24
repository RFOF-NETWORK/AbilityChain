// Validatoren für Transaktionen und Blöcke

export const Validators = {
  tx(tx) {
    return (
      typeof tx.from === "string" &&
      typeof tx.to === "string" &&
      typeof tx.amount === "number" &&
      tx.amount >= 0
    );
  },

  block(block) {
    return (
      typeof block.index === "number" &&
      typeof block.prevHash === "string" &&
      Array.isArray(block.transactions)
    );
  }
};
