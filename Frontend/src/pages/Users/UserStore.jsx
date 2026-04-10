import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api/axios";
import StoreCard from "../../components/StoreCard";

const UserStore = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchStores = async (customSearch = search) => {
    setLoading(true);
    const res = await API.get(`/user/stores?search=${customSearch}`);
    setStores(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const rate = async (storeId, rating) => {
    await API.post("/user/rate", { storeId, rating });
    fetchStores(search);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Explore Stores
          </h1>
          <p className="text-gray-500">
            Discover and rate your favorite stores
          </p>
        </div>

        <button
          onClick={() => navigate("/user/update-password")}
          className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-xl shadow"
        >
          Change Password
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="flex flex-col md:flex-row gap-3 mb-8">

        <input
          className="w-full md:w-1/3 border rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search stores..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => fetchStores(search)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow transition"
        >
          Search
        </button>

        <button
          onClick={() => {
            setSearch("");
            fetchStores("");
          }}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-xl transition"
        >
          Reset
        </button>
      </div>

      {loading && (
        <div className="text-center text-gray-500 mt-20">
          Loading stores...
        </div>
      )}

      {!loading && stores.length === 0 && (
        <div className="text-center text-gray-500 mt-20">
          No stores found 😕
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((s) => (
          <div key={s.id} className="transform hover:scale-[1.02] transition">
            <StoreCard store={s} rate={rate} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStore;