import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext"; // ✅ Ensure correct import path

export default function Logout() {
  const { unsetUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // ✅ Clear authentication data
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // ✅ Reset UserContext
      unsetUser();

      // ✅ Redirect to home & prevent back navigation
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, [unsetUser, navigate]); // ✅ Dependencies to avoid unnecessary re-renders

  return null; // No UI needed
}
