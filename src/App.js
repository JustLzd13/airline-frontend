import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";
import BookPage from "./pages/BookPage";
import ContactPage from "./pages/ContactPage";
import ViewFlight from "./pages/ViewFlight";
import Error from "./pages/Error";
import { UserProvider } from "./UserContext";
import UserContext from "./UserContext";

const AppContent = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("https://airisle-api-3.onrender.com/users/user-profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user)); // ✅ Store user in local storage
        } else {
          console.error("Failed to fetch user profile");
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    };

    fetchUserProfile();
  }, [setUser]);

  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/bookings" element={user ? <Bookings /> : <Navigate to="/login" />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/book/:id" element={user ? <BookPage /> : <Navigate to="/login" />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/view-flight" element={<ViewFlight />} />
        <Route path="/view-flight/:id" element={user ? <ViewFlight /> : <Navigate to="/login" />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

const App = () => (
  <UserProvider>
    <AppContent />
  </UserProvider>
);

export default App;
