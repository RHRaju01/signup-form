"use strict";

const elementInput = document.querySelectorAll(".input");
const paraWarning = document.querySelectorAll(".warning");
const btn = document.querySelector(".btn");

// FUNCTIONS
const hideError = function (index) {
  elementInput[index].classList.remove("warning-active", "error");
  paraWarning[index].style.display = "none";
};

const showError = function (index) {
  elementInput[index].classList.add("warning-active", "error");
  paraWarning[index].style.display = "block";
};

// Email validation function
const isValidEmail = function (email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

// show / hide placeholder text
const inputFocusActive = (event) => {
  const inputField = event.target;
  const index = Array.from(elementInput).indexOf(inputField);

  // Hide the error message when the input gains focus
  hideError(index);

  inputField.setAttribute(
    "data-placeholder",
    inputField.getAttribute("placeholder")
  );
  inputField.setAttribute("placeholder", "");
};

const inputBlurActive = (event) => {
  const inputField = event.target;
  const index = Array.from(elementInput).indexOf(inputField);

  inputField.setAttribute(
    "placeholder",
    inputField.getAttribute("data-placeholder")
  );

  // Show error message if the input value is empty when it loses focus
  if (inputField.value.trim() === "") {
    showError(index);
  } else if (inputField.type === "email" && !isValidEmail(inputField.value)) {
    // Checks if input type is email and if it's not valid
    showError(index);

    // Set a custom placeholder text for the invalid email
    inputField.setAttribute("placeholder", "email@example.com");

    // Change the placeholder color (this will apply to all input fields with placeholders)
    inputField.classList.add("invalid-placeholder");
  }
};

// HANDLERS
elementInput.forEach((input) => {
  input.addEventListener("focus", inputFocusActive);
  input.addEventListener("blur", inputBlurActive);
});

// Show / hide error icon and text
btn.addEventListener("click", function (e) {
  elementInput.forEach((inputElement, index) => {
    const inputValue = inputElement.value;
    if (inputValue.trim() === "") {
      e.preventDefault();
      showError(index);
    } else {
      hideError(index);
    }
  });
});
