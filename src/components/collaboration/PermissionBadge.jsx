function PermissionBadge({ role }) {
  const colors = {
    owner: "#f59e0b",
    editor: "#3b82f6",
    viewer: "#6b7280"
  };

  return (
    <span
      className="permission-badge"
      style={{ backgroundColor: colors[role] || "#6b7280" }}
    >
      {role}
    </span>
  );
}

export default PermissionBadge;