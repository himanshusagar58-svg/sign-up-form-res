const form = document.getElementById("signup_form")

// helper — show error
function showError(fieldId, message) {
  const field = document.getElementById(fieldId)
  const error = document.getElementById(fieldId + "_error")
  field.classList.add("error")
  error.textContent = message
}

// helper — clear error
function clearError(fieldId) {
  const field = document.getElementById(fieldId)
  const error = document.getElementById(fieldId + "_error")
  field.classList.remove("error")
  error.textContent = ""
}

// clear errors on input so user gets live feedback
document.getElementById("first_name").addEventListener("input", () => clearError("first_name"))
document.getElementById("last_name").addEventListener("input", () => clearError("last_name"))
document.getElementById("email").addEventListener("input", () => clearError("email"))
document.getElementById("phone").addEventListener("input", () => clearError("phone"))
document.getElementById("password").addEventListener("input", () => clearError("password"))
document.getElementById("confirm_password").addEventListener("input", () => clearError("confirm_password"))
document.getElementById("dob").addEventListener("input", () => clearError("dob"))
document.getElementById("gender").addEventListener("change", () => clearError("gender"))

// main validate function
function validateForm() {
  let isValid = true

  const firstName = document.getElementById("first_name").value.trim()
  const lastName = document.getElementById("last_name").value.trim()
  const email = document.getElementById("email").value.trim()
  const phone = document.getElementById("phone").value.trim()
  const password = document.getElementById("password").value
  const confirmPassword = document.getElementById("confirm_password").value
  const dob = document.getElementById("dob").value
  const gender = document.getElementById("gender").value
  const terms = document.getElementById("terms").checked

  // first name
  if (firstName === "") {
    showError("first_name", "First name is required")
    isValid = false
  } else if (firstName.length < 2) {
    showError("first_name", "Must be at least 2 characters")
    isValid = false
  }

  // last name
  if (lastName === "") {
    showError("last_name", "Last name is required")
    isValid = false
  } else if (lastName.length < 2) {
    showError("last_name", "Must be at least 2 characters")
    isValid = false
  }

  // email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (email === "") {
    showError("email", "Email is required")
    isValid = false
  } else if (!emailRegex.test(email)) {
    showError("email", "Enter a valid email address")
    isValid = false
  }

  // phone — basic Indian number check
  const phoneRegex = /^[6-9]\d{9}$/
  const cleanPhone = phone.replace(/[\s\+\-]/g, "") // remove spaces, + and -
  if (phone === "") {
    showError("phone", "Phone number is required")
    isValid = false
  } else if (!phoneRegex.test(cleanPhone)) {
    showError("phone", "Enter a valid 10 digit phone number")
    isValid = false
  }

  // password
  if (password === "") {
    showError("password", "Password is required")
    isValid = false
  } else if (password.length < 8) {
    showError("password", "Password must be at least 8 characters")
    isValid = false
  } else if (!/[A-Z]/.test(password)) {
    showError("password", "Must contain at least one uppercase letter")
    isValid = false
  } else if (!/[0-9]/.test(password)) {
    showError("password", "Must contain at least one number")
    isValid = false
  }

  // confirm password
  if (confirmPassword === "") {
    showError("confirm_password", "Please confirm your password")
    isValid = false
  } else if (password !== confirmPassword) {
    showError("confirm_password", "Passwords do not match")
    isValid = false
  }

  // date of birth — must be 13+
  if (dob === "") {
    showError("dob", "Date of birth is required")
    isValid = false
  } else {
    const birthDate = new Date(dob)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    if (age < 13) {
      showError("dob", "You must be at least 13 years old")
      isValid = false
    }
  }

  // gender
  if (gender === "") {
    showError("gender", "Please select a gender")
    isValid = false
  }

  // terms
  if (!terms) {
    document.getElementById("terms_error").textContent = "You must agree to the terms"
    isValid = false
  } else {
    document.getElementById("terms_error").textContent = ""
  }

  return isValid
}

// form submit
form.addEventListener("submit", (e) => {
  e.preventDefault() // stop page reload

  if (validateForm()) {
    // all good — show success
    const btn = document.querySelector(".submit_btn")
    btn.textContent = "Account Created! ✓"
    btn.style.background = "#a8f0c6"
    btn.style.color = "#1a6b3a"
    // here you'd normally send data to your backend
  }
})
const toggle = document.getElementById("theme_toggle")

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark")

  // change icon
  if (document.body.classList.contains("dark")) {
    toggle.textContent = "☀️"
    localStorage.setItem("theme", "dark")
  } else {
    toggle.textContent = "🌙"
    localStorage.setItem("theme", "light")
  }
})

// remember preference on page reload
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark")
  toggle.textContent = "☀️"
}