import { execSync } from "child_process";

execSync("git fetch upstream");
execSync("git merge upstream/main --no-edit");
execSync("git push");
