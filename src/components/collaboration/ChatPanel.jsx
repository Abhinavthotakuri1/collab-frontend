import { useState, useRef, useEffect } from "react";

function ChatPanel({ messages, onSend }) {
  const [text, setText] = useState("");
  const bottomRef       = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <div className="chat">
      <div style={{
        padding: "12px 16px", borderBottom: "1px solid #1e293b",
        fontSize: "13px", color: "#38bdf8", letterSpacing: "1px"
      }}>
        CHAT
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div style={{ color: "#475569", fontSize: "12px", textAlign: "center", marginTop: "20px" }}>
            No messages yet
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: "10px" }}>
            <div style={{ fontSize: "11px", color: "#38bdf8", marginBottom: "2px" }}>{m.user}</div>
            <div style={{ fontSize: "13px", color: "#cbd5e1", wordBreak: "break-word" }}>{m.text}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          style={{
            background: "#0f172a", border: "1px solid #1e293b",
            color: "white", padding: "8px", borderRadius: "6px 0 0 6px",
            fontSize: "13px", outline: "none"
          }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: "8px 14px", background: "#0ea5e9",
            border: "none", borderRadius: "0 6px 6px 0",
            color: "white", cursor: "pointer", fontSize: "14px"
          }}
        >
          ↑
        </button>
      </div>
    </div>
  );
}

export default ChatPanel;