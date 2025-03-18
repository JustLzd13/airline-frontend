import React, { useEffect, useState, useContext } from "react";
import { Container, Card, Button, Spinner, Alert, Row, Col, Badge } from "react-bootstrap";
import { FaPlane, FaCalendarAlt, FaUsers, FaMoneyBillWave, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext"; // ✅ Import UserContext
import Footer from "../components/Footer";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf({
  duration: 3000,
  position: { x: "right", y: "top" },
  types: [
    { type: "error", background: "red", icon: false },
    { type: "success", background: "green", icon: false },
  ],
});

const Bookings = () => {
  const { user } = useContext(UserContext); // ✅ Use UserContext
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Redirect user if not logged in
  useEffect(() => {
    console.log("User context in Bookings.js:", user);
    
    if (!user || !user._id) {  // ✅ Ensure user._id exists
      notyf.error("You must be logged in to view your bookings.");
      setTimeout(() => navigate("/login"), 2000);
    }
  }, [user, navigate]);


  useEffect(() => {
    const fetchBookings = async () => {
       console.log("User context in Bookings.js:", user); // ✅ Debugging line
      

      const token = localStorage.getItem("token"); // ✅ Get token from localStorage

      try {
        const response = await fetch(
          `https://airisle-api-3.onrender.com/booking/user?userId=${user._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // ✅ Include Bearer Token
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch bookings (HTTP ${response.status})`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Unexpected response from server.");
        }

        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("No Bookings Yet.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user?.id]);

  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  }

  if (error) {
    return <Alert variant="danger" className="text-center mt-5">{error}</Alert>;
  }

  return (
    <>
      <Container className="mt-4 pb-5 mb-4">
        <h2 className="fw-bold text-center text-dark">
          <FaPlane className="me-2" /> My Bookings
        </h2>
        <Row className="justify-content-center">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <Col md={6} lg={4} key={booking._id} className="mb-4">
                <Card className="shadow-lg border-0 rounded p-3" style={{ backgroundColor: "#f8e48e" }}>
                  <Card.Body>
                    <h5 className="fw-bold text-center">Booking ID: {booking._id}</h5>
                    <p className="text-center text-muted">Flight ID: {booking.flightId}</p>
                    <p className="text-center">
                      <FaCalendarAlt className="me-2 text-success" /> Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}
                    </p>
                    <p className="text-center">
                      <FaUsers className="me-2 text-primary" /> Passengers: {booking.passengers.length}
                    </p>
                    <p className="text-center">
                      <FaMoneyBillWave className="me-2 text-dark" /> Total Price: ${booking.totalPrice}
                    </p>
                    <p className="text-center">
                      {booking.bookingStatus === "Confirmed" ? (
                        <Badge bg="success"><FaCheckCircle className="me-1" /> Confirmed</Badge>
                      ) : (
                        <Badge bg="warning"><FaTimesCircle className="me-1" /> Pending</Badge>
                      )}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <div className="text-center mt-5">
              <h5 className="text-muted">No bookings found.</h5>
              <Button variant="warning" className="mt-3" onClick={() => navigate("/book")}>
                Book a Flight Now
              </Button>
            </div>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Bookings;
