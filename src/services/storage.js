export function setTokenInStorage({ token }) {
  localStorage.setItem("app-auth-token", token);
}

export function getTokenFromStorage() {
  return localStorage.getItem("app-auth-token");
}
