"use strict";

const elementInput = document.querySelectorAll(".input");
const paraWarning = document.querySelectorAll(".warning");
const btn = document.querySelector(".btn");

// FUNCTIONS
const hideError = function (index) {
  elementInput[index].classList.remove("warning-active", "error");
  paraWarning[index].style.display = "none";
};

const showError = function (index, customPlaceholder = "") {
  elementInput[index].classList.add("warning-active", "error");
  paraWarning[index].style.display = "block";

  // Set the custom placeholder only for email input if provided
  if (elementInput[index].type === "email" && customPlaceholder) {
    elementInput[index].setAttribute("placeholder", customPlaceholder);
    elementInput[index].classList.add("invalid-placeholder");
  }
};

// Email validation function
const isValidEmail = function (email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

// Show / hide placeholder text
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

  // Only modify placeholder for the email input field
  if (inputField.type === "email" && inputField.value.trim() === "") {
    if (a) {
      showError(index, "Please enter your email");
    } else if (!isValidEmail(inputField.value)) {
      showError(index, "Invalid email format");
    } else {
      hideError(index);
      inputField.setAttribute(
        "placeholder",
        inputField.getAttribute("data-placeholder")
      );
    }
  } else {
    // For other input fields, restore the original placeholder if there are no errors
    inputField.setAttribute(
      "placeholder",
      inputField.getAttribute("data-placeholder")
    );
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
      showError(
        index,
        inputElement.type === "email" ? "Please enter your email" : ""
      );
    } else if (inputElement.type === "email" && !isValidEmail(inputValue)) {
      e.preventDefault();
      showError(index, "Invalid email format");
    } else {
      hideError(index);
    }
  });
});
