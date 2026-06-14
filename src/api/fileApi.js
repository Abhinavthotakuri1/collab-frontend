import axiosClient from "./axiosClient";

export const getFiles = () => axiosClient.get("/files");

export const saveFile = (file) =>
  axiosClient.post("/files/save", file);

export const runCodeApi = async (
  code,
  language,
  stdin = ""
) => {
  const res = await fetch(
    "https://collab-backend-production-8bbf.up.railway.app/api/code/run",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        language,
        input: stdin,
      }),
    }
  );

  return res.text();
};