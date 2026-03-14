function PresenceBar({ users }) {
  return (
    <div className="presence-bar">
      {users.map((user, i) => (
        <div
          key={i}
          className="presence-avatar"
          style={{ backgroundColor: user.color || "#888" }}
          title={user.name}
        >
          {user.name?.[0]?.toUpperCase()}
        </div>
      ))}
    </div>
  );
}

export default PresenceBar;