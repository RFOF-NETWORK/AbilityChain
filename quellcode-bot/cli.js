import { runQC } from "./qc-engine.js";
import fs from "fs";

async function main() {
  const context = {
    event: process.env.GITHUB_EVENT_NAME,
    actor: process.env.GITHUB_ACTOR,
    repo: {
      isFork: process.env.GITHUB_HEAD_REPO_FORK === "true",
      isOriginal: process.env.GITHUB_REPOSITORY_OWNER === "AbilityChain",
      hasExtension: fs.existsSync("extension.config.json")
    }
  };

  const qcFile = fs.readFileSync("./abilitychain/ability_chain.qc", "utf8");
  const result = runQC(qcFile, context);

  fs.writeFileSync("qc-output.json", JSON.stringify(result, null, 2));
  console.log("QC evaluation complete.");
}

main();
