// Block-Struktur der AbilityChain

import crypto from "crypto";

export class Block {
  constructor(index, prevHash, transactions, timestamp = Date.now()) {
    this.index = index;
    this.prevHash = prevHash;
    this.transactions = transactions;
    this.timestamp = timestamp;
    this.hash = this.computeHash();
  }

  computeHash() {
    return crypto
      .createHash("sha256")
      .update(
        this.index +
        this.prevHash +
        JSON.stringify(this.transactions) +
        this.timestamp
      )
      .digest("hex");
  }
}
