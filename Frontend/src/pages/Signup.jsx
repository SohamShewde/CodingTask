import { useState } from "react";
import { API } from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    if (!form.name || form.name.length < 3 || form.name.length > 60)
      return "Name must be 3-60 characters";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "Invalid email";

    if (!form.address || form.address.length > 400)
      return "Address too long";

    if (!/^(?=.*[A-Z])(?=.*[@$!%*?&]).{8,16}$/.test(form.password))
      return "Password must be 8-16 chars with uppercase & special character";

    return null;
  };

  const submit = async () => {
    const err = validate();
    if (err) return setError(err);

    try {
      await API.post("/auth/signup", {
        name: form.name,
        email: form.email,
        address: form.address,
        password: form.password,
        role: form.role || "USER",
      });

      setError("");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-96">

        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <input
          placeholder="Name"
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Address"
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* ROLE SELECT */}
        <select
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="OWNER">Owner</option>
        </select>

        <button
          onClick={submit}
          className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded"
        >
          Register
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;