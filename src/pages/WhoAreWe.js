import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Footer from "../components/Footer";

const WhoWeAre = () => {
  return (
    <>
      <Container className="mt-5 mb-5 pb-5">
        <h2 className="text-center mb-4">Who We Are</h2>
        <p className="text-center mb-5 px-3">
          AirIsle App is your trusted companion for seamless and hassle-free flight bookings. We are committed to providing travelers with an intuitive and efficient platform to compare flights, find the best deals, and book their journeys with confidence.
        </p>
        
        <Row className="justify-content-center">
          <Col md={6} className="mb-4">
            <Card className="shadow-lg border-0">
              <Card.Img
                variant="top"
                src="https://media.istockphoto.com/id/893272476/photo/philippine-airlines-at-caticlan-airport.jpg?s=612x612&w=0&k=20&c=ROvupHU8wq3PbvJ2tGU6UDjPis5lXfIAHK5UqGZRFGY="
                style={{ height: "300px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title className="fw-bold">Our Mission</Card.Title>
                <Card.Text>
                  At AirIsle, our mission is to revolutionize the way people travel by making flight booking easy, accessible, and stress-free. We aim to provide travelers with a seamless digital experience, ensuring they can find the best flights at the most competitive prices. Our platform is built to offer real-time updates, transparent pricing, and personalized recommendations tailored to each traveler’s needs. We strive to eliminate the hassle of flight booking by offering a user-friendly interface, excellent customer service, and innovative technology that makes the process faster, safer, and more efficient.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="shadow-lg border-0">
              <Card.Img
                variant="top"
                src="https://adminsite.viags.vn/Data/Sites/1/News/23/z5386822544630_5f273bcca705d7a97eb5d31b4f61ab34.jpg"
                style={{ height: "300px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title className="fw-bold">Our Vision</Card.Title>
                <Card.Text>
                  Our vision is to be the world’s leading flight booking platform, empowering travelers with the ability to explore the world effortlessly. We envision a future where booking a flight is as simple as a single click, where travelers can instantly access the best deals and make informed decisions with confidence. Through continuous innovation and customer-centric solutions, we seek to bridge the gap between technology and travel, creating a smarter, more connected way to fly. By leveraging advanced analytics, AI-powered recommendations, and a robust global network of airline partnerships, we are committed to setting new industry standards in convenience, affordability, and customer satisfaction.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default WhoWeAre;
