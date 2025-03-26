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
import { PaymentOptions, FlightStatus, AddOns } from "./pages/ManagePages";
import AdminDashboard from "./pages/AdminDashboard";
import WhereToFly from "./pages/WhereToFly";
import DiscoverPhilippines from "./pages/DiscoverPhilippines";
import WhoAreWe from "./pages/WhoAreWe";
import { UserProvider } from "./UserContext";
import UserContext from "./UserContext";

const AppContent = () => {
  const { user, loading, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const response = await fetch("https://airisle-api-3.onrender.com/users/user-profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          setUser(null);
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
        localStorage.removeItem("token");
      }
    };

    fetchUserProfile();
  }, [setUser]);

  if (loading) return null; // ✅ Prevents flashing and premature redirects

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
        <Route path="/about/contact" element={<ContactPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/view-flight" element={<ViewFlight />} />
        <Route path="/view-flight/:id" element={user ? <ViewFlight /> : <Navigate to="/login" />} />
        <Route path="/manage/payment-options" element={<PaymentOptions />} />
        <Route path="/manage/flight-status" element={<FlightStatus />} />
        <Route path="/manage/add-ons" element={<AddOns />} />
        <Route path="/travel-info/where-to-fly" element={<WhereToFly />} />
        <Route path="/travel-info/discover-philippines" element={<DiscoverPhilippines />} />
        <Route path="/about/who-we-are" element={<WhoAreWe />} />
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
