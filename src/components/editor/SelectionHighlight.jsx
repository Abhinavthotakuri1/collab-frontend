function SelectionHighlight({ selections }) {
  return (
    <div className="selection-overlay">
      {selections.map((sel, i) => (
        <div
          key={i}
          className="remote-selection"
          style={{
            top: sel.top,
            left: sel.left,
            width: sel.width,
            height: sel.height,
            backgroundColor: sel.color + "33"
          }}
        />
      ))}
    </div>
  );
}

export default SelectionHighlight;