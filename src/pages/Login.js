import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import Footer from "../components/Footer";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import UserContext from "../UserContext"; // ✅ Import UserContext

const Login = () => {
  const { setUser } = useContext(UserContext); // ✅ Access UserContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const notyf = new Notyf();

  const handleLogin = async (e) => {
  e.preventDefault();
  setError(""); // Clear previous errors

  try {
    const response = await fetch("https://airisle-api-3.onrender.com/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("Full API Response:", data);

    if (!data.access) {
      throw new Error("Invalid login credentials");
    }

    if (!data.user) {
      console.warn("Warning: User details not received, only token was provided.");
    }

    // ✅ Store token and user details (if available)
    localStorage.setItem("token", data.access);
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    // ✅ Update UserContext
    setUser(data.user || { id: null, firstName: "Guest", isAdmin: false });

    notyf.success("Login successful! Redirecting...");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  } catch (err) {
    setError(err.message);
    notyf.error(err.message);
  }
};

  return (
    <>
      {/* Background Wrapper with Blur & Dark Overlay */}
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
        {/* Dark Overlay with Blur */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Darken effect
            backdropFilter: "blur(5px)", // Blur effect
            zIndex: 1, // Ensures it stays above background
          }}
        />

        {/* Login Card */}
        <Card
          style={{
            width: "400px",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            zIndex: 2, // Ensures form stays above overlay
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

            <Button variant="warning" type="submit" className="w-100 fw-bold">
              Login
            </Button>
          </Form>

          <div className="text-center mt-3">
            <p>
              Don't have an account?{" "}
              <a href="/register" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>
                Sign Up
              </a>
            </p>
          </div>
        </Card>
      </div>

      {/* Footer Appears Below */}
      <Footer />
    </>
  );
};

export default Login;
