export const languageMap = {
  js: "javascript",
  ts: "typescript",
  py: "python",
  java: "java",
  cpp: "cpp",
  go: "go",
  rs: "rust",
  cs: "csharp",
  html: "html",
  css: "css"
};

export function getLanguageFromFilename(filename) {
  const ext = filename.split(".").pop();
  return languageMap[ext] || "plaintext";
}