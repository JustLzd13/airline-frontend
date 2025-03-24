import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Footer from "../components/Footer";
import UserContext from "../UserContext"; // ✅ Import UserContext

const Book = () => {
  const { id: flightId } = useParams(); // Get flight ID from URL
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // ✅ Use UserContext
  const notyf = new Notyf();

  const [loading, setLoading] = useState(false);
  const [passengers, setPassengers] = useState([
    {
      fullName: "",
      passengerAddress: "",
      passengerAge: "",
      passengerEmail: "",
      passengerCpNo: "",
      passengerFlightType: "Economy",
      passengerFee: 3000, // Default for economy
    },
  ]);

  const [bookingDate] = useState(new Date().toISOString().split("T")[0]);
  const [totalPrice, setTotalPrice] = useState(3000);
  const [bookingStatus] = useState("Pending");

  // ✅ Redirect user if flightId is missing
  useEffect(() => {
    if (!flightId) {
      notyf.error("Invalid flight selection.");
      setTimeout(() => navigate("/"), 3000);
    }
  }, [flightId, navigate]);

  // ✅ Redirect user to login if not authenticated
  useEffect(() => {
    if (!user) {
      notyf.error("You must be logged in to book a flight.");
      setTimeout(() => navigate("/login"), 2000);
    }
  }, [user, navigate]);

  // ✅ Calculate total price dynamically
  useEffect(() => {
    const total = passengers.reduce((sum, p) => sum + parseFloat(p.passengerFee || 0), 0);
    setTotalPrice(total);
  }, [passengers]);

  // ✅ Add a new passenger
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

  // ✅ Remove a passenger
  const handleRemovePassenger = (index) => {
    if (passengers.length > 1) {
      const updatedPassengers = passengers.filter((_, i) => i !== index);
      setPassengers(updatedPassengers);
    } else {
      notyf.error("You must have at least one passenger.");
    }
  };

  // ✅ Handle input changes and update passenger fee
  const handlePassengerChange = (e, index) => {
    const { name, value } = e.target;
    const updatedPassengers = [...passengers];

    updatedPassengers[index][name] = value;

    if (name === "passengerFlightType") {
      const fees = { Economy: 3000, Business: 4500, "First Class": 5000 };
      updatedPassengers[index].passengerFee = fees[value] || 3000;
    }

    setPassengers(updatedPassengers);
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user?._id) {
      notyf.error("You must be logged in to book a flight.");
      setTimeout(() => navigate("/login"), 2000);
      setLoading(false);
      return;
    }

    if (!flightId) {
      notyf.error("Invalid flight selection.");
      setLoading(false);
      return;
    }

    // ✅ Validate passenger details before submitting
    for (const passenger of passengers) {
      if (!passenger.fullName || !passenger.passengerAddress || !passenger.passengerEmail || !passenger.passengerCpNo || !passenger.passengerAge) {
        notyf.error("All passenger fields must be filled.");
        setLoading(false);
        return;
      }
    }

    const bookingData = {
      userId: user._id,
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
          navigate("/bookings");
        }, 2000);
      } else {
        throw new Error(data.message || "Booking failed.");
      }
    } catch (err) {
      console.error("Error during booking:", err);
      notyf.error(err.message);
    } finally {
      setLoading(false);
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
                    <Form.Control type="text" name="fullName" value={passenger.fullName} onChange={(e) => handlePassengerChange(e, index)} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="passengerAddress" value={passenger.passengerAddress} onChange={(e) => handlePassengerChange(e, index)} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" name="passengerAge" value={passenger.passengerAge} onChange={(e) => handlePassengerChange(e, index)} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="passengerEmail" value={passenger.passengerEmail} onChange={(e) => handlePassengerChange(e, index)} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="text" name="passengerCpNo" value={passenger.passengerCpNo} onChange={(e) => handlePassengerChange(e, index)} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                   <Form.Label>Flight Type</Form.Label>
                   <Form.Select
                     name="passengerFlightType"
                     value={passenger.passengerFlightType}
                     onChange={(e) => handlePassengerChange(e, index)}
                     required
                   >
                     <option value="Economy">Economy - ₱3000</option>
                     <option value="Business">Business - ₱4500</option>
                     <option value="First Class">First Class - ₱5000</option>
                   </Form.Select>
                 </Form.Group>

                  <Button variant="danger" size="sm" onClick={() => handleRemovePassenger(index)}>Remove Passenger</Button>
                </Card>
              ))}

              <div className="text-center">
                <Button variant="secondary" className="me-3" onClick={handleAddPassenger}>Add Another Passenger</Button>
                <Button variant="warning" type="submit" disabled={loading}>{loading ? "Processing..." : "Complete Booking"}</Button>
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
