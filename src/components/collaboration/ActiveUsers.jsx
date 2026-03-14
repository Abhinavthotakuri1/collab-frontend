function ActiveUsers({ users, showChat, setShowChat }) {
  return (
    <div className="users">
      <h3 style={{ color: "#38bdf8", marginBottom: "16px", fontSize: "14px", letterSpacing: "1px" }}>
        USERS ({users.length})
      </h3>
      {users.map((u, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "6px 8px", borderRadius: "6px",
          background: "#0f172a", marginBottom: "6px", fontSize: "13px"
        }}>
          <span style={{
            width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0,
            background: `hsl(${i * 60}, 70%, 60%)`
          }} />
          {u}
        </div>
      ))}
      <button
        onClick={() => setShowChat(!showChat)}
        style={{
          width: "100%", marginTop: "16px", padding: "8px",
          background: showChat ? "#1e293b" : "#0ea5e9",
          border: "none", borderRadius: "6px", color: "white",
          cursor: "pointer", fontSize: "13px"
        }}
      >
        {showChat ? "✕ Hide Chat" : "💬 Chat"}
      </button>
    </div>
  );
}

export default ActiveUsers;