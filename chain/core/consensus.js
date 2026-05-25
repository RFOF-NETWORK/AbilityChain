// Konsens – Fraktale Block-Erzeugung (Drei-Strom-Modell)

import { Block } from "./blocks.js";

export class Consensus {
  constructor(ledger, mempool, genesisHash) {
    this.ledger = ledger;
    this.mempool = mempool;
    this.genesisHash = genesisHash; // Der vertikale Anker
  }

  // Erstellt einen Block für einen spezifischen Strom
  createNextBlock(streamType) {
    const data = this.mempool.drain(streamType);
    if (data.length === 0) return null; // Keine leeren Blöcke erzeugen

    // Hole den letzten Block des spezifischen Stroms
    const stream = this.ledger.getStream(streamType);
    const prev = stream.length > 0 ? stream[stream.length - 1] : null;

    // Instanziierung des fraktalen Blocks
    const block = new Block(
      prev ? prev.index + 1 : 0,
      prev ? prev.hash : "GENESIS",
      data,
      streamType,
      this.genesisHash // Fraktaler Anker
    );

    // Validierung und Anwendung
    if (this.ledger.applyBlock(block)) {
      return block;
    }
    
    return null;
  }
}
