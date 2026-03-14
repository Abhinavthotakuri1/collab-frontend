import { useRef, useEffect } from "react";

function Terminal({ output }) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  return (
    <>
      <div
        style={{
          fontSize: "11px",
          color: "#475569",
          letterSpacing: "1px",
          marginBottom: "6px",
        }}
      >
        ▸ OUTPUT
      </div>

      <pre
        style={{
          fontFamily: "'Cascadia Code', 'Courier New', monospace",
          fontSize: "13px",
          color: "#a3e635",
          whiteSpace: "pre-wrap",
          lineHeight: "1.5",
        }}
      >
        {output || "Run your code to see output here..."}
      </pre>

      <div ref={ref} />
    </>
  );
}

export default Terminal;
