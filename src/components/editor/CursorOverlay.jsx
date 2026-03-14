function CursorOverlay({ cursors }) {
  return (
    <div className="cursor-overlay">
      {cursors.map((cursor, i) => (
        <div
          key={i}
          className="remote-cursor"
          style={{
            top: cursor.top,
            left: cursor.left,
            borderColor: cursor.color
          }}
        >
          <span className="cursor-label" style={{ backgroundColor: cursor.color }}>
            {cursor.username}
          </span>
        </div>
      ))}
    </div>
  );
}

export default CursorOverlay;