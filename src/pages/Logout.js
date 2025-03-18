import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext"; // ✅ Ensure correct import path

export default function Logout() {
  const { setUser } = useContext(UserContext); // ✅ Use setUser from context
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      try {
        // ✅ Clear authentication data
        localStorage.removeItem("token");

        // ✅ Reset global user state
        setUser(null);

        // ✅ Redirect to login & prevent back navigation
        navigate("/login", { replace: true });
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    handleLogout();
  }, [setUser, navigate]); // ✅ Dependencies to ensure effect runs once

  return null; // No UI needed
}
