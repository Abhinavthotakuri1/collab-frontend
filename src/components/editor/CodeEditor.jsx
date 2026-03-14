import Editor from "@monaco-editor/react";

function CodeEditor({ value, onChange, language }) {
  return (
    <Editor
      height="100%"
      width="100%"
      language={language || "javascript"}
      value={value}
      onChange={onChange}
      theme="vs-dark"
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        wordWrap: "on"
      }}
    />
  );
}

export default CodeEditor;