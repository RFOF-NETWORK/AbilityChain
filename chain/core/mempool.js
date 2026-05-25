// Mempool – unbestätigte Transaktionen (Validiert & Sicher)

import { Validators } from "./validators.js";

export class Mempool {
  constructor() {
    this.pool = [];
    this.txHashes = new Set(); // Dubletten-Schutz
  }

  // Fügt eine TX nur hinzu, wenn sie valide ist und noch nicht existiert
  add(tx) {
    if (!Validators.tx(tx)) {
      console.warn("Mempool: Ungültige Transaktion abgelehnt");
      return false;
    }

    if (this.txHashes.has(tx.hash)) {
      return false; // Dublette vermeiden
    }

    this.pool.push(tx);
    this.txHashes.add(tx.hash);
    return true;
  }

  // Gibt alle ausstehenden TXs für den Explorer zurück
  getPendingTransactions() {
    return [...this.pool];
  }

  // Leert den Pool für die Block-Erstellung
  drain() {
    const txs = [...this.pool];
    this.pool = [];
    this.txHashes.clear();
    return txs;
  }

  size() {
    return this.pool.length;
  }
}
