import { logout } from "../../services/loginService";
import { persistor } from "../../redux/store";
import { logOutAction } from "../../redux/slices/accountSlice";

export const Logout = () => async (dispatch) => {
  try {
    await logout();
    dispatch(logOutAction());
    persistor.purge();
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
