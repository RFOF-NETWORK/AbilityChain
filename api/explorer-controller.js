// api/explorer-controller.js – Explorer-Controller (PZQQET-0 konform)
import { Encoding } from "../chain/protocol/encoding.js";

export async function fetchChainSnapshot() {
  const res = await fetch("/public/chain.json").catch(() => null);
  if (!res) return { streams: { TX: [], TIME: [], XP: [] } };
  
  // Nutzung des deterministischen Encodings statt Standard-JSON
  const rawData = await res.text();
  return Encoding.decode(rawData);
}

export function maskBlockHashWithGenesis(blockHash, genesisMask) {
  // Die Maskierung bleibt erhalten als Teil der visuellen Identität
  return blockHash.slice(0, 32) + genesisMask.slice(0, 32);
}
