export function runQC(qcFile, context) {
  return {
    status: context.repo.isFork
      ? "fork"
      : context.repo.hasExtension
      ? "extension_ready"
      : context.event === "pull_request"
      ? "pr_ready"
      : "original_ready",

    message:
      context.repo.isFork
        ? "Fork validated. You may now build your own project."
        : context.repo.hasExtension
        ? "Extension ready. Your project is successfully deployed."
        : context.event === "pull_request"
        ? "All workflows green. You may now open a Pull Request."
        : "All checks passed. You may now improve the original repository."
  };
}
