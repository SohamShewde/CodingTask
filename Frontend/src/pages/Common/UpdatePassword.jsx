import { useState } from "react";
// import { API } from "../../api/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [msg, setMsg] = useState("");

  const id = localStorage.getItem("id");

  const navigate = useNavigate();

  // VALIDATION
  const validate = () => {
    if (!form.password || !form.confirmPassword)
      return "All fields are required";

    if (form.password !== form.confirmPassword)
      return "Passwords do not match";

    if (!/^(?=.*[A-Z])(?=.*[@$!%*?&]).{8,16}$/.test(form.password))
      return "Password must be 8-16 chars with uppercase & special character";

    return null;
  };

  // SUBMIT
  const handleUpdate = async () => {
    const error = validate();
    if (error) {
      setMsg(error);
      return;
    }

    const token = localStorage.getItem("token");

    try {
      await axios.put(
        "http://localhost:5000/auth/update-password",
        {
          newPassword: form.password, // ✅ FIX HERE
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMsg("");
      alert("Password updated successfully");
      const role = localStorage.getItem("role");

      if (role === "OWNER") {
        navigate("/owner/dashboard");
      } else {
        navigate("/user/stores");
      }
    } catch (err) {
      console.log(err);
      setMsg("Failed to update password");
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-white shadow-lg p-6 w-96 rounded">

        <h2 className="text-xl font-bold mb-4">Update Password</h2>

        {msg && (
          <p className="text-sm mb-3 text-red-500">{msg}</p>
        )}

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="New Password"
          className="border p-2 w-full mb-3 rounded"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* CONFIRM PASSWORD */}
        <input
          type="password"
          placeholder="Confirm Password"
          className="border p-2 w-full mb-3 rounded"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
        />

        {/* BUTTON */}
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default UpdatePassword;