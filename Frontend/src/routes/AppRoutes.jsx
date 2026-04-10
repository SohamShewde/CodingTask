import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";


import OwnerDashboard from "../pages/Owner/OwnerDashboard";
import Dashboard from "../pages/Admin/Dashboard";
import Users from "../pages/Admin/Users";
import Stores from "../pages/Admin/Stores";
import UserStore from "../pages/Users/UserStore";
import AddU from "../pages/Admin/AddU";
import AddStore from "../pages/Admin/AddStore";
import UpdatePassword from "../pages/Common/UpdatePassword";

const Private = ({ children, role }) => {
  const r = localStorage.getItem("role");

  if (!r) return <Navigate to="/login" />;
  if (role && r !== role) return <Navigate to="/login" />;

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/admin/dashboard" element={<Private role="ADMIN"><Dashboard /></Private>} />
      <Route path="/admin/users" element={<Private role="ADMIN"><Users /></Private>} />
      <Route path="/admin/stores" element={<Private role="ADMIN"><Stores /></Private>} />
      <Route path="/admin/add-user" element={<Private role="ADMIN"><AddU /></Private>} />
      <Route path="/admin/add-store" element={<Private role="ADMIN"><AddStore /></Private>} />

      <Route path="/user/stores" element={<Private role="USER"><UserStore /></Private>} />

      <Route path="/owner/dashboard" element={<Private role="OWNER"><OwnerDashboard /></Private>} />

      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/user/update-password" element={<UpdatePassword />} />
      <Route path="/owner/update-password" element={<UpdatePassword />} />

    </Routes>
  );
};

export default AppRoutes;