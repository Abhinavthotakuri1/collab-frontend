function OutputPanel({ stdout, stderr, exitCode }) {
  return (
    <div className="output-panel">
      {stdout && (
        <div>
          <div className="output-label">stdout</div>
          <pre className="output-stdout">{stdout}</pre>
        </div>
      )}
      {stderr && (
        <div>
          <div className="output-label error">stderr</div>
          <pre className="output-stderr">{stderr}</pre>
        </div>
      )}
      {exitCode !== undefined && (
        <div className="output-exit">Exit code: {exitCode}</div>
      )}
    </div>
  );
}

export default OutputPanel;