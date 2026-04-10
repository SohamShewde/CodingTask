import { useState } from "react";
import { API } from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));

      // ROLE BASED REDIRECT
      if (user.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (user.role === "USER") {
        navigate("/user/stores");
      } else if (user.role === "OWNER") {
        navigate("/owner/dashboard");
      } else {
        navigate("/login");
      }

    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 bg-white shadow rounded w-96">

        <h2 className="text-xl font-bold mb-4">Login</h2>

        {error && <p className="text-red-500">{error}</p>}

        <input
          placeholder="Email"
          className="border w-full p-2 mb-2"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-2"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full p-2"
        >
          Login
        </button>

        <p className="mt-2 text-sm">
          New user? <Link to="/signup">Signup</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;