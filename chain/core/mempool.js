// Mempool – Fraktale Drei-Strom-Validierung (TX, TIME, XP)

import { Validators } from "./validators.js";

export class Mempool {
  constructor() {
    this.pools = {
      TX: [],
      TIME: [],
      XP: []
    };
    this.txHashes = new Set(); // Globaler Dubletten-Schutz
  }

  // Fügt eine Nachricht (TX, TIME oder XP) zum passenden Strom-Pool hinzu
  add(data, streamType = 'TX') {
    if (!this.pools[streamType]) return false;

    // Validierung spezifisch für den Strom-Typ
    if (!Validators.validate(data, streamType)) {
      console.warn(`Mempool: Ungültige Daten für Strom ${streamType} abgelehnt`);
      return false;
    }

    if (this.txHashes.has(data.hash)) return false;

    this.pools[streamType].push(data);
    this.txHashes.add(data.hash);
    return true;
  }

  // Gibt ausstehende Daten für einen spezifischen Strom zurück
  getPending(streamType) {
    return [...(this.pools[streamType] || [])];
  }

  // Leert gezielt nur einen Strom-Pool für die Block-Erstellung
  drain(streamType) {
    if (!this.pools[streamType]) return [];
    
    const items = [...this.pools[streamType]];
    this.pools[streamType] = [];
    
    // Entferne Hashes aus dem globalen Index
    items.forEach(item => this.txHashes.delete(item.hash));
    return items;
  }

  size(streamType = 'TX') {
    return this.pools[streamType] ? this.pools[streamType].length : 0;
  }
}
