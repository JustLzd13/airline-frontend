import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <Container>
        <Row className="text-center text-md-start">
          {/* BOOK Section */}
          <Col md={2}>
            <h6 className="fw-bold">BOOK</h6>
            <p><Link to="/bookings" className="footer-link">Bookings</Link></p>
          </Col>

          {/* MANAGE Section */}
          <Col md={2}>
            <h6 className="fw-bold">MANAGE</h6>
            <p><Link to="/manage/payment-options" className="footer-link">Payment Options</Link></p>
            <p><Link to="/manage/flight-status" className="footer-link">Flight Status</Link></p>
            <p><Link to="/manage/add-ons" className="footer-link">Add-ons</Link></p>
          </Col>

          {/* TRAVEL INFO Section */}
          <Col md={3}>
            <h6 className="fw-bold">TRAVEL INFO</h6>
            <p><Link to="/travel-info/where-to-fly" className="footer-link">Where To Fly?</Link></p>
            <p><Link to="/travel-info/discover-philippines" className="footer-link">Discover Philippines</Link></p>
          </Col>

          {/* ABOUT Section */}
          <Col md={2}>
            <h6 className="fw-bold">ABOUT</h6>
            <p><Link to="/about/who-we-are" className="footer-link">Who are We?</Link></p>
            <p><Link to="/about/company-info" className="footer-link">Company Info</Link></p>
          </Col>

          {/* PAYMENT METHODS & AWARDS */}
          <Col md={3} className="text-md-end">
            <h6 className="fw-bold">PAYMENT METHODS</h6>
            <img src="https://media.assettype.com/tribune%2F2024-05%2F2345b7d3-42a1-4ecf-9f7d-cd40242f31ab%2F416672185_801176405380485_5503353394200449572_n.jpg" alt="GCash" className="payment-logo" />
            <img src="https://logos-world.net/wp-content/uploads/2020/09/PayPal-Logo-2022.png" alt="PayPal" className="payment-logo" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/1200px-Stripe_Logo%2C_revised_2016.svg.png" alt="Stripe" className="payment-logo" />

            <h6 className="fw-bold mt-3">AWARDS</h6>
            <img src="https://cdn-icons-png.flaticon.com/512/8092/8092389.png" alt="Awards" className="award-logo" />
          </Col>
        </Row>

        {/* SOCIAL MEDIA ICONS */}
        <div className="text-center mt-3">
          <h6 className="fw-bold">CONNECT WITH US</h6>
          <FaFacebook size={25} className="footer-icon" />
          <FaInstagram size={25} className="footer-icon" />
          <FaYoutube size={25} className="footer-icon" />
          <FaTiktok size={25} className="footer-icon" />
        </div>
      </Container>

      {/* Custom CSS */}
      <style>
        {`
          .footer {
            background-color: #222; /* Whitish-black color */
            color: #f1f1f1;
            padding: 30px 0;
            text-align: center;
            width: 100%;
            position: relative;
            bottom: 0;
          }

          .footer-link {
            text-decoration: none;
            color: #f1f1f1;
            transition: color 0.3s ease;
          }

          .footer-link:hover {
            color: #e0e0e0;
            text-decoration: underline;
          }

          .footer-icon {
            margin: 0 10px;
            cursor: pointer;
            transition: transform 0.2s ease-in-out;
            color: #f1f1f1;
          }

          .footer-icon:hover {
            transform: scale(1.1);
            color: #ddd;
          }

          .payment-logo {
            height: 25px;
            margin-right: 5px;
          }

          .award-logo {
            height: 30px;
          }
        `}
      </style>
    </div>
  );
};

export default Footer;
