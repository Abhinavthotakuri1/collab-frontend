import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoomById } from "../api/roomApi";
import { setRoom } from "../store/roomSlice";

export function useRoom(roomId) {
  const dispatch = useDispatch();
  const room = useSelector((state) => state.room.current);

  useEffect(() => {
    if (!roomId) return;
    getRoomById(roomId).then((res) => dispatch(setRoom(res.data)));
  }, [roomId]);

  return { room };
}