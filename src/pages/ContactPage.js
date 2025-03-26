import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import emailjs from "@emailjs/browser";
import Footer from "../components/Footer";

const teamMembers = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+123 456 7890",
    facebook: "https://facebook.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Jane Smith",
    email: "janesmith@example.com",
    phone: "+987 654 3210",
    facebook: "https://facebook.com/janesmith",
    linkedin: "https://linkedin.com/in/janesmith",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Robert Brown",
    email: "robertbrown@example.com",
    phone: "+321 654 9870",
    facebook: "https://facebook.com/robertbrown",
    linkedin: "https://linkedin.com/in/robertbrown",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    name: "Emily Davis",
    email: "emilydavis@example.com",
    phone: "+654 321 7890",
    facebook: "https://facebook.com/emilydavis",
    linkedin: "https://linkedin.com/in/emilydavis",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    name: "Michael Johnson",
    email: "michaeljohnson@example.com",
    phone: "+789 123 4560",
    facebook: "https://facebook.com/michaeljohnson",
    linkedin: "https://linkedin.com/in/michaeljohnson",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];

const ContactPage = () => {
  const notyf = new Notyf({
    duration: 3000,
    position: { x: "right", y: "top" },
    types: [
      { type: "error", background: "red", icon: false },
      { type: "success", background: "green", icon: false },
    ],
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
      notyf.error("Please fill in all fields before submitting.");
      return;
    }
    if (!isValidEmail(formData.email)) {
      notyf.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    const emailParams = {
      from_name: formData.fullName,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };
    try {
      await emailjs.send("service_rz62w8w", "template_2kn79kh", emailParams, "8Sit4zZ5Lh-odI-bQ");
      setLoading(false);
      notyf.success("Your message has been sent successfully!");
      setFormData({ fullName: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      notyf.error("Failed to send message. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Container className="mt-5 mb-5 pb-5">
        <h2 className="text-center mb-4">Meet Our Team</h2>
        <Row className="justify-content-center">
          {teamMembers.map((member, index) => (
            <Col md={4} className="mb-4 d-flex justify-content-center" key={index}>
              <Card className="shadow-lg border-0" style={{ width: "18rem" }}>
                <Card.Img variant="top" src={member.image} style={{ height: "250px", objectFit: "cover" }} />
                <Card.Body className="text-center">
                  <Card.Title className="fw-bold">{member.name}</Card.Title>
                  <Card.Text>Email: {member.email}</Card.Text>
                  <Card.Text>Phone: {member.phone}</Card.Text>
                  <div className="d-flex justify-content-center gap-2">
                    <Button variant="primary" href={member.facebook} target="_blank">Facebook</Button>
                    <Button variant="info" href={member.linkedin} target="_blank">LinkedIn</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Card className="shadow-lg border-0 rounded p-4" style={{ backgroundColor: "#f8e48e" }}>
          <Card.Body>
            <h2 className="fw-bold text-dark text-center"><i className="fas fa-envelope me-2"></i> Contact Us</h2>
            <p className="text-muted text-center">Have questions? Get in touch with us by filling out the form below.</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text" name="subject" value={formData.subject} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" name="message" value={formData.message} onChange={handleChange} rows={4} required />
              </Form.Group>
              <div className="text-center">
                <Button variant="warning" type="submit" disabled={loading}>{loading ? <Spinner animation="border" size="sm" /> : "Send Message"}</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default ContactPage;
