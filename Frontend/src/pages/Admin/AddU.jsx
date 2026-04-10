import { useState } from "react";
import { API } from "../../api/axios";
import { useNavigate } from "react-router-dom";

const AddU = () => {
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    if (!form.name || form.name.length < 20 || form.name.length > 60)
      return "Name must be 20-60 characters";

    if (!form.email) return "Email required";

    if (!form.address || form.address.length > 400)
      return "Address too long";

    if (!form.password) return "Password required";

    if (!form.role) return "Select role";

    return null;
  };

  const submit = async () => {
    const err = validate();
    if (err) return setMsg(err);

    try {
      await API.post("/admin/users", form);
      setMsg("User created successfully");
      setTimeout(() => {
      navigate("/admin/dashboard"); // ✅ redirect here
    }, 500);
    } catch {
      setMsg("Error creating user");
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-white shadow-lg p-6 w-96 rounded">

        <h2 className="text-xl font-bold mb-4">Add User</h2>

        {msg && <p className="text-sm mb-3">{msg}</p>}

        {["name", "email", "address", "password"].map((f) => (
          <input
            key={f}
            type={f === "password" ? "password" : "text"}
            placeholder={f}
            className="border p-2 w-full mb-3 rounded"
            onChange={(e) =>
              setForm({ ...form, [f]: e.target.value })
            }
          />
        ))}

        <select
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) =>
            setForm({ ...form, role: e.target.value.toLowerCase() })
          }
        >
          <option value="">Select Role</option>
          <option value="user">USER</option>
          <option value="owner">STORE OWNER</option>
          <option value="admin">ADMIN</option>
        </select>

        <button
          onClick={submit}
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          Create User
        </button>

      </div>
    </div>
  );
};

export default AddU;