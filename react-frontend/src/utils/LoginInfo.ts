import { jwtDecode } from "jwt-decode";

interface UserInfo {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export const getLoginInfo = (): UserInfo | null => {
  const token = localStorage.getItem("token");
  if (token != null) {
    try {
      const userInfo = jwtDecode<UserInfo>(token);
      return userInfo;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  } else {
    return null;
  }
};
