import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  if (!user) return null;

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={`px-3 py-1 rounded-lg text-sm transition ${
        isActive(to)
          ? "bg-white text-gray-900 font-semibold"
          : "text-gray-200 hover:bg-gray-700"
      }`}
    >
      {children}
    </Link>
  );

  return (
    <div className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md text-white shadow-md">
      <div className="flex items-center justify-between px-6 py-3">

        <h1 className="text-lg font-bold tracking-wide">
          Store Rating
        </h1>

        {user?.role && (
          <span className="text-xs px-3 py-1 rounded-full bg-gray-700">
            {user.role}
          </span>
        )}

        <div className="flex items-center gap-2">
          {user.role === "ADMIN" && (
            <>
              <NavLink to="/admin/dashboard">Dashboard</NavLink>
              <NavLink to="/admin/users">Users</NavLink>
              <NavLink to="/admin/stores">Stores</NavLink>
              <NavLink to="/admin/add-user">Add User</NavLink>
              <NavLink to="/admin/add-store">Add Store</NavLink>
            </>
          )}

          {user.role === "USER" && (
            <NavLink to="/user/stores">Stores</NavLink>
          )}

          {user.role === "OWNER" && (
            <NavLink to="/owner/dashboard">Dashboard</NavLink>
          )}

          <button
            onClick={logout}
            className="ml-3 px-4 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;