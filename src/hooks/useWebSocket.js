import { useEffect, useRef, useCallback } from "react";

export function useWebSocket(roomId, username, onMessage) {
  const wsRef = useRef(null);

  useEffect(() => {
    if (!roomId || !username) return;

    const url = `ws://localhost:8080/ws/editor/${roomId}?user=${encodeURIComponent(username)}`;
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => console.log("WebSocket connected:", url);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (e) {
        console.error("WS parse error:", e);
      }
    };

    ws.onerror = (e) => console.error("WS error:", e);
    ws.onclose = () => console.log("WS disconnected");

    return () => ws.close();
  }, [roomId, username]);

  const send = useCallback((data) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  return { send };
}