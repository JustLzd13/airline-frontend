import React, { useEffect, useState, useContext } from "react";
import { Container, Card, Button, Spinner, Alert, Row, Col, Badge } from "react-bootstrap";
import { FaPlane, FaCalendarAlt, FaUsers, FaMoneyBillWave, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import UserContext from "../UserContext";
import Footer from "../components/Footer";

const Bookings = () => {
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user.id) {
        setError("You must be logged in to view your bookings.");
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token"); // ✅ Get token from localStorage

      try {
        const response = await fetch(
          `https://airisle-api-3.onrender.com/booking/user?userId=${user.id}`,
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
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to retrieve bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user.id]);

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
                      <FaCalendarAlt className="me-2 text-success" /> Booking Date: {booking.bookingDate}
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
            <p className="text-center text-muted">No bookings found.</p>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Bookings;
