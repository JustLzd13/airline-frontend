import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import Footer from "../components/Footer";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import UserContext from "../UserContext"; // Import UserContext

const notyf = new Notyf({
  duration: 3000,
  position: { x: "right", y: "top" },
  types: [
    { type: "error", background: "red", icon: false },
    { type: "success", background: "green", icon: false },
  ],
});

const Login = () => {
  const { setUser } = useContext(UserContext); // Use UserContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://airisle-api-3.onrender.com/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      // ✅ Save token in localStorage
      localStorage.setItem("token", data.access);
      console.log("Token saved:", data.access);

      // ✅ Fetch user profile after login
      await fetchUserProfile();
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message);
      notyf.error(err.message);
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found, please log in again.");
      notyf.error("No token found.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://airisle-api-3.onrender.com/users/user-profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unauthorized access.");
      }

      console.log("User profile loaded:", data.user);

      // ✅ Update global user state
      setUser(data.user);
      notyf.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Profile Fetch Error:", error);
      setError("Failed to load profile.");
      notyf.error("Error loading profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          background: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Boracay_White_Beach.png/1200px-Boracay_White_Beach.png") no-repeat center center/cover`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(5px)",
            zIndex: 1,
          }}
        />
        <Card
          style={{
            width: "400px",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            zIndex: 2,
          }}
          className="shadow p-4"
        >
          <h2 className="text-center fw-bold">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="warning" type="submit" className="w-100 fw-bold" disabled={loading}>
              {loading ? <Spinner size="sm" animation="border" /> : "Login"}
            </Button>
          </Form>

          {/* "No account? Sign up" section */}
          <div className="text-center mt-3">
            <p>
              No account yet?{" "}
              <span
                style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                onClick={() => navigate("/register")}
              >
                Sign up now!
              </span>
            </p>
          </div>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default Login;
