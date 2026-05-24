// Schema-Definitionen der AbilityChain

export const Schema = {
  Transaction: {
    from: "string",
    to: "string",
    amount: "number"
  },

  Block: {
    index: "number",
    prevHash: "string",
    transactions: "array",
    timestamp: "number"
  }
};
