import { useEffect, useState } from "react";
import { API } from "../../api/axios";
import Table from "../../components/Table";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = () => {
    API.get(`/admin/users?search=${search}`).then((res) => setUsers(res.data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Users Management</h1>

      {/* Search Bar */}
      <div className="flex gap-3 mb-6">
        <input
          placeholder="Search by name or email..."
          className="w-full md:w-1/3 border rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={fetchUsers}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow"
        >
          Search
        </button>
      </div>

      {/* Table Wrapper */}
      <div className="bg-white  shadow overflow-hidden">
        <Table columns={["name", "email", "address", "role"]} data={users} />
      </div>
    </div>
  );
};

export default Users;