// Ledger – Grundbuch der AbilityChain

export class Ledger {
  constructor() {
    this.state = new Map();        // address → { xp, time, balance }
    this.blocks = [];              // vollständige BOxBlock-Kette
  }

  initAddress(addr) {
    if (!this.state.has(addr)) {
      this.state.set(addr, { xp: 0, time: 0, balance: 0 });
    }
  }

  applyTransaction(tx) {
    this.initAddress(tx.from);
    this.initAddress(tx.to);

    const from = this.state.get(tx.from);
    const to = this.state.get(tx.to);

    if (from.balance < tx.amount) return false;

    from.balance -= tx.amount;
    to.balance += tx.amount;

    return true;
  }

  applyBlock(block) {
    for (const tx of block.transactions) {
      this.applyTransaction(tx);
    }
    this.blocks.push(block);
  }

  getState(addr) {
    return this.state.get(addr) || null;
  }
}
