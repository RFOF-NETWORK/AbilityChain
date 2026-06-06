const isFork = process.env.GITHUB_EVENT_NAME === "pull_request" &&
               process.env.GITHUB_HEAD_REPO_FORK === "true";

console.log(`FORK_DETECTED=${isFork}`);
