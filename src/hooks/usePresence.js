import { useEffect, useState } from "react";

export function usePresence(awareness, currentUser) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!awareness) return;

    awareness.setLocalStateField("user", {
      name: currentUser?.username,
      color: currentUser?.color || "#3b82f6"
    });

    const handler = () => {
      const states = [];
      awareness.getStates().forEach((state) => {
        if (state.user) states.push(state.user);
      });
      setUsers(states);
    };

    awareness.on("change", handler);
    return () => awareness.off("change", handler);
  }, [awareness, currentUser]);

  return { users };
}