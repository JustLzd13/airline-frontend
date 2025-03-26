import React, { useEffect, useState } from "react";
import { Container, Table, Button, Modal, Form, InputGroup } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import AppNavbar from "../components/AppNavbar";
import Footer from "../components/Footer";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf({
  duration: 3000,
  position: { x: "right", y: "top" },
  types: [
    { type: "error", background: "red", icon: false },
    { type: "success", background: "green", icon: false },
  ],
});

const AdminDashboard = () => {
  const [flights, setFlights] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    flightNumber: "",
    airlineName: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    dateOfFlight: "",
    seatCapacity: "",
    availableSeats: "",
    flightStatus: "Scheduled",
  });

  // Fetch Flights Data
  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("https://airisle-api-3.onrender.com/flight/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setFlights(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching flights:", error);
      setFlights([]);
    }
  };


  // Handle Form Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("https://airisle-api-3.onrender.com/flight/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to create flight");
      fetchFlights();
      setShowModal(false);
      notyf.success("Flight created successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error creating flight:", error);
      notyf.error("Failed to create flight.");
    }
  };
  const handleUpdate = (flight) => {
    setSelectedFlight(flight);
    setFormData(flight);
    setShowUpdateModal(true);
  };

  // Handle Delete Flight
    const handleDelete = async (id) => {
      const token = localStorage.getItem("token");
      try {
        await fetch(`https://airisle-api-3.onrender.com/flight/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        notyf.success("Flight deleted successfully!");
        fetchFlights();
      } catch (error) {
        console.error("Error deleting flight:", error);
        notyf.error("Failed to delete flight.");
      }
    };

  const handleUpdateSubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`https://airisle-api-3.onrender.com/flight/update/${selectedFlight._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error("Failed to update flight");
        fetchFlights();
        setShowUpdateModal(false);
        notyf.success("Flight updated successfully!");
      } catch (error) {
        console.error("Error updating flight:", error);
        notyf.error("Failed to update flight.");
      }
    };

  return (
    <>
      <Container className="mt-4" style={{ minHeight: "60vh" }}>
        <h2 className="text-center mb-4">Admin Dashboard - Flights</h2>
        <div className="d-flex justify-content-between mb-3">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <FaPlus className="me-2" /> Create Flight
          </Button>
          <InputGroup style={{ width: "300px" }}>
            <Form.Control
              type="text"
              placeholder="Search flights..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="secondary">
              <FaSearch />
            </Button>
          </InputGroup>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>Airline</th>
              <th>From</th>
              <th>To</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Date</th>
              <th>Seats</th>
              <th>Available</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(flights || [])
              ?.filter((flight) =>
                Object.values(flight).some((value) =>
                  value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
              )
              .map((flight) => (
                <tr key={flight._id}>
                  <td>{flight.flightNumber}</td>
                  <td>{flight.airlineName}</td>
                  <td>{flight.from}</td>
                  <td>{flight.to}</td>
                  <td>{flight.departureTime}</td>
                  <td>{flight.arrivalTime}</td>
                  <td>{flight.dateOfFlight}</td>
                  <td>{flight.seatCapacity}</td>
                  <td>{flight.availableSeats}</td>
                  <td>{flight.flightStatus}</td>
                  <td>
                    <Button variant="warning" className="me-2 mb-1" onClick={() => handleUpdate(flight)}>
                      <FaEdit />
                    </Button>
                    <Button variant="danger" className="me-2 " onClick={() => handleDelete(flight._id)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>

        </Table>
      </Container>
      <Footer />

      {/* Create Flight Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Flight</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreate}>
            {Object.keys(formData).map((key) => (
              <Form.Group className="mb-3" key={key}>
                <Form.Label>{key.replace(/([A-Z])/g, " $1").toUpperCase()}</Form.Label>
                <Form.Control
                  type={key === "dateOfFlight" ? "date" : "text"}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            ))}
            <Button type="submit" variant="success" className="w-100">
              Create Flight
            </Button>
          </Form>
        </Modal.Body>
      </Modal>



      {/* Update Flight Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Flight</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubmit}>
            {Object.keys(formData)
              .filter((key) => key !== "_id" && key !== "__v") // Exclude _id and __v
              .map((key) => (
                <Form.Group className="mb-3" key={key}>
                  <Form.Label>{key.replace(/([A-Z])/g, " $1").toUpperCase()}</Form.Label>
                  <Form.Control
                    type={key === "dateOfFlight" ? "date" : "text"}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              ))}
            <Button type="submit" variant="success" className="w-100">
              Update Flight
            </Button>
          </Form>
        </Modal.Body>
      </Modal>


    </>
  );
};

export default AdminDashboard;
