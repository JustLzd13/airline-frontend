import React, { useState, useEffect, useContext } from "react";
import { Container, Card, Button, Form, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import UserContext from "../UserContext"; // ✅ Import UserContext

const notyf = new Notyf({
  duration: 3000,
  position: { x: "right", y: "top" },
  types: [
    { type: "error", background: "red", icon: false },
    { type: "success", background: "green", icon: false },
  ],
});

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext); // ✅ Use UserContext
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    presentAddress: "",
    dateOfBirth: "",
  });

  const [editingField, setEditingField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    setProfile({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      mobileNumber: user.mobileNumber || "",
      presentAddress: user.presentAddress || "",
      dateOfBirth: user.dateOfBirth || "",
    });

    setLoading(false);
  }, [user, navigate]);

  const handleUpdate = async (field, value) => {
    const token = localStorage.getItem("token");
    if (!token) {
      notyf.error("Authentication failed. Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("https://airisle-api-3.onrender.com/users/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [field]: value }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      notyf.success(`${field.replace(/([A-Z])/g, " $1")} updated successfully!`);

      const updatedProfile = { ...profile, [field]: value };

      setProfile(updatedProfile);
      setUser(updatedProfile); // ✅ Updates global user state in UserContext
      setEditingField(null);
    } catch (err) {
      console.error("Error updating profile:", err);
      notyf.error("Update failed. Please try again.");
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="text-center mt-5">{error}</Alert>;

  return (
    <>
      <Container className="mt-4 pb-5 mb-4">
        <Card className="shadow-lg border-0 rounded p-4 text-center" style={{ backgroundColor: "#f8e48e" }}>
          <Card.Body>
            <h2 className="fw-bold text-dark">
              <i className="fas fa-user-circle me-2"></i> My Profile
            </h2>
            <p className="text-muted">View and update your profile details below.</p>

            <Row className="justify-content-center">
              <Col md={8}>
                {Object.entries(profile).map(([key, value]) => (
                  <Card className="shadow-sm border-0 rounded p-3 mb-3" key={key}>
                    <Card.Body className="d-flex align-items-center justify-content-between">
                      <div className="text-start">
                        <h6 className="fw-bold text-uppercase mb-1">{key.replace(/([A-Z])/g, " $1").trim()}</h6>
                        {editingField === key ? (
                          <Form.Control
                            type={key === "dateOfBirth" ? "date" : "text"}
                            value={value}
                            onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                          />
                        ) : (
                          <p className="mb-0">{value || "Not provided"}</p>
                        )}
                      </div>

                      {editingField === key ? (
                        <Button variant="success" size="sm" onClick={() => handleUpdate(key, profile[key])}>
                          Save
                        </Button>
                      ) : (
                        <Button variant="warning" size="sm" onClick={() => setEditingField(key)}>
                          Edit
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                ))}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default ProfilePage;
