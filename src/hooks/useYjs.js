import { useEffect, useRef } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

export function useYjs(roomId, fileId) {
  const docRef = useRef(null);
  const providerRef = useRef(null);

  useEffect(() => {
    if (!roomId || !fileId) return;

    const doc = new Y.Doc();
    const provider = new WebsocketProvider(
      "ws://localhost:1234",
      `${roomId}-${fileId}`,
      doc
    );

    docRef.current = doc;
    providerRef.current = provider;

    return () => {
      provider.destroy();
      doc.destroy();
    };
  }, [roomId, fileId]);

  const getText = () => docRef.current?.getText("content");
  const getAwareness = () => providerRef.current?.awareness;

  return { getText, getAwareness };
}