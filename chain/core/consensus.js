// Konsens – deterministisch, kein Mining, 0ms GoldenChain-Style

export class Consensus {
  constructor(ledger, mempool) {
    this.ledger = ledger;
    this.mempool = mempool;
  }

  createNextBlock() {
    const txs = this.mempool.drain();
    const prev = this.ledger.blocks[this.ledger.blocks.length - 1];

    const block = {
      index: prev ? prev.index + 1 : 0,
      prevHash: prev ? prev.hash : "GENESIS",
      transactions: txs,
      timestamp: Date.now()
    };

    this.ledger.applyBlock(block);
    return block;
  }
}
