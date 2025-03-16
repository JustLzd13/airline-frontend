import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Footer from "../components/Footer";
import UserContext from "../UserContext";

const Book = () => {
  const { id: flightId } = useParams(); // Get flight ID from URL
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Get user context
  const notyf = new Notyf();

  const [passengers, setPassengers] = useState([
    {
      fullName: "",
      passengerAddress: "",
      passengerAge: "",
      passengerEmail: "",
      passengerCpNo: "",
      passengerFlightType: "Economy",
      passengerFee: 500, // Default for economy
    },
  ]);

  const [bookingDate] = useState(new Date().toISOString().split("T")[0]);
  const [totalPrice, setTotalPrice] = useState(500);
  const [bookingStatus] = useState("Pending");

  useEffect(() => {
    // Calculate total price dynamically based on passenger fees
    const total = passengers.reduce((sum, p) => sum + parseFloat(p.passengerFee || 0), 0);
    setTotalPrice(total);
  }, [passengers]);

  const handleAddPassenger = () => {
    setPassengers([
      ...passengers,
      {
        fullName: "",
        passengerAddress: "",
        passengerAge: "",
        passengerEmail: "",
        passengerCpNo: "",
        passengerFlightType: "Economy",
        passengerFee: 500,
      },
    ]);
  };

  const handleRemovePassenger = (index) => {
    if (passengers.length > 1) {
      const updatedPassengers = passengers.filter((_, i) => i !== index);
      setPassengers(updatedPassengers);
    } else {
      notyf.error("You must have at least one passenger.");
    }
  };

  const handlePassengerChange = (e, index) => {
    const { name, value } = e.target;
    const updatedPassengers = [...passengers];
    
    updatedPassengers[index][name] = value;

    // Update passenger fee based on flight type selection
    if (name === "passengerFlightType") {
      const fees = { Economy: 500, Business: 1000, "First Class": 1500 };
      updatedPassengers[index].passengerFee = fees[value] || 500;
    }

    setPassengers(updatedPassengers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.id) {
      notyf.error("You must be logged in to book a flight.");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    const bookingData = {
      userId: user.id,
      flightId: flightId,
      passengers: passengers,
      bookingDate: bookingDate,
      totalPrice: totalPrice,
      bookingStatus: bookingStatus,
    };

    try {
      const response = await fetch("https://airisle-api-3.onrender.com/booking/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (response.ok) {
        notyf.success("Booking successful! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        throw new Error(data.message || "Booking failed.");
      }
    } catch (err) {
      console.error("Error during booking:", err);
      notyf.error(err.message);
    }
  };

  return (
    <>
      <Container className="mt-4 pb-5 mb-4">
        <Card className="shadow-lg border-0 rounded p-4" style={{ backgroundColor: "#f8e48e" }}>
          <Card.Body>
            <h2 className="fw-bold text-dark text-center">
              <i className="fas fa-ticket-alt me-2"></i> Flight Booking
            </h2>
            <p className="text-muted text-center">
              Complete the form below to book your flight.
            </p>

            <Form onSubmit={handleSubmit}>
              {/* Booking Date */}
              <Form.Group className="mb-3">
                <Form.Label>Booking Date</Form.Label>
                <Form.Control type="date" value={bookingDate} readOnly />
              </Form.Group>

              {/* Passenger Details */}
              {passengers.map((passenger, index) => (
                <Card key={index} className="mb-3 p-3 shadow-sm">
                  <h5 className="text-center fw-bold">Passenger {index + 1}</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={passenger.fullName}
                      onChange={(e) => handlePassengerChange(e, index)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="passengerAddress"
                      value={passenger.passengerAddress}
                      onChange={(e) => handlePassengerChange(e, index)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="passengerAge"
                      value={passenger.passengerAge}
                      onChange={(e) => handlePassengerChange(e, index)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="passengerEmail"
                      value={passenger.passengerEmail}
                      onChange={(e) => handlePassengerChange(e, index)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="passengerCpNo"
                      value={passenger.passengerCpNo}
                      onChange={(e) => handlePassengerChange(e, index)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Flight Type</Form.Label>
                    <Form.Select
                      name="passengerFlightType"
                      value={passenger.passengerFlightType}
                      onChange={(e) => handlePassengerChange(e, index)}
                      required
                    >
                      <option value="Economy">Economy - $500</option>
                      <option value="Business">Business - $1000</option>
                      <option value="First Class">First Class - $1500</option>
                    </Form.Select>
                  </Form.Group>

                  <Button variant="danger" size="sm" onClick={() => handleRemovePassenger(index)}>
                    Remove Passenger
                  </Button>
                </Card>
              ))}

              <div className="text-center">
                <Button variant="secondary" className="me-3" onClick={handleAddPassenger}>
                  Add Another Passenger
                </Button>
                <Button variant="warning" type="submit">
                  Complete Booking
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>

      <Footer />
    </>
  );
};

export default Book;
