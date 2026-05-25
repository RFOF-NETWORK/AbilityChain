// Block-Struktur der AbilityChain (Deterministisch & PZQQET-0 konform)

import crypto from "crypto";

export class Block {
  constructor(index, prevHash, transactions, timestamp = Date.now()) {
    this.index = index;
    this.prevHash = prevHash;
    this.transactions = transactions; // Erwartet Array von TXs
    this.timestamp = timestamp;
    this.version = "PZQQET-0";
    this.hash = this.computeHash();
  }

  // Erzeugt einen konsistenten, deterministischen Hash
  computeHash() {
    // Canonical JSON: Sortierung der Schlüssel verhindert Hash-Varianz
    const canonicalData = JSON.stringify({
      index: this.index,
      prevHash: this.prevHash,
      transactions: this.transactions,
      timestamp: this.timestamp,
      version: this.version
    }, Object.keys(this).sort());

    return crypto
      .createHash("sha256")
      .update(canonicalData)
      .digest("hex");
  }

  // Validiert den Block gegen den Vorgänger für den Explorer
  isValid(prevBlock) {
    if (this.index !== prevBlock.index + 1) return false;
    if (this.prevHash !== prevBlock.hash) return false;
    if (this.hash !== this.computeHash()) return false;
    return true;
  }
}
