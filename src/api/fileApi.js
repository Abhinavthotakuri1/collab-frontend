import axiosClient from "./axiosClient";

export const getFiles = () => axiosClient.get("/files");

export const saveFile = (file) => axiosClient.post("/files/save", file);

export const runCodeApi = async (code, language) => {
  const res = await fetch("http://localhost:8080/api/code/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, language })
  });
  return res.text();
};