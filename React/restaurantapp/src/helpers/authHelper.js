export const setTokenExpiration = (token) => {
  const tokenExpirationTime = 30 * 60 * 1000;
  const expirationDate = new Date().getTime() + tokenExpirationTime;
  localStorage.setItem("tokenExpiration", expirationDate.toString());
};

export const checkTokenExpiration = () => {
  const now = new Date().getTime();
  const expirationDate = parseInt(
    localStorage.getItem("tokenExpiration") || "0"
  );
  return now > expirationDate;
};

export const clearTokenExpiration = () => {
  localStorage.removeItem("tokenExpiration");
};
