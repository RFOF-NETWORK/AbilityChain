// Mempool – unbestätigte Transaktionen

export class Mempool {
  constructor() {
    this.pool = [];
  }

  add(tx) {
    this.pool.push(tx);
  }

  drain() {
    const txs = [...this.pool];
    this.pool = [];
    return txs;
  }

  size() {
    return this.pool.length;
  }
}
