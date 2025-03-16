import React, { useContext, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import UserContext from '../UserContext';

const AppNavbar = () => {
  const { user, setUser, unsetUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    fetch(`https://airisle-api-3.onrender.com/users/user-profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user && data.user._id) {
          setUser({
            id: data.user._id,
            firstName: data.user.firstName,
            isAdmin: data.user.isAdmin,
          });
        } else {
          unsetUser();
        }
      })
      .catch(() => unsetUser());
  }, [setUser, unsetUser]);

  const handleLogout = () => {
    unsetUser(); 
    navigate("/"); 
    window.location.reload();
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
            <NavDropdown title="BOOK" id="book-dropdown" className="custom-nav-dropdown">
              <NavDropdown.Item as={Link} to="/bookings">Bookings</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="MANAGE" id="manage-dropdown" className="custom-nav-dropdown">
              <NavDropdown.Item as={Link} to="/manage/payment-options">Payment Options</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/manage/flight-status">Flight Status</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/manage/add-ons">Add-Ons</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/profile">My Account</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="TRAVEL INFO" id="travel-info-dropdown" className="custom-nav-dropdown">
              <NavDropdown.Item as={Link} to="/travel/explore">Explore</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/travel/where-to-fly">Where To Fly?</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/travel/discover-philippines">Discover Philippines</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/travel/international">International Destinations</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="ABOUT" id="about-dropdown" className="custom-nav-dropdown">
              <NavDropdown.Item as={Link} to="/about">About</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/about/who-we-are">Who are We?</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/about/partnerships">Partnerships</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/contact">Contact Page</NavDropdown.Item>
            </NavDropdown>

            <Nav className="d-flex align-items-center">
              {user.id ? (
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
