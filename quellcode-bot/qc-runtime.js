export function createRuntime(context) {
  return {
    event: context.event,
    repo: context.repo,
    actor: context.actor
  };
}
