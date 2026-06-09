// chain/protocol/network.js – Netzwerk-Schicht (PZQQET-0 konform)
import { Encoding } from './encoding.js';

export class Network {
  constructor() {
    this.peers = [];
  }

  connect(peer) {
    this.peers.push(peer);
  }

  // Broadcast nutzt nun zwingend den PZQQET-0 Standard für alle Datenpakete
  broadcast(msg) {
    const encodedMsg = Encoding.encode(msg);
    for (const peer of this.peers) {
      peer.receive(encodedMsg);
    }
  }
}
