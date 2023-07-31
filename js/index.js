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
  const requiredMessage = document.getElementById("required-message");

  if (username === "" || password === "") {
    requiredMessage.textContent = "Please fill out both fields.";
    requiredMessage.style.color = "red";
    return false; // Prevent form submission
  } else {
    requiredMessage.textContent = ""; // Clear the message if fields are filled
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
}



//creating vm

document.addEventListener("DOMContentLoaded", function () {
  const vmForm = document.getElementById("vmForm");
  const userListDiv = document.getElementById("userList");
  const flavourSectionDiv = document.getElementById("flavourSection");
  const maxUsers = 5;

  // Add an event listener for the input field to update the user list
  const numUsersInput = document.getElementById("numUsers");
  numUsersInput.addEventListener("input", function () {
    const numUsers = parseInt(numUsersInput.value);
    updateUserList(Math.min(numUsers, maxUsers));
  });

  // Function to update the user list
  function updateUserList(numUsers) {
    // Clear existing user list
    userListDiv.innerHTML = '';

    // Create and append new user input fields
    for (let i = 1; i <= numUsers; i++) {
      const userLabel = document.createElement("label");
      userLabel.textContent = `User ${i}:`;

      const userInput = document.createElement("input");
      userInput.type = "text";
      userInput.name = `user${i}`;
      userInput.required = true;

      const userDiv = document.createElement("div");
      userDiv.appendChild(userLabel);
      userDiv.appendChild(userInput);

      userListDiv.appendChild(userDiv);
    }

    // Populate the flavour section
    populateFlavourSection();
  }

  // Function to populate the flavour section
  function populateFlavourSection() {
    const flavours = [
      { vCPU: "1", disk: "1 GB", ram: "512 MB" },
      { vCPU: "1", disk: "20 GB", ram: "512 MB" },
      { vCPU: "2", disk: "40 GB", ram: "2048 MB" },
      { vCPU: "4", disk: "80 GB", ram: "4096 MB" },
      { vCPU: "8", disk: "160 GB", ram: "8192 MB" },
    ];

    // Clear existing content in the flavour section
    flavourSectionDiv.innerHTML = '';
    const heading = document.createElement("h5");
    heading.textContent = "Flavour";
    flavourSectionDiv.appendChild(heading);

    // Create and append new flavour table
    const flavourTable = document.createElement("table");
    flavourTable.className = "flavour-table";

    // Create header row
    const headerRow = document.createElement("tr");
    const headers = ["User", "vCPU", "Disk", "RAM"];
    headers.forEach((headerText) => {
      const headingCell = document.createElement("th");
      headingCell.textContent = headerText;
      headerRow.appendChild(headingCell);
    });
    flavourTable.appendChild(headerRow);

    // Create data rows for each user flavour
    const userDivs = userListDiv.querySelectorAll("div");
    userDivs.forEach((userDiv, index) => {
      const userRow = document.createElement("tr");

      // User cell
      const userCell = document.createElement("td");
      userCell.textContent = `User ${index + 1}`;
      userRow.appendChild(userCell);

      // vCPU cell
      const vcpuCell = document.createElement("td");
      const vcpuSelect = createSelect("vcpu", flavours.map((flavor) => flavor.vCPU));
      vcpuCell.appendChild(vcpuSelect);
      userRow.appendChild(vcpuCell);

      // Disk cell
      const diskCell = document.createElement("td");
      const diskSelect = createSelect("disk", flavours.map((flavor) => flavor.disk));
      diskCell.appendChild(diskSelect);
      userRow.appendChild(diskCell);

      // RAM cell
      const ramCell = document.createElement("td");
      const ramSelect = createSelect("ram", flavours.map((flavor) => flavor.ram));
      ramCell.appendChild(ramSelect);
      userRow.appendChild(ramCell);

      flavourTable.appendChild(userRow);
    });

    // Append the flavour table to the flavour section
    flavourSectionDiv.appendChild(flavourTable);
  }

  // Function to create the select dropdown
  function createSelect(name, optionsArray) {
    const select = document.createElement("select");
    select.name = name;
    optionsArray.forEach((optionText) => {
      const option = document.createElement("option");
      option.textContent = optionText;
      select.appendChild(option);
    });
    return select;
  }

  // Add an event listener for the form submission
  vmForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    // Here, you can handle form data submission to the server if needed

    // Refresh the page after form submission
    window.location.reload();
  });
});









//to open create vm page

document.addEventListener("DOMContentLoaded", function () {
  // Get the "Create Virtual machine" heading element
  const createHeading = document.querySelector(".create");

  // Check if the element is found before adding an event listener
  if (createHeading) {
    // Add a click event listener to the heading
    createHeading.addEventListener("click", function () {
      // Redirect to vm.html when the heading is clicked
      window.location.href = "_vm.html";
    });
  }
});
