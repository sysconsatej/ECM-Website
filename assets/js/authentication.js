
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


  const loginText = document.getElementById("loginText");
  const token = localStorage.getItem('token');
  
  if (token) {
      loginText.innerText = 'Logout';
      loginText.classList.add("menu-itemfirst-itemlogin-btn-header");
  }
  
  const logout = () => {
      loginText.addEventListener("click", () => { 
          // Check if currently showing "Logout" before proceeding
          if (loginText.innerText === 'Logout'.toUpperCase()) {
              loginText.innerText = 'Login';
              loginText.classList.add("menu-itemfirst-itemlogin-btn-header");
              localStorage.removeItem('token');
              loginText.setAttribute('href', 'https://expresswayshipping.com/cp/login');
          }
      });
  };
  
  logout(); 