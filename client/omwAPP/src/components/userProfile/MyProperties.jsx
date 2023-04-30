import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import NavBar from "../navbar/NavBar";
import { Button, Card, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState, forwardRef } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <button
    className="profileBtn"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <FontAwesomeIcon icon={faBars} style={{ marginRight: "10px" }} />
    {children}
  </button>
));

const MyProperties = () => {
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const { data, loading, error, reFetch } = useFetch(
    baseURL + `/users/properties`,
    {
      withCredentials: true,
    }
  );

  const handleDelete = async (propertyId) => {
    await axios.delete(baseURL + `/hotels/${propertyId}`, {
      withCredentials: true,
    });
    window.location.reload();
  };

  return (
    <div>
      <NavBar />

      <div className="user-properties-container">
        <div className="user-properties">
          {data &&
            data.hotels &&
            data.hotels.map((item, index) => (
              <Card style={{ width: "18rem" }} className="propertyCard">
                <Dropdown className="my-dropdown">
                  <Dropdown.Toggle
                    as={CustomToggle}
                    id="dropdown-custom-components"
                  ></Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Update</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDelete(item._id)}>
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Card.Img variant="top" src={item.photos} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.desc}</Card.Text>
                </Card.Body>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyProperties;
