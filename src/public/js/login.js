document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
  
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault(); 
  
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      try {
        const response = await fetch("/api/sessions/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          window.location.href = "/products";
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    });
  });