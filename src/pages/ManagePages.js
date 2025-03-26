import React from "react";
import { Container, Card, ListGroup } from "react-bootstrap";
import { FaCreditCard, FaPlaneDeparture, FaGift } from "react-icons/fa";
import AppNavbar from "../components/AppNavbar";
import Footer from "../components/Footer";

const ManagePages = ({ title, description, icon, details = "" }) => {
  return (
    <div
      style={{ 
        minHeight: "100vh", 
        backgroundImage: "url('https://images.saymedia-content.com/.image/t_share/MjAzMDI5MjI3NjMxNTUxNjcw/top-10-tourist-destination-in-the-philippines.jpg')", 
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat" 
      }}
    >
      <Container className="pt-5 pb-5 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Card className="shadow-lg p-5 text-center border-0" style={{ maxWidth: "700px", backgroundColor: "rgba(248, 228, 142, 0.9)", borderRadius: "15px" }}>
          <div className="mb-4 text-primary" style={{ fontSize: "60px" }}>{icon}</div>
          <h2 className="fw-bold mb-3 text-dark">{title}</h2>
          <p className="text-secondary mb-4" style={{ fontSize: "18px" }}>{description}</p>
          <ListGroup variant="flush" className="text-start">
            {details?.split('\n').map((item, index) => (
              <ListGroup.Item key={index} className="border-0 bg-transparent" style={{ fontSize: "16px" }}>
                {item}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export const PaymentOptions = () => (
  <ManagePages
    title="Payment Options"
    description="We offer multiple payment methods including credit card, PayPal, GCash, and bank transfers. Choose the most convenient way to pay for your flights."
    details={
      "✅ **Credit Card:** Secure and fast transactions using Visa, MasterCard, and American Express.\n" +
      "✅ **PayPal:** Use your PayPal balance or linked bank account for seamless payments.\n" +
      "✅ **GCash:** A quick and convenient option for mobile payments.\n" +
      "✅ **Bank Transfers:** Direct deposits for hassle-free transactions.\n" +
      "✅ **E-Wallets:** Additional support for modern digital payment methods.\n" +
      "✅ **Cash Payment:** Available at selected airline counters."
    }
    icon={<FaCreditCard />}
  />
);

export const FlightStatus = () => (
  <ManagePages
    title="Flight Status"
    description="Stay updated with real-time flight status. Check if your flight is on time, delayed, or canceled before heading to the airport."
    details={
      "🛫 **Real-Time Updates:** Track live status of your flight.\n" +
      "📢 **Notifications:** Get alerts about changes in departure and arrival times.\n" +
      "🌦️ **Weather Impact:** View weather-related flight delays.\n" +
      "🏢 **Airport Conditions:** Check security and boarding gate information.\n" +
      "🔄 **Alternative Flights:** Find alternative flights in case of cancellations."
    }
    icon={<FaPlaneDeparture />}
  />
);

export const AddOns = () => (
  <ManagePages
    title="Add-Ons"
    description="Enhance your travel experience with our add-ons like extra baggage, in-flight meals, priority boarding, and seat upgrades."
    details={
      "🛄 **Extra Baggage:** Purchase additional baggage allowance at discounted rates.\n" +
      "🍽️ **In-Flight Meals:** Enjoy a variety of meals, snacks, and beverages during your flight.\n" +
      "🚀 **Priority Boarding:** Get on board faster with priority check-in and boarding.\n" +
      "💺 **Seat Upgrades:** Upgrade to business class or select extra-legroom seats.\n" +
      "📶 **Wi-Fi Access:** Stay connected during your flight with onboard internet services.\n" +
      "🛋️ **Lounge Access:** Relax before your flight in premium airport lounges."
    }
    icon={<FaGift />}
  />
);

export default ManagePages;
