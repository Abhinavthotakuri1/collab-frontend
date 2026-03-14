function EditorToolbar({ language, onLanguageChange, onRun, running }) {
  const languages = ["javascript", "python", "java", "cpp", "go", "rust"];

  return (
    <div className="toolbar">
      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        style={{
          padding: "5px 10px", background: "#0f172a", color: "white",
          border: "1px solid #334155", borderRadius: "6px",
          fontSize: "13px", marginRight: "10px", cursor: "pointer"
        }}
      >
        {languages.map((l) => (
          <option key={l} value={l}>{l}</option>
        ))}
      </select>

      <button
        onClick={onRun}
        disabled={running}
        style={{
          padding: "5px 18px",
          background: running ? "#334155" : "#22c55e",
          border: "none", borderRadius: "6px", color: "white",
          cursor: running ? "not-allowed" : "pointer",
          fontSize: "13px", fontWeight: "500"
        }}
      >
        {running ? "⏳ Running..." : "▶ Run"}
      </button>
    </div>
  );
}

export default EditorToolbar;