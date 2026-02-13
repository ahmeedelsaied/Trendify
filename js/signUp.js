document.addEventListener("DOMContentLoaded", function () {

  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const signUpButton = document.getElementById("sign-up");

  signUpButton.addEventListener("click", function (event) {

    event.preventDefault();

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    console.log(firstName, lastName, email, password); // اختبار

    if (!firstName || !lastName || !email || !password) {
      alert("Please fill all fields ❌");
      return;
    }

    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    alert("Account Created Successfully ✅");

    setTimeout(() => {
      window.location.href ="../html/sign-in.html";
    }, 1000);

  });

});
