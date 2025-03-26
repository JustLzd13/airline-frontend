import React, { useEffect, useState, useContext } from "react";
import { Container, Card, Button, Spinner, Alert, Row, Col, Badge, Modal, Form } from "react-bootstrap";
import { FaPlane, FaCalendarAlt, FaUsers, FaMoneyBillWave, FaCheckCircle, FaTimesCircle, FaCreditCard, FaClock, FaBuilding } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
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
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Modal States
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  useEffect(() => {
    if (!user || !user._id) {
      notyf.error("You must be logged in to view your bookings.");
      setTimeout(() => navigate("/login"), 2000);
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `https://airisle-api-3.onrender.com/booking/user?userId=${user._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
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

  // ✅ Handle Payment Button Click (Open Modal)
  const handleProceedToPayment = (booking) => {
    console.log("Opening modal for:", booking);
    setSelectedBooking(booking);
    setShowModal(true);
  };

  // ✅ Handle Closing Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  // ✅ Handle Payment Submission
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBooking) {
      notyf.error("No booking selected.");
      return;
    }

    const paymentData = {
      bookingId: selectedBooking._id,
      flightId: selectedBooking.flightId,
      paymentMethod,
      amount: selectedBooking.totalPrice,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://airisle-api-3.onrender.com/booking/process-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();

      if (response.ok) {
        notyf.success("Payment successful! Booking confirmed.");
        setShowModal(false);
        setBookings((prev) =>
          prev.map((b) =>
            b._id === selectedBooking._id ? { ...b, bookingStatus: "Confirmed", paymentStatus: "Paid" } : b
          )
        );
      } else {
        throw new Error(data.message || "Payment failed.");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      notyf.error(error.message);
    }
  };

  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  }

  if (error) {
    return <Alert variant="danger" className="text-center mt-5">{error}</Alert>;
  }

  return (
    <>
      <Container className="mt-4 pb-5 mb-4" style={{ minHeight: "60vh" }}>
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
                    
                    {/* ✅ Flight Details */}
                    <p className="text-center text-muted">Flight ID: {booking.flightId?._id}</p>
                    <p className="text-center">
                      <FaBuilding className="me-2 text-dark" /> Airline: <strong>{booking.flightId?.airlineName || "Unknown"}</strong>
                    </p>
                    <p className="text-center">
                      <FaPlane className="me-2 text-primary" /> Flight Number: <strong>{booking.flightId?.flightNumber || "N/A"}</strong>
                    </p>
                    <p className="text-center">
                      ✈️ From: <strong>{booking.flightId?.from}</strong> → To: <strong>{booking.flightId?.to}</strong>
                    </p>
                    <p className="text-center">
                      <FaClock className="me-2 text-info" /> Departure: {booking.flightId?.departureTime}
                    </p>
                    <p className="text-center">
                      <FaClock className="me-2 text-success" /> Arrival: {booking.flightId?.arrivalTime}
                    </p>

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
                   <p className="text-center">
                     {booking.paymentStatus === "Paid" ? (
                       <Badge bg="success"><FaCheckCircle className="me-1" /> Paid</Badge>
                     ) : (
                       <Badge bg="danger"><FaTimesCircle className="me-1" /> Upaid</Badge>
                     )}
                   </p>
                    {booking.bookingStatus !== "Confirmed" && (
                      <Button variant="primary" className="w-100 mt-3" onClick={() => handleProceedToPayment(booking)}>
                        <FaCreditCard className="me-2" /> Proceed to Payment
                      </Button>
                    )}
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

      {/* ✅ Payment Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePaymentSubmit}>
            {/* ✅ Payment Method Selection */}
            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Select 
                value={paymentMethod} 
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Gcash">Gcash</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </Form.Select>
            </Form.Group>

            {/* ✅ Display Total Amount */}
            <p className="fw-bold text-center">Total Amount: <span className="text-success">${selectedBooking?.totalPrice}</span></p>

            <Button variant="success" type="submit" className="w-100">
              Confirm Payment
            </Button>
          </Form>
        </Modal.Body>
      </Modal>


      <Footer />
    </>
  );
};

export default Bookings;
