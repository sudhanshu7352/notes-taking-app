import { jwtDecode } from "jwt-decode";

export function isLoggedIn() {
  const token = localStorage.getItem("access");
  if (!token) return false;

  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    if (Date.now() >= exp * 1000) {
      return false; // token expired
    }
    return true;
  } catch {
    return false;
  }
}
