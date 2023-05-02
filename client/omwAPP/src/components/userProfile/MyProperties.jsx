import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import NavBar from "../navbar/NavBar";
import { Button, Card, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faBars,
  faFolderMinus,
  faFolderBlank,
  faFolderClosed,
} from "@fortawesome/free-solid-svg-icons";
import { useState, forwardRef } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./userProfile.css";
import { deleteObject, listAll, ref } from "firebase/storage";
import storage from "../../firebase";

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
    try {
      // Retrieve the property data
      const res = await axios.get(baseURL + `/hotels/show/${propertyId}`, {
        withCredentials: true,
      });
      const { owner } = res.data;

      // Delete the property from the database
      await axios.delete(baseURL + `/hotels/${propertyId}`, {
        withCredentials: true,
      });

      // Delete the photos from Firebase Storage
      const storageRef = ref(storage, `images/${owner}/${propertyId}/`);
      const files = await listAll(storageRef);
      await Promise.all(
        files.items.map(async (item) => {
          await deleteObject(item);
        })
      );

      // Refresh the property list
      reFetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar />

      <div className="user-properties-container">
        {loading ? (
          "Loading, please wait..."
        ) : (
          <div className="user-properties">
            {data && data.hotels && data.hotels.length > 0 ? (
              data.hotels.map((item, index) => (
                <Card style={{ width: "18rem" }} className="propertyCard">
                  <Dropdown className="my-dropdown">
                    <Dropdown.Toggle
                      as={CustomToggle}
                      id="dropdown-custom-components"
                    ></Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link
                          to={`/user-profile/my-properties/edit/${item._id}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          Update
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDelete(item._id)}>
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Card.Img variant="top" src={`${item.photos}`} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.title}</Card.Text>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <div className="noItems">
                <FontAwesomeIcon icon={faFolderMinus} />
                <p>You don't have any properties.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProperties;
