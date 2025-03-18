import React, { useState, useContext } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import UserContext from "../UserContext"; // ✅ Import UserContext

const Register = () => {
  const { setUser } = useContext(UserContext); // ✅ Use UserContext
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "",
    presentAddress: "",
    dateOfBirth: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const notyf = new Notyf({ duration: 3000, position: { x: "right", y: "top" } });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 🔍 Validate input fields
    for (let key in formData) {
      if (!formData[key]) {
        setError(`Please fill in the ${key.replace(/([A-Z])/g, " $1")}`);
        return;
      }
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await fetch("https://airisle-api-3.onrender.com/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      notyf.success("Registration successful! Logging you in...");

      // ✅ Automatically login after registration
      await handleLogin(formData.email, formData.password);
    } catch (error) {
      console.error("Error during registration:", error);
      setError(error.message);
      notyf.error(error.message);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("https://airisle-api-3.onrender.com/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      // ✅ Save token in localStorage
      localStorage.setItem("token", data.access);

      // ✅ Fetch user profile after login
      await fetchUserProfile();
    } catch (err) {
      console.error("Login error:", err.message);
      setError("Registration successful, but auto-login failed. Please login manually.");
      notyf.error("Auto-login failed. Try logging in.");
      navigate("/login");
    }
  };

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found, please log in again.");
      notyf.error("No token found.");
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
      notyf.success("Welcome! Redirecting...");
      navigate("/");
    } catch (error) {
      console.error("Profile Fetch Error:", error);
      setError("Failed to load profile.");
      notyf.error("Error loading profile.");
      navigate("/login");
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
          background: `url("https://t4.ftcdn.net/jpg/02/65/26/83/360_F_265268314_LmykO3vrtzmh3TQbBdnxj9vUczqqJXCU.jpg") no-repeat center center/cover`,
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
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(5px)",
            zIndex: 1,
          }}
        />

        {/* Registration Card */}
        <Container className="position-relative" style={{ zIndex: 2 }}>
          <Card
            className="p-4 shadow-lg"
            style={{
              maxWidth: "450px",
              margin: "auto",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "10px",
            }}
          >
            <h2 className="text-center fw-bold">Register</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              {["firstName", "lastName", "email", "password", "mobileNumber", "presentAddress", "dateOfBirth"].map(
                (field, index) => (
                  <Form.Group className="mt-3" key={index}>
                    <Form.Label>{field.replace(/([A-Z])/g, " $1")}</Form.Label>
                    <Form.Control
                      type={field === "password" ? "password" : field === "dateOfBirth" ? "date" : "text"}
                      name={field}
                      placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                )
              )}

              <Button variant="warning" type="submit" className="mt-4 w-100 fw-bold shadow-sm">
                Register
              </Button>
            </Form>

            <div className="text-center mt-3">
              <p>
                Already have an account?{" "}
                <a href="/login" style={{ textDecoration: "none", fontWeight: "bold", color: "#333" }}>
                  Login
                </a>
              </p>
            </div>
          </Card>
        </Container>
      </div>

      {/* Footer Appears Below */}
      <Footer />
    </>
  );
};

export default Register;
