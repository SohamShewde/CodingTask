import { useEffect, useState } from "react";
import { API } from "../../api/axios";
import Table from "../../components/Table";

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");

  const fetchStores = () => {
    API.get(`/admin/stores?search=${search}`).then((res) => setStores(res.data));
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Stores Management</h1>

      {/* Search Section */}
      <div className="flex gap-3 mb-6">
        <input
          placeholder="Search stores..."
          className="w-full md:w-1/3 border rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={fetchStores}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl shadow"
        >
          Search
        </button>
      </div>

      {/* Table */}
      <div className="bg-white  shadow overflow-hidden">
        <Table columns={["name", "email", "address", "rating"]} data={stores} />
      </div>
    </div>
  );
};

export default Stores;