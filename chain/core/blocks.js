// Block-Struktur der AbilityChain (Fraktales Drei-Strom-Modell)

import crypto from "crypto";

export class Block {
  // streamType: 'TX', 'TIME', 'XP'
  constructor(index, prevHash, transactions, streamType, fractalRoot, timestamp = Date.now()) {
    this.index = index;
    this.prevHash = prevHash;
    this.transactions = transactions;
    this.streamType = streamType; // Neuer Strom-Indikator
    this.fractalRoot = fractalRoot; // Genesis-Hash als Anker
    this.timestamp = timestamp;
    this.version = "PZQQET-0";
    this.hash = this.computeHash();
  }

  computeHash() {
    const canonicalData = JSON.stringify({
      index: this.index,
      prevHash: this.prevHash,
      transactions: this.transactions,
      streamType: this.streamType,
      fractalRoot: this.fractalRoot,
      timestamp: this.timestamp,
      version: this.version
    }, Object.keys(this).sort());

    return crypto
      .createHash("sha256")
      .update(canonicalData)
      .digest("hex");
  }

  isValid(prevBlock) {
    if (this.index !== prevBlock.index + 1) return false;
    if (this.prevHash !== prevBlock.hash) return false;
    if (this.fractalRoot !== prevBlock.fractalRoot) return false;
    if (this.hash !== this.computeHash()) return false;
    return true;
  }
}
