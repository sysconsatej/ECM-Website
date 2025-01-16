
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found.");
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp < now) {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Error decoding the token:", error);
      localStorage.removeItem("token");
    }
  });