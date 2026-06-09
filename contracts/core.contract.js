export async function validatePR({ author, commit, workflows }) {
  return {
    author,
    commit,
    workflows,
    approved: workflows.every(w => w.status === "success")
  };
}
