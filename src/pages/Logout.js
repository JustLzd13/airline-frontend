import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

const Logout = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Logging out..."); // ✅ Debugging

    // ✅ Clear localStorage & sessionStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear(); // Force session reset

    // ✅ Reset user state
    setUser(null);

    // ✅ Force page reload to clear state completely
    setTimeout(() => {
      navigate("/");
      window.location.reload(); // ✅ Reload to reset React state
    }, 500);
  }, [navigate, setUser]);

  return null;
};

export default Logout;
