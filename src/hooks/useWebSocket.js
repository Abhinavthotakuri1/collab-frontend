import { useEffect, useRef, useCallback } from "react";

export function useWebSocket(roomId, username, onMessage) {
  const wsRef = useRef(null);

  useEffect(() => {
    if (!roomId || !username) return;

    const url = `wss://collab-backend-production-8bbf.up.railway.app/ws/editor/${roomId}?user=${encodeURIComponent(
      username
    )}`;

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () =>
      console.log("WebSocket connected:", url);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (e) {
        console.error("WS parse error:", e);
      }
    };

    ws.onerror = (e) =>
      console.error("WS error:", e);

    ws.onclose = () =>
      console.log("WS disconnected");

    return () => ws.close();
  }, [roomId, username, onMessage]);

  const send = useCallback((data) => {
    if (
      wsRef.current &&
      wsRef.current.readyState === WebSocket.OPEN
    ) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  return { send };
}