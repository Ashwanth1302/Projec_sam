function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password");
    const showPasswordIcon = document.querySelector(".show-password-icon");
  
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      passwordInput.classList.add("visible"); // Add class to track visibility state
    } else {
      passwordInput.type = "password";
      passwordInput.classList.remove("visible"); // Remove class when hiding password
    }
  }

  // Function to hash the password using bcryptjs
async function hashPassword(password) {
 const saltRounds = 10; // The higher the value, the more secure, but slower the hashing process
return await bcrypt.hash(password, saltRounds);
}

// Function to check if the entered password matches the hashed password
async function checkPassword(enteredPassword, hashedPassword) {
return await bcrypt.compare(enteredPassword, hashedPassword);
}

function validateForm() {
const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

// Replace with your actual valid username and password (admin/admin)
const validUsername = "admin";
const validPassword = "admin";

if (username === validUsername && password === validPassword) {
// Redirect to the welcome page upon successful login
window.location.href = "welcome.html";
return false; // Prevent form submission, as we are redirecting manually
} else {
alert("Invalid username or password. Please try again.");
return false; // Prevent form submission, as the login is invalid
}
}