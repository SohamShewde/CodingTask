import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api/axios";

const OwnerDashboard = () => {
  const [code, setCode] = useState("");

  const [data, setData] = useState({
    stores: [],
    users: [],
    avgRating: 0,
  });

  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  
  const fetchDashboard = async () => {
    if (!code) return alert("Enter Owner Code");

    try {
      const res = await API.get(`/owner/dashboard/${code}`);
      setData(res.data || { stores: [], users: [], avgRating: 0 });
      setLoaded(true);
    } catch (err) {
      console.log(err);
      alert("Invalid Code or No Data Found");
    }
  };

  const getStars = (rating = 0) => {
    const stars = [];
    const value = Math.round(Number(rating) || 0);

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= value ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">

      {/* HEADER */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow">

        <div>
          <h1 className="text-2xl font-bold">Owner Dashboard</h1>
          <p className="text-gray-500">Manage your stores & reviews</p>
        </div>

         <button
          onClick={() => navigate("/user/update-password")}
          className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-xl shadow"
        >
          Change Password
        </button>
      </div>

      {/* CODE INPUT */}
      <div className="mt-4 bg-white p-4 rounded-xl shadow flex gap-3 items-center">
        <input
          type="text"
          placeholder="Enter Owner Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border p-2 rounded w-64"
        />

        <button
          onClick={fetchDashboard}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Load Dashboard
        </button>
      </div>

      {!loaded ? (
        <p className="mt-6 text-gray-500">Enter code to load dashboard</p>
      ) : (
        <>
          {/* STATS */}
          <div className="grid grid-cols-3 gap-4 mt-6">

            <div className="bg-white p-4 rounded shadow">
              <p>Overall Rating</p>
              <h2 className="text-2xl font-bold">
                {Number(data.avgRating).toFixed(1)}
              </h2>
              <div>{getStars(data.avgRating)}</div>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <p>Total Stores</p>
              <h2 className="text-2xl font-bold">
                {data.stores.length}
              </h2>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <p>Total Reviews</p>
              <h2 className="text-2xl font-bold">
                {data.users.length}
              </h2>
            </div>

          </div>

          {/* STORES */}
          <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-3">Your Stores</h2>

            <div className="grid grid-cols-3 gap-3">
              {data.stores.map((s) => (
                <div key={s.id} className="border p-3 rounded">
                  <h3 className="font-bold">{s.name}</h3>
                  <p>⭐ {Number(s.rating).toFixed(1)}</p>
                  <p>{s.totalReviews} reviews</p>
                </div>
              ))}
            </div>
          </div>

          {/* REVIEWS */}
          <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-3">Recent Reviews</h2>

            {data.users.length === 0 ? (
              <p>No reviews yet</p>
            ) : (
              data.users.map((u, i) => (
                <div key={i} className="flex justify-between border-b p-2">
                  <div>
                    <p className="font-medium">{u.name}</p>
                    <p className="text-gray-500 text-sm">{u.storeName}</p>
                  </div>

                  <div className="text-yellow-400">
                    {getStars(u.rating)}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OwnerDashboard;