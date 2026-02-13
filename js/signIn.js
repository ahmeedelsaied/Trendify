// Get elements
let email = document.getElementById("email");
let password = document.getElementById("password");
let signInBtn = document.getElementById("sign-in");
// get saved users from local storage
let savedEmail = localStorage.getItem("email");
let savedPassword = localStorage.getItem("password");
// sign in event listener
signInBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // check if input matches saved credentials
  if (!email.value || !password.value) {
    alert("Please fill in all fields.");
  } else if (email.value === savedEmail && password.value === savedPassword) {
    alert(
      `Welcome back, ${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}!`,
    );
    setTimeout(() => {
      signInBtn.innerHTML = "Signing In...";
      window.location.href = "../index.html";
    }, 1500);
  } else {
    alert("Invalid email or password.");
  }
});
