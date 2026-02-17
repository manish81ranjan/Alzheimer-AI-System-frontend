// src/features/auth/validators.js

export function isValidEmail(email) {
  if (!email) return false;
  // simple and safe email check
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validateLogin({ email, password }) {
  if (!email || !password) return "Email and password are required.";
  if (!isValidEmail(email)) return "Please enter a valid email address.";
  if (String(password).length < 6) return "Password must be at least 6 characters.";
  return "";
}

export function validateRegister({ name, email, password, confirm }) {
  if (!name || !email || !password || !confirm) return "All fields are required.";
  if (String(name).trim().length < 2) return "Name must be at least 2 characters.";
  if (!isValidEmail(email)) return "Please enter a valid email address.";
  if (String(password).length < 6) return "Password must be at least 6 characters.";
  if (password !== confirm) return "Passwords do not match.";
  return "";
}
