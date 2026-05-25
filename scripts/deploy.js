import { execSync } from "node:child_process";

function run(cmd) {
  console.log("> " + cmd);
  execSync(cmd, { stdio: "inherit" });
}

run("npm run build");
console.log("Deployment build ready in /dist.");
