// Netzwerk-Schicht – lokal, später austauschbar gegen echtes P2P

export class Network {
  constructor() {
    this.peers = [];
  }

  connect(peer) {
    this.peers.push(peer);
  }

  broadcast(msg) {
    for (const peer of this.peers) {
      peer.receive(msg);
    }
  }
}
