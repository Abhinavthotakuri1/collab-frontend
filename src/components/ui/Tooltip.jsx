import { useState } from "react";

function Tooltip({ text, children }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && <div className="tooltip">{text}</div>}
    </div>
  );
}

export default Tooltip;