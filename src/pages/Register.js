import React, { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const Register = () => {
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

      notyf.success("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Error during registration:", error);
      setError(error.message);
      notyf.error(error.message);
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
              <Form.Group className="mt-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="firstName" placeholder="Enter First Name" value={formData.firstName} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="lastName" placeholder="Enter Last Name" value={formData.lastName} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Enter Password (min 6 chars)" value={formData.password} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control type="text" name="mobileNumber" placeholder="Enter Mobile Number" value={formData.mobileNumber} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Present Address</Form.Label>
                <Form.Control type="text" name="presentAddress" placeholder="Enter Address" value={formData.presentAddress} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
              </Form.Group>

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
