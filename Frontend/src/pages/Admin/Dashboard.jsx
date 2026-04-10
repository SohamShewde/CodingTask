import { useEffect, useState } from "react";
import { API } from "../../api/axios";

const Dashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    API.get("/admin/dashboard").then((res) => setData(res.data));
  }, []);

  const Card = ({ title, value, color }) => (
    <div className={`rounded-2xl shadow-md p-6 text-white ${color} hover:scale-[1.02] transition`}>
      <h2 className="text-sm opacity-90">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value || 0}</p>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Total Users" value={data.users} color="bg-blue-600" />
        <Card title="Total Stores" value={data.stores} color="bg-green-600" />
        <Card title="Total Ratings" value={data.ratings} color="bg-yellow-500" />
      </div>
    </div>
  );
};

export default Dashboard;