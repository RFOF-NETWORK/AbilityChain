export function parseQC(content) {
  return content.split("\n").filter(Boolean);
}
