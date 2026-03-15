import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createRoom } from "../api/roomApi";
import { clearUser } from "../store/authSlice";

function Dashboard() {
  const [roomName, setRoomName] = useState("");
  const [error, setError]       = useState("");
  const user                    = useSelector((s) => s.auth.user);
  const navigate                = useNavigate();
  const dispatch                = useDispatch();

  const handleCreate = async () => {
    if (!roomName.trim()) return;
    try {
      await createRoom(roomName.trim());
      navigate(`/room/${encodeURIComponent(roomName.trim())}`);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create room");
    }
  };

  const handleJoin = () => {
    if (!roomName.trim()) return;
    navigate(`/room/${encodeURIComponent(roomName.trim())}`);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", height: "100vh", background: "#0f172a"
    }}>
      {/* Header */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "60px", background: "#020617",
        borderBottom: "1px solid #1e293b",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 25px"
      }}>
        <div style={{ fontSize: "20px", fontWeight: "bold", color: "#38bdf8" }}>
          ⚡ CollabCode
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ color: "#94a3b8", fontSize: "14px" }}>
            👤 {user?.username || user?.email}
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: "5px 12px", background: "transparent",
              border: "1px solid #334155", borderRadius: "6px",
              color: "#94a3b8", cursor: "pointer", fontSize: "12px"
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
      </div>

      {/* Main content */}
      <div style={{ marginBottom: "32px", textAlign: "center" }}>
        <div style={{ fontSize: "32px", fontWeight: "bold", color: "#38bdf8" }}>
          ⚡ CollabCode
        </div>
        <p style={{ color: "#64748b", marginTop: "8px" }}>
          Welcome, {user?.username || user?.email || "Coder"} 👋
        </p>
      </div>

      <div style={{
        background: "#020617", padding: "2rem", borderRadius: "12px",
        width: "420px", border: "1px solid #1e293b"
      }}>
        <h3 style={{ color: "#94a3b8", marginBottom: "16px", fontSize: "15px" }}>
          Create or Join a Room
        </h3>
        {error && (
          <div style={{
            background: "#450a0a", color: "#fca5a5",
            padding: "8px 12px", borderRadius: "6px",
            fontSize: "13px", marginBottom: "12px"
          }}>
            {error}
          </div>
        )}
        <input
          placeholder="Enter room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          style={{
            width: "100%", padding: "10px 14px", borderRadius: "8px",
            border: "1px solid #1e293b", background: "#0f172a",
            color: "white", fontSize: "14px", outline: "none",
            marginBottom: "14px"
          }}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={handleCreate} style={{
            flex: 1, padding: "10px", background: "#0ea5e9",
            border: "none", borderRadius: "8px", color: "white",
            cursor: "pointer", fontSize: "14px", fontWeight: "500"
          }}>
            Create Room
          </button>
          <button onClick={handleJoin} style={{
            flex: 1, padding: "10px", background: "#1e293b",
            border: "none", borderRadius: "8px", color: "white",
            cursor: "pointer", fontSize: "14px"
          }}>
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;