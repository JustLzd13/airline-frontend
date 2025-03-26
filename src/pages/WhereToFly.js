import React from "react";
import { Container, Carousel, Card } from "react-bootstrap";
import Footer from "../components/Footer";

const destinations = [
  {
    image: "https://www.elnidoresorts.com/wp-content/uploads/2023/10/ENR_Sustainability-Banner-1024x686.jpeg",
    title: "El Nido, Palawan",
    description: "Famous for its stunning limestone cliffs, crystal-clear waters, and hidden lagoons. A must-visit tropical paradise."
  },
  {
    image: "https://www.agoda.com/wp-content/uploads/2024/05/boracay-philippines.jpg",
    title: "Boracay Island",
    description: "Home to the world-renowned White Beach, Boracay is perfect for beach lovers and nightlife enthusiasts."
  },
  {
    image: "https://i0.wp.com/unusualplaces.org/wp-content/uploads/2019/05/chocolatehills.jpg",
    title: "Chocolate Hills, Bohol",
    description: "A unique geological formation of over 1,200 cone-shaped hills that turn brown in the dry season."
  },
  {
    image: "https://gttp.images.tshiftcdn.com/266095/x/0/mayon-volcano-travel-guide-everything-you-need-to-know-4.jpg?auto=compress%2Cformat&ch=Width%2CDPR&dpr=1&ixlib=php-3.3.0&w=883",
    title: "Mayon Volcano, Albay",
    description: "Famous for its perfect cone shape, Mayon Volcano is an iconic sight in the Philippines."
  },
  {
    image: "https://resilience.up.edu.ph/wp-content/uploads/slider33/taalprofile.jpeg",
    title: "Taal Volcano, Batangas",
    description: "One of the world's smallest active volcanoes, located in the scenic Taal Lake."
  },
  {
    image: "https://miro.medium.com/v2/resize:fit:1024/1*w5RcpbSYj0YtKhx714gB8g.jpeg",
    title: "Vigan City, Ilocos Sur",
    description: "A UNESCO World Heritage site known for its well-preserved Spanish colonial architecture."
  }
];

const WhereToFly = () => {
  return (
    <>
    <Container className="mt-5 mb-5 pb-5">
      <h2 className="text-center mb-4">Where to Fly?</h2>
      <p className="text-center mb-4">Discover the best travel destinations in the Philippines.</p>
      <Carousel className="mb-5">
        {destinations.map((destination, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={destination.image}
              alt={destination.title}
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <Card className="bg-dark text-white p-3" style={{ opacity: 0.8 }}>
                <Card.Title>{destination.title}</Card.Title>
                <Card.Text>{destination.description}</Card.Text>
              </Card>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <h3 className="text-center mt-5">Why Visit the Philippines?</h3>
      <p className="text-center px-3">
        The Philippines is an archipelago of over 7,000 islands, offering diverse landscapes, rich history, and vibrant culture. From the pristine beaches of Palawan and Boracay to the historic charm of Vigan, there is something for every traveler. Whether you're an adventure seeker, a history buff, or a nature lover, the Philippines has breathtaking destinations waiting to be explored. Enjoy world-class hospitality, delicious cuisine, and unforgettable experiences in this tropical paradise.
      </p>
      
    </Container>
    <Footer />
    </>
  );
};

export default WhereToFly;
