import { forwardRef, useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./userProfile.css";
import Cookies from "js-cookie";
import axios from "axios";

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
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const handleLogout = async () => {
    // await axios.post(baseURL + "/auth/logout");
    // localStorage.removeItem("user");
    // window.location.reload();
    // navigate("/");

    try {
      const res = await axios.post(baseURL + "/auth/logout");
      dispatch({ type: "LOGOUT", payload: res.data });
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    // localStorage.removeItem("user");
    // navigate("/");
    // window.location.reload();
  };
  return (
    <Dropdown align="end">
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <img className="userImg" src={user.img} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/user-profile">
          Account
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2">Booking History</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Favourites</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDown;
