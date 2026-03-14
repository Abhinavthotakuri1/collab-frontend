import { useDispatch, useSelector } from "react-redux";
import { loginApi, registerApi } from "../api/authApi";
import { setUser, clearUser } from "../store/authSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const login = async (email, password) => {
    const res = await loginApi({ email, password });
    dispatch(setUser(res.data));
    return res.data;
  };

  const register = async (email, username, password) => {
    const res = await registerApi({ email, username, password });
    dispatch(setUser(res.data));
    return res.data;
  };

  const logout = () => dispatch(clearUser());

  return { user, login, register, logout };
}