import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Spinner, Alert, Row, Col, Badge } from "react-bootstrap";
import { FaPlane, FaClock, FaCalendarAlt, FaMapMarkerAlt, FaArrowRight, FaCheckCircle, FaTimesCircle, FaChair } from "react-icons/fa";
import AppNavbar from "../components/AppNavbar";
import Footer from "../components/Footer";
import UserContext from "../UserContext"; // ✅ Import UserContext

const ViewFlight = () => {
  const { id } = useParams(); // Get flight ID from URL
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // ✅ Use UserContext

  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login"); // ✅ Redirect if not logged in
      return;
    }

    const fetchFlightDetails = async () => {
      try {
        console.log("Fetching flight details for ID:", id);

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication failed. Please log in.");
        }

        const response = await fetch(`https://airisle-api-3.onrender.com/flight/details/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Include token
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Flight not found (HTTP ${response.status})`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (!data || Object.keys(data).length === 0) {
          throw new Error("No flight details available.");
        }

        setFlight(data);
      } catch (err) {
        console.error("Error fetching flight details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlightDetails();
  }, [id, user, navigate]);

  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  }

  if (error) {
    return <Alert variant="danger" className="text-center mt-5">{error}</Alert>;
  }

  // Helper function to display status badges
  const getFlightStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "scheduled":
        return <Badge bg="primary"><FaCheckCircle className="me-1" /> Scheduled</Badge>;
      case "on time":
        return <Badge bg="success"><FaCheckCircle className="me-1" /> On Time</Badge>;
      case "delayed":
        return <Badge bg="warning text-dark"><FaClock className="me-1" /> Delayed</Badge>;
      case "departed":
        return <Badge bg="info"><FaPlane className="me-1" /> Departed</Badge>;
      case "cancelled":
        return <Badge bg="danger"><FaTimesCircle className="me-1" /> Cancelled</Badge>;
      default:
        return <Badge bg="secondary">{status || "Unknown"}</Badge>;
    }
  };

  // Format date and time
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();
  const formatTime = (timeString) => new Date(timeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <Container className="mt-4 pb-5 mb-4">
        <Card className="shadow-lg border-0 rounded p-4" style={{ backgroundColor: "#f8e48e" }}>
          <Card.Body>
            <h2 className="fw-bold text-dark text-center">
              <FaPlane className="me-2" /> {flight.airlineName} - Flight Details
            </h2>
            <p className="text-muted text-center">Flight Number: <strong>{flight.flightNumber}</strong></p>

            {/* Flight Status */}
            <div className="text-center mb-3">
              {getFlightStatusBadge(flight.flightStatus)}
            </div>

            {/* Flight Details */}
            <Card className="shadow-sm border-0 my-4 p-3">
              <Card.Body>
                <h4 className="text-center mb-4 fw-bold">Flight Information</h4>
                <Row className="text-center">
                  <Col md={5}>
                    <h5><FaMapMarkerAlt className="me-2 text-primary" /> Departure</h5>
                    <p className="fw-bold">{flight.from}</p>
                  </Col>
                  <Col md={2} className="d-flex align-items-center justify-content-center">
                    <FaArrowRight size={30} className="text-warning" />
                  </Col>
                  <Col md={5}>
                    <h5><FaMapMarkerAlt className="me-2 text-danger" /> Arrival</h5>
                    <p className="fw-bold">{flight.to}</p>
                  </Col>
                </Row>
                <hr />
                <Row className="text-center">
                  <Col md={6}>
                    <h5><FaCalendarAlt className="me-2 text-success" /> Flight Date</h5>
                    <p className="fw-bold">{formatDate(flight.dateOfFlight)}</p>
                  </Col>
                  <Col md={6}>
                    <h5><FaClock className="me-2 text-info" /> Departure Time</h5>
                    <p className="fw-bold">{formatTime(flight.departureTime)}</p>
                  </Col>
                </Row>
                <Row className="text-center mt-3">
                  <Col md={6}>
                    <h5><FaClock className="me-2 text-primary" /> Arrival Time</h5>
                    <p className="fw-bold">{formatTime(flight.arrivalTime)}</p>
                  </Col>
                  <Col md={6}>
                    <h5><FaChair className="me-2 text-dark" /> Available Seats</h5>
                    <p className="fw-bold">{flight.availableSeats} / {flight.seatCapacity}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <div className="text-center">
              <Button variant="dark" className="me-3" onClick={() => navigate("/")}>
                Back to Home
              </Button>
              {/* Navigate to the booking page with the flight ID */}
              <Button variant="warning" onClick={() => navigate(`/book/${flight._id}`)}>
                Book This Flight
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>

      <Footer />
    </>
  );
};

export default ViewFlight;
