import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import CodeEditor from "../components/editor/CodeEditor";
import EditorToolbar from "../components/editor/EditorToolbar";
import Terminal from "../components/terminal/Terminal";
import ActiveUsers from "../components/collaboration/ActiveUsers";
import ChatPanel from "../components/collaboration/ChatPanel";
import { useWebSocket } from "../hooks/useWebSocket";
import { runCodeApi } from "../api/fileApi";

function Room() {
  const { id }                  = useParams();
  const user                    = useSelector((s) => s.auth.user);
  const username                = user?.username || user?.email || "Guest";
  const [code, setCode]         = useState("// Start coding here...");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput]     = useState("");
  const [users, setUsers]       = useState([username]);
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [running, setRunning]   = useState(false);

  const { send } = useWebSocket(id, username, (data) => {
    if (data.type === "code")  setCode(data.code);
    if (data.type === "users") setUsers(Array.from(data.data || []));
    if (data.type === "chat")  setMessages((prev) => [...prev, { user: data.user, text: data.text }]);
  });

  const handleCodeChange = (value) => {
    setCode(value);
    send({ type: "code", code: value, user: username });
  };

  const handleRun = async () => {
    setRunning(true);
    setOutput("Running...");
    try {
      const result = await runCodeApi(code, language);
      setOutput(result || "(no output)");
    } catch (e) {
      setOutput("Error: " + e.message);
    } finally {
      setRunning(false);
    }
  };

  const handleSendChat = (text) => {
    setMessages((prev) => [...prev, { user: username, text }]);
    send({ type: "chat", user: username, text });
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">⚡ CollabCode</div>
        <div className="room-info">Room: {decodeURIComponent(id)}</div>
        <div className="room-info">👤 {username}</div>
      </nav>

      {/* MAIN GRID */}
      <div className={showChat ? "main with-chat" : "main no-chat"}>

        {/* LEFT — USERS */}
        <ActiveUsers
          users={users}
          showChat={showChat}
          setShowChat={setShowChat}
        />

        {/* TOOLBAR */}
        <EditorToolbar
          language={language}
          onLanguageChange={setLanguage}
          onRun={handleRun}
          running={running}
        />

        {/* EDITOR */}
        <div className="editor">
          <CodeEditor
            value={code}
            onChange={handleCodeChange}
            language={language}
          />
        </div>

        {/* OUTPUT */}
        <div className="output">
          <Terminal output={output} />
        </div>

        {/* CHAT — only when open */}
        {showChat && (
          <ChatPanel messages={messages} onSend={handleSendChat} />
        )}

      </div>
    </>
  );
}

export default Room;