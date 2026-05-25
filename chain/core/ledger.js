// Ledger – Grundbuch der AbilityChain (Fraktal strukturiert)

export class Ledger {
  constructor(genesisHash) {
    this.state = new Map();
    this.genesisHash = genesisHash; // Der vertikale Anker
    
    // Horizontale Ströme
    this.streams = {
      TX: [],
      TIME: [],
      XP: []
    };
    
    this.txIndex = new Map();
  }

  // Initialisiert Adresse
  initAddress(addr, identity = null) {
    if (!this.state.has(addr)) {
      this.state.set(addr, { xp: 0, time: 0, balance: 0, identity });
    }
  }

  applyTransaction(tx) {
    if (tx.from === tx.to) return false;
    this.initAddress(tx.from);
    this.initAddress(tx.to);

    const from = this.state.get(tx.from);
    const to = this.state.get(tx.to);

    if (from.balance < tx.amount) return false;
    from.balance -= tx.amount;
    to.balance += tx.amount;

    this.txIndex.set(tx.hash, tx);
    return true;
  }

  // Wendet Block auf den jeweiligen Strom an
  applyBlock(block) {
    // Validierung der fraktalen Integrität
    if (block.fractalRoot !== this.genesisHash) return false;

    if (block.streamType === 'TX') {
      for (const tx of block.transactions) this.applyTransaction(tx);
    }
    
    // Strom-Einsortierung
    if (this.streams[block.streamType]) {
      this.streams[block.streamType].push(block);
    }
  }

  getStream(type) {
    return this.streams[type] || [];
  }

  getState(addr) {
    return this.state.get(addr) || null;
  }
}
