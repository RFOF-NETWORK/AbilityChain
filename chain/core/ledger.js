// Ledger – Grundbuch der AbilityChain (Optimiert für Explorer & Wallet)

export class Ledger {
  constructor() {
    this.state = new Map();        // address → { xp, time, balance, identity }
    this.blocks = [];              // vollständige BOxBlock-Kette
    this.txIndex = new Map();      // txHash → txData (für schnellen Explorer-Zugriff)
  }

  // Initialisiert Adresse mit PZQQET-Identitäts-Anker
  initAddress(addr, identity = null) {
    if (!this.state.has(addr)) {
      this.state.set(addr, { 
        xp: 0, 
        time: 0, 
        balance: 0,
        identity: identity // PZQQET-Masken-Anker
      });
    }
  }

  // Validiert und führt Transaktion aus
  applyTransaction(tx) {
    if (tx.from === tx.to) return false; // Kein Self-Transfer

    this.initAddress(tx.from);
    this.initAddress(tx.to);

    const from = this.state.get(tx.from);
    const to = this.state.get(tx.to);

    if (from.balance < tx.amount) return false;

    from.balance -= tx.amount;
    to.balance += tx.amount;

    // Indexierung für den Explorer
    this.txIndex.set(tx.hash || Math.random().toString(36), tx);

    return true;
  }

  // Wendet einen Block an und aktualisiert den Ledger
  applyBlock(block) {
    for (const tx of block.transactions) {
      if (!this.applyTransaction(tx)) continue;
    }
    this.blocks.push(block);
  }

  // Explorer-Hilfe: Transaktion finden
  getTransaction(txHash) {
    return this.txIndex.get(txHash) || null;
  }

  // Wallet-Hilfe: Status abrufen
  getState(addr) {
    return this.state.get(addr) || null;
  }
}
