import { useState } from "react";
import { API } from "../../api/axios";
import { useNavigate } from "react-router-dom";

const AddStore = () => {
  const [form, setForm] = useState({
  name: "",
  email: "",
  address: "",
  ownerCode: ""
});
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

 const submit = async () => {
  if (!form.name || !form.email || !form.address || !form.ownerCode){
    return setMsg("All fields required");
  }

  try {
    await API.post("/admin/stores", form);

    setMsg("Store created successfully");

    setTimeout(() => {
      navigate("/admin/dashboard");
    }, 500);

  } catch {
    setMsg("Error creating store");
  }
};

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-white shadow-lg p-6 w-96 rounded">

        <h2 className="text-xl font-bold mb-4">Add Store</h2>

        {msg && <p className="text-sm mb-3">{msg}</p>}

        {["name", "email", "address", "ownerCode"].map((f) => (
          <input
            key={f}
            placeholder={f}
            className="border p-2 w-full mb-3 rounded"
            onChange={(e) =>
              setForm({ ...form, [f]: e.target.value })
            }
          />
        ))}

        <button
          onClick={submit}
          className="bg-green-500 text-white w-full py-2 rounded"
        >
          Create Store
        </button>

      </div>
    </div>
  );
};

export default AddStore;