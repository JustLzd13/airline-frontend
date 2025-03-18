import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { FaPlaneDeparture, FaHome } from "react-icons/fa";
import Footer from "../components/Footer";

const Error = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Background Wrapper */}
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          background: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Boracay_White_Beach.png/1200px-Boracay_White_Beach.png") no-repeat center center/cover`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Overlay */}
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

        {/* Error Card */}
        <Container className="position-relative" style={{ zIndex: 2 }}>
          <Card
            className="p-4 shadow-lg text-center"
            style={{
              maxWidth: "500px",
              margin: "auto",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "10px",
            }}
          >
            <h1 className="fw-bold text-danger">404</h1>
            <h4 className="text-dark fw-bold">Oops! You’ve Lost Your Way</h4>
            <p className="text-muted">
              It looks like you’re trying to land on a page that doesn’t exist.
              But don’t worry, you can still book your next adventure!
            </p>

            {/* Plane Icon */}
            <FaPlaneDeparture size={50} className="text-warning my-3" />

            {/* Navigation Buttons */}
            <Button
              variant="dark"
              className="fw-bold w-100 mb-2"
              onClick={() => navigate("/")}
              aria-label="Back to Home"
            >
              <FaHome className="me-2" /> Back to Home
            </Button>
            <Button
              variant="warning"
              className="fw-bold w-100"
              onClick={() => navigate("/book/flights")}
              aria-label="Book a Flight"
            >
              Book a Flight
            </Button>
          </Card>
        </Container>
      </div>

      <Footer />
    </>
  );
};

export default Error;
