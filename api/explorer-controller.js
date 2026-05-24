// Explorer-Controller – Chain-Daten abrufen & maskieren

import { Encoding } from "../chain/protocol/encoding.js";

export async function fetchChainSnapshot() {
  const res = await fetch("/public/chain.json").catch(() => null);
  if (!res) return { blocks: [], txs: [] };
  return await res.json();
}

export function maskBlockHashWithGenesis(blockHash, genesisMask) {
  return blockHash.slice(0, 32) + genesisMask.slice(0, 32);
}
