import React, { useContext } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../UserContext"; // ✅ Import UserContext
import logo from "../images/logo.png";

const AppNavbar = () => {
  const { user, setUser } = useContext(UserContext); // ✅ Use context instead of props
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ Clear token
    setUser(null); // ✅ Reset user state
    navigate("/login"); // ✅ Redirect to login page
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#f8e48e", padding: "10px 0" }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src={logo} alt="SkyIsles Airline" style={{ height: "50px", marginRight: "10px" }} />
          <div>
            <span style={{ fontWeight: "bold", fontSize: "20px", color: "#333" }}>
              SKYISLES AIRLINE
            </span>
            <br />
            <small style={{ fontSize: "12px", color: "#555" }}>LET'S FLY LIKE A FREE BIRD</small>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* BOOK Section */}
            <NavDropdown title="BOOK" id="book-dropdown">
              <NavDropdown.Item as={Link} to="/bookings">Bookings</NavDropdown.Item>
            </NavDropdown>

            {/* MANAGE Section */}
            <NavDropdown title="MANAGE" id="manage-dropdown">
              <NavDropdown.Item as={Link} to="/manage/payment-options">Payment Options</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/manage/flight-status">Flight Status</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/manage/add-ons">Add-Ons</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/profile">My Account</NavDropdown.Item>
            </NavDropdown>

            {/* TRAVEL INFO Section */}
            <NavDropdown title="TRAVEL INFO" id="travel-info-dropdown">
              <NavDropdown.Item as={Link} to="/travel/explore">Explore</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/travel/where-to-fly">Where To Fly?</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/travel/discover-philippines">Discover Philippines</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/travel/international">International Destinations</NavDropdown.Item>
            </NavDropdown>

            {/* ABOUT Section */}
            <NavDropdown title="ABOUT" id="about-dropdown">
              <NavDropdown.Item as={Link} to="/about">About</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/about/who-we-are">Who Are We?</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/about/partnerships">Partnerships</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/contact">Contact Page</NavDropdown.Item>
            </NavDropdown>

            {/* LOGIN / LOGOUT Section */}
            <Nav className="d-flex align-items-center">
              {user ? ( // ✅ Check if user exists
                <>
                  <Nav.Link as={Link} to="/profile" className="fw-bold text-dark me-3">
                    Hi, {user.firstName}!
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout} className="fw-bold text-dark" style={{ cursor: "pointer" }}>
                    LOGOUT <i className="fas fa-sign-out-alt"></i>
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/login" className="fw-bold text-dark">
                  LOGIN <i className="fas fa-user"></i>
                </Nav.Link>
              )}
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
