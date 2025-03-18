import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, InputGroup, Card, Row, Col } from "react-bootstrap";
import { FaExchangeAlt, FaCalendarAlt } from "react-icons/fa";
import { Notyf } from "notyf";
import "notyf/notyf.min.css"; // ✅ Import Notyf CSS
import travelerImage from "../images/travel.png";
import newsData from "../mockdata/storiesMockData.json";
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

const Home = () => {
  const { user } = useContext(UserContext); // ✅ Use UserContext instead of prop drilling
  const navigate = useNavigate();

  const [from, setFrom] = useState("Manila");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [message, setMessage] = useState("Search your flight now!");

  // Handle Flight Search
  const handleSearch = async () => {
    if (!from || !to || !date) {
      notyf.error("Please fill in all fields.");
      return;
    }

    setMessage("Searching for flights...");

    try {
      const response = await fetch("https://airisle-api-3.onrender.com/flight/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from, to, dateOfFlight: date }),
      });

      const data = await response.json();

      if (Array.isArray(data)) {
        setFlights(data.slice(0, 6));
        setMessage(data.length > 0 ? "Available Flights:" : "No flights found.");
      } else {
        setFlights([]);
        setMessage("Invalid response from server.");
      }
    } catch (error) {
      console.error("Error fetching flights:", error);
      setMessage("Failed to retrieve flights. Please try again.");
      setFlights([]);
    }
  };

  // Redirect to Flight Details or Login if Not Logged In
  const goToFlightDetails = (flight) => {
    if (!user) {
      notyf.error("You must be logged in to view flight details. Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }
    navigate(`/view-flight/${flight._id}`);
  };

  return (
    <>
      <Container className="mt-4">
        <h1 className="text-center fw-bold">Welcome to SkyIsles Airline</h1>
        <p className="text-center">Book your next adventure with us and explore new destinations!</p>

        {/* Search Section */}
        <Card className="border shadow-sm p-3 mb-4">
          <Card.Body>
            <h4 className="text-center">Search for Flights</h4>
            <Form>
              <InputGroup className="mb-3">
                <Form.Control type="text" value={from} onChange={(e) => setFrom(e.target.value)} />
                <Button variant="light" onClick={() => { setFrom(to); setTo(from); }}>
                  <FaExchangeAlt />
                </Button>
                <Form.Control type="text" placeholder="Select destination..." value={to} onChange={(e) => setTo(e.target.value)} />
              </InputGroup>
              <InputGroup className="mb-3">
                <Button variant="light" disabled>
                  <FaCalendarAlt />
                </Button>
                <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </InputGroup>
              <Button variant="warning" className="w-100 fw-bold" onClick={handleSearch}>SEARCH FLIGHTS</Button>
            </Form>
          </Card.Body>
        </Card>

        {/* Search Results Section */}
        <Card className="border shadow-sm rounded p-3 mb-4">
          <Card.Body>
            <h4 className="text-center">{message}</h4>
            <Row className="justify-content-center">
              {flights.length > 0 ? (
                flights.map((flight) => (
                  <Col md={6} lg={4} key={flight._id}>
                    <Card className="mb-3 shadow-sm rounded text-center"
                          style={{ cursor: "pointer" }}
                          onClick={() => goToFlightDetails(flight)}>
                      <Card.Body>
                        <Card.Title className="fw-bold">{flight.airlineName}</Card.Title>
                        <Card.Text>
                          <strong>Flight Number:</strong> {flight.flightNumber}<br />
                          <strong>From:</strong> {flight.from} → <strong>To:</strong> {flight.to}<br />
                          <strong>Departure Time:</strong> {flight.departureTime}<br />
                          <strong>Flight Date:</strong> {new Date(flight.dateOfFlight).toLocaleDateString()}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <p className="text-muted text-center">No flights found.</p>
              )}
            </Row>
          </Card.Body>
        </Card>
      </Container>

      {/* Travel Section */}
      <div className="mt-4 p-4" style={{ backgroundColor: "#f8e48e", borderRadius: "10px" }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h3 className="fw-bold text-center">Why Do We Need to Travel?</h3>
              <p>Traveling enriches our lives by exposing us to new cultures, experiences, and perspectives.</p>
            </Col>
            <Col md={6} className="text-center">
              <img src={travelerImage} alt="Traveler at airport" className="img-fluid rounded"
                   style={{ maxHeight: "250px", borderRadius: "5px", border: "4px solid #FFD700" }} />
            </Col>
          </Row>
        </Container>
      </div>

      {/* News Section */}
      <div className="mt-4">
        <Container>
          <h3 className="fw-bold">Latest News and Stories</h3>
          <NewsSection />
        </Container>
        <Footer />
      </div>
    </>
  );
};

// News Section with Show More / Show Less
const NewsSection = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [expanded, setExpanded] = useState(false);

  const toggleShowMore = () => {
    setVisibleCount(expanded ? 3 : newsData.length);
    setExpanded(!expanded);
  };

  return (
    <>
      <Row className="justify-content-center">
        {newsData.slice(0, visibleCount).map((news, index) => (
          <Col md={4} key={index} className="mb-3">
            <Card className="border-0">
              <Card.Body>
                <Card.Title className="fw-bold">{news.title}</Card.Title>
                <Card.Text>{news.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-3 mb-5">
        <Button variant="dark" onClick={toggleShowMore}>
          {expanded ? "Show Less" : "Show More"}
        </Button>
      </div>
    </>
  );
};

export default Home;
