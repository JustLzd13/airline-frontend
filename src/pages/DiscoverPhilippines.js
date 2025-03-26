import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Footer from "../components/Footer";

const travelReasons = [
  {
    image: "https://www.elnidoresorts.com/wp-content/uploads/2023/10/ENR_Sustainability-Banner-1024x686.jpeg",
    title: "Breathtaking Natural Wonders",
    description: "From the crystal-clear waters of Palawan to the stunning Chocolate Hills of Bohol, the Philippines is home to some of the world's most breathtaking landscapes."
  },
  {
    image: "https://secret-ph.com/wp-content/uploads/2023/01/2-36.jpg",
    title: "Rich Culture and History",
    description: "With Spanish, American, and indigenous influences, the Philippines boasts a diverse cultural heritage. Visit historic sites like Intramuros and Vigan to step back in time."
  },
  {
    image: "https://www.deztreks.com/wp-content/uploads/2018/07/IMG_3034-e1531536874294-1024x768.jpg",
    title: "Warm and Friendly Locals",
    description: "Filipinos are known for their hospitality. Everywhere you go, you’ll be welcomed with warm smiles and friendly conversations."
  },
  {
    image: "https://manilafoodmart.com/wp-content/uploads/2022/08/Filipino-Cuisine.png",
    title: "Delicious Cuisine",
    description: "Experience the flavors of the Philippines with delicious dishes like Adobo, Sinigang, and Lechon. The street food scene is also a must-try for food lovers."
  },
  {
    image: "https://solitude.world/wp-content/uploads/2024/01/UB_0817-banner-1024x420.jpg",
    title: "Diverse Marine Life and Beaches",
    description: "Whether you're into diving, snorkeling, or just relaxing on white sand beaches, the Philippines has some of the most beautiful shorelines in the world."
  },
  {
    image: "https://faq.ph/wp-content/uploads/2016/01/top-tourist-destinations-Philippines.jpg",
    title: "Many Famous Tourist Spots",
    description: "The Philippines is a haven for travelers, offering an abundance of breathtaking tourist spots."
  }
];

const DiscoverPhilippines = () => {
  return (
  	<>
    <Container className="mt-5 mb-5 pb-5">
      <h2 className="text-center mb-4">Why Travel to the Philippines?</h2>
      <p className="text-center mb-5">
        The Philippines is a dream destination for travelers, offering a mix of adventure, culture, and relaxation. Here’s why you should visit this beautiful country.
      </p>
      <Row>
        {travelReasons.map((reason, index) => (
          <Col md={6} className="mb-4" key={index}>
            <Card className="shadow-lg border-0">
              <Card.Img variant="top" src={reason.image} style={{ height: "300px", objectFit: "cover" }} />
              <Card.Body>
                <Card.Title className="fw-bold">{reason.title}</Card.Title>
                <Card.Text>{reason.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
		<p className="text-center px-3 mt-5">
	     With over 7,000 islands, the Philippines offers endless opportunities for exploration, from pristine beaches to lush mountains. Its rich history, influenced by various cultures, makes it a fascinating destination for history buffs. Adventurers can enjoy activities like diving, island hopping, and trekking, while food lovers will delight in the country’s diverse and flavorful cuisine. Whether you seek serenity or excitement, the Philippines welcomes you with its natural beauty and warm hospitality.
	   </p>
    </Container>

    <Footer />
    </>
  );
};

export default DiscoverPhilippines;
