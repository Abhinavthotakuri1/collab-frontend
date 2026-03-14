import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import CodeEditor from "./components/editor/CodeEditor";
import EditorToolbar from "./components/editor/EditorToolbar";
import Terminal from "./components/terminal/Terminal";
import OutputPanel from "./components/terminal/OutputPanel";
import ActiveUsers from "./components/collaboration/ActiveUsers";
import ChatPanel from "./components/collaboration/ChatPanel";

import { useWebSocket } from "./hooks/useWebSocket";
import { runCodeApi } from "./api/fileApi";
import { getCode, saveCode } from "./api/roomApi";

function App() {
  const { id } = useParams();
  const user = useSelector((s) => s.auth.user);

  const username = user?.username || user?.email || "Guest";

  const [code, setCode] = useState("// Start coding here...");
  const [language, setLanguage] = useState("javascript");

  const [stdout, setStdout] = useState("");
  const [stderr, setStderr] = useState("");
  const [exitCode, setExitCode] = useState(undefined);

  const [users, setUsers] = useState([username]);
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [running, setRunning] = useState(false);

  const saveTimer = useRef(null);

  useEffect(() => {
    getCode(decodeURIComponent(id))
      .then((res) => {
        if (res.data && res.data.trim() !== "") {
          setCode(res.data);
        }
      })
      .catch(() => {});
  }, [id]);

  const { send } = useWebSocket(id, username, (data) => {
    if (data.type === "code") setCode(data.code);
    if (data.type === "users") setUsers(Array.from(data.data || []));
    if (data.type === "chat")
      setMessages((prev) => [...prev, { user: data.user, text: data.text }]);
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

    setStdout("");
    setStderr("");
    setExitCode(undefined);

    try {
      const result = await runCodeApi(code, language);

      if (result) {
        setStdout(result.stdout || "");
        setStderr(result.stderr || "");
        setExitCode(result.exitCode);
      }
    } catch (e) {
      setStderr("Error: " + e.message);
    } finally {
      setRunning(false);
    }
  };

  const handleSendChat = (text) => {
    setMessages((prev) => [...prev, { user: username, text }]);

    send({
      type: "chat",
      user: username,
      text,
    });
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">⚡ CollabCode</div>
        <div className="room-info">📁 {decodeURIComponent(id)}</div>
        <div className="room-info">👤 {username}</div>
      </nav>

      <div className={showChat ? "main with-chat" : "main no-chat"}>
        <ActiveUsers
          users={users}
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
          <Terminal output={stdout || stderr} />
          <OutputPanel stdout={stdout} stderr={stderr} exitCode={exitCode} />
        </div>

        {showChat && (
          <ChatPanel messages={messages} onSend={handleSendChat} />
        )}
      </div>
    </>
  );
}

export default App;
