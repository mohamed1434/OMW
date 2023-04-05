import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

const Places = ({items}) => {
  const [showText, setShowText] = useState(false);

  // Use useEffect to set the state to true after 2 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowText(true);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="featured">
      <div className="d-flex flex-wrap justify-content-center">
        {items.map((item, index) => (
          <Link as={Card } to={`/hotels/${item._id}`} style={{
              width: "18rem",
              margin: "1rem",
              height: "28rem",
              border: "none",
              maxWidth: "300px", //"calc((100% - 4rem) / 3)"
              textDecoration: "none",
              color: "black"
            }}
            key={index}>
            <Card.Img
              variant="top"
              src={item.photos}
              style={{
                objectFit: "cover",
                height: "20rem", // increased height of image 20rem
                width: "100%", // added width property to image 100%
                borderRadius: "20px",
              }}
            />

            <Card.Body>
              {showText ? (
                <>
                  <div className="placeWrapper">
                    <div className="placeDetails">
                      <Card.Title>{`${item.city}, ${item.type}`}</Card.Title>
                      <Card.Text className="t">{item.name}</Card.Text>
                      <Card.Text className="t">{item.address}</Card.Text>
                    </div>
                    <div className="placePrice">
                      <Card.Text>
                        <b>${item.cheapestPrice}</b> night
                      </Card.Text>
                      <Card.Text>
                        <FontAwesomeIcon icon={faStar} />
                        {item.rating}
                      </Card.Text>
                    </div>
                    {/* <Button variant="primary">Reserve</Button> */}
                  </div>
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Places;
