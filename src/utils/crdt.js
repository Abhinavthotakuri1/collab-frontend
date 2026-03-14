// Utility helpers for Yjs CRDT operations

export function applyInsert(yText, index, content) {
  yText.insert(index, content);
}

export function applyDelete(yText, index, length) {
  yText.delete(index, length);
}

export function getSnapshot(yText) {
  return yText.toString();
}