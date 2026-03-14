import axiosClient from "./axiosClient";

export const createRoom = (roomName) =>
  axiosClient.post(`/rooms/create?roomName=${encodeURIComponent(roomName)}`);

export const getCode = (roomName) =>
  axiosClient.get(`/rooms/${encodeURIComponent(roomName)}/code`);

export const saveCode = (roomName, code) =>
  axiosClient.post(`/rooms/${encodeURIComponent(roomName)}/code`, code, {
    headers: { "Content-Type": "text/plain" }
  });