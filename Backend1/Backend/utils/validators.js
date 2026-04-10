exports.validateSignup = ({ name, email, address, password }) => {
  if (!name || name.length < 20 || name.length > 60) return "Name must be 20-60 characters";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email";
  if (!address || address.length > 400) return "Address too long";
  if (!/^(?=.*[A-Z])(?=.*[@$!%*?&]).{8,16}$/.test(password)) return "Password must be 8-16 chars with uppercase & special character";
  return null;
};