import Navbar from "./components/Navbar.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";
import  AuthProvider  from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
    <Navbar />
    <AppRoutes />
  </AuthProvider>
  );
};

export default App;