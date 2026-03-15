import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import CodeEditor from "../components/editor/CodeEditor";
import EditorToolbar from "../components/editor/EditorToolbar";
import Terminal from "../components/terminal/Terminal";
import ActiveUsers from "../components/collaboration/ActiveUsers";
import ChatPanel from "../components/collaboration/ChatPanel";
import { useWebSocket } from "../hooks/useWebSocket";
import { runCodeApi } from "../api/fileApi";
import { getCode, saveCode } from "../api/roomApi";
import { clearUser } from "../store/authSlice";

function Room() {
  const { id }                  = useParams();
  const navigate                = useNavigate();
  const dispatch                = useDispatch();
  const user                    = useSelector((s) => s.auth.user);
  const username                = user?.username || user?.email || "Guest";
  const [code, setCode]         = useState("// Start coding here...");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput]     = useState("");
  const [stdin, setStdin]       = useState("");
  const [userList, setUserList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [running, setRunning]   = useState(false);
  const saveTimer               = useRef(null);

  useEffect(() => {
    if (!id) return;
    getCode(decodeURIComponent(id))
      .then((res) => {
        if (res.data && res.data.trim() !== "") setCode(res.data);
      })
      .catch(() => {});
  }, [id]);

  const { send } = useWebSocket(id, username, (data) => {
    if (data.type === "code")  setCode(data.code);
    if (data.type === "users") setUserList(Array.from(data.data || []));
    if (data.type === "chat")  setMessages((prev) => [
      ...prev, { user: data.user, text: data.text }
    ]);
  });

  const handleCodeChange = (value) => {
    setCode(value);
    send({ type: "code", code: value, user: username });
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveCode(decodeURIComponent(id), value).catch(() => {});
    }, 2000);
  };

  const handleRun = async () => {
    setRunning(true);
    setOutput("Running...");
    try {
      const result = await runCodeApi(code, language, stdin);
      setOutput(result || "(no output)");
    } catch (e) {
      setOutput("Error: " + e.message);
    } finally {
      setRunning(false);
    }
  };

  // Fix: only send — WebSocket broadcasts back to all including sender
  const handleSendChat = (text) => {
    send({ type: "chat", user: username, text });
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">⚡ CollabCode</div>
        <div className="room-info">📁 {decodeURIComponent(id)}</div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div className="room-info">👤 {username}</div>
          <button
            onClick={handleLogout}
            style={{
              padding: "5px 12px",
              background: "transparent",
              border: "1px solid #334155",
              borderRadius: "6px",
              color: "#94a3b8",
              cursor: "pointer",
              fontSize: "12px",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#ef4444";
              e.target.style.color = "white";
              e.target.style.borderColor = "#ef4444";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#94a3b8";
              e.target.style.borderColor = "#334155";
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className={showChat ? "main with-chat" : "main no-chat"}>
        <ActiveUsers
          users={userList}
          showChat={showChat}
          setShowChat={setShowChat}
        />

        <EditorToolbar
          language={language}
          onLanguageChange={setLanguage}
          onRun={handleRun}
          running={running}
        />

        <div className="editor">
          <CodeEditor
            value={code}
            onChange={handleCodeChange}
            language={language}
          />
        </div>

        <div className="output">
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            marginBottom: "8px", paddingBottom: "8px",
            borderBottom: "1px solid #1e293b"
          }}>
            <span style={{ fontSize: "11px", color: "#64748b", whiteSpace: "nowrap" }}>
              stdin:
            </span>
            <input
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              placeholder="Enter input for your program..."
              style={{
                flex: 1, padding: "4px 8px", background: "#0f172a",
                border: "1px solid #1e293b", borderRadius: "4px",
                color: "#a3e635", fontSize: "12px",
                fontFamily: "'Cascadia Code', monospace", outline: "none"
              }}
            />
          </div>
          <Terminal output={output} />
        </div>

        {showChat && (
          <ChatPanel messages={messages} onSend={handleSendChat} />
        )}
      </div>
    </>
  );
}

export default Room;