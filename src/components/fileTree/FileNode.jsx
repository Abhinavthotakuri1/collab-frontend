import FileNode from "./FileNode";

function FileExplorer({ files, activeFileId, onFileSelect, onFileCreate }) {
  return (
    <div className="file-explorer">
      <div className="file-explorer-header">
        <span>Files</span>
        <button onClick={onFileCreate}>+</button>
      </div>
      {files.map((file) => (
        <FileNode
          key={file.id}
          file={file}
          isActive={file.id === activeFileId}
          onClick={() => onFileSelect(file)}
        />
      ))}
    </div>
  );
}

export default FileExplorer;