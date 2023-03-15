import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

const Places = () => {
  const [showText, setShowText] = useState(false);

  // Use useEffect to set the state to true after 2 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowText(true);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  // Define an array of data for the cards
  const cardsData = [
    {
      title: "Card 1",
      img: "https://i.pinimg.com/236x/09/32/26/093226c5d7dfd1d6e5b56a58242c78df.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Card 2",
      img: "https://i.pinimg.com/236x/a0/cc/d3/a0ccd3dfc65ba8ec3ff149fa47e2ae85.jpg",
      text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    },
    {
      title: "Card 3",
      img: "https://i.pinimg.com/236x/bf/ae/93/bfae93baf1c46504ed9eb8878becf057.jpg",
      text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    },
    {
      title: "Card 4",
      img: "https://i.pinimg.com/236x/7a/a1/94/7aa19415266b8ad0ad570b7d2ecc3e8e.jpg",
      text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    },
    {
      title: "Card 5",
      img: "https://i.pinimg.com/236x/a0/aa/bd/a0aabd75cd68c189db67a6852dce5aab.jpg",
      text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    },
    {
      title: "Card 6",
      img: "https://i.pinimg.com/236x/0a/73/be/0a73bed166891727fd3e99586d4b51a8.jpg",
      text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    },
    {
      title: "Card 7",
      img: "https://i.pinimg.com/236x/24/b1/7c/24b17c44d5f60789e35956016d9dd13a.jpg",
      text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    },
    {
      title: "Card 8",
      img: "https://i.pinimg.com/236x/07/8f/df/078fdf1aaf2b62366f9bd4fe8e1897ea.jpg",
      text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    },
  ];

  return (
    <div className="featured">
      <div className="d-flex flex-wrap justify-content-center">
        {cardsData.map((card, index) => (
          <Card
            style={{
              width: "18rem",
              margin: "1rem",
              height: "30rem",
              border: "none",
            }}
            key={index}
          >
            <Card.Img
              variant="top"
              src={card.img}
              style={{ objectFit: "cover", height: "14rem", borderRadius: "10px" }}
            />
            <Card.Body>
              {showText ? (
                <>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.text}</Card.Text>
                  <Button variant="primary">Reserve</Button>
                </>
              ) : (
                <>
                  <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6} />
                  </Placeholder>
                  <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                    <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                    <Placeholder xs={8} />
                  </Placeholder>
                  <Placeholder.Button variant="dark" xs={6} />
                </>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Places;
