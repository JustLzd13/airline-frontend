import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import emailjs from "@emailjs/browser"; // ✅ Import EmailJS
import Footer from "../components/Footer";

const Contact = () => {
  const notyf = new Notyf();

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
      notyf.error("Please fill in all fields before submitting.");
      return;
    }

    setLoading(true);

    // ✅ EmailJS configuration
    const emailParams = {
      from_name: formData.fullName,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      await emailjs.send(
        "service_rz62w8w", // ✅ Replace with your EmailJS Service ID
        "template_2kn79kh", // ✅ Replace with your EmailJS Template ID
        emailParams,
        "8Sit4zZ5Lh-odI-bQ" // ✅ Replace with your EmailJS Public Key
      );

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
      <Container className="mt-4 pb-5 mb-4">
        <Card className="shadow-lg border-0 rounded p-4" style={{ backgroundColor: "#f8e48e" }}>
          <Card.Body>
            <h2 className="fw-bold text-dark text-center">
              <i className="fas fa-envelope me-2"></i> Contact Us
            </h2>
            <p className="text-muted text-center">
              Have questions? Get in touch with us by filling out the form below.
            </p>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </Form.Group>

              <div className="text-center">
                <Button variant="warning" type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
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

export default Contact;
