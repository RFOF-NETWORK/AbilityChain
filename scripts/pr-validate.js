import { validatePR } from "../contracts/core.contract.js";

const result = await validatePR({
  author: process.env.GITHUB_ACTOR,
  commit: process.env.GITHUB_SHA,
  workflows: [{ name: "ci", status: "success" }]
});

console.log("Smart Contract Result:", result);
