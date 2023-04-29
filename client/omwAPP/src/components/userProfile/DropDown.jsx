import { forwardRef, useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import "./userProfile.css";

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
const DropDown = () => {
  const { user, dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
    navigate("/");
  };
  return (
    <Dropdown align="end">
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <img className="userImg" src={user.img} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/user-profile">Account</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Booking History</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Favourites</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDown;
