import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Register = (props) => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    email: undefined,
    phone: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthContext);
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await axios.post(baseURL + "/auth/register", credentials, {
        withCredentials: true,
      });
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
      const access_token = Cookies.get("access_token");
      Cookies.set("access_token", access_token, { expires: 1 });
      props.onHide();
    } catch (error) {
      dispatch({ type: "REGISTER_FAILURE", payload: error.response.data });
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Sign-Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="login-container">
          <label for="phone">Phone Number</label>
          <input
            type="text"
            placeholder="Phone Number"
            id="phone"
            name="phone"
            onChange={handleChange}
            required
          />
          <label for="username">Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            onChange={handleChange}
          />
          <label for="username">Username</label>
          <input
            type="text"
            placeholder="username"
            name="username"
            id="username"
            onChange={handleChange}
          />
          <label for="password">Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleRegister}>
          Sign-Up
        </Button>
        {error && <span>{error.message}</span>}
      </Modal.Footer>
    </Modal>
  );
};

export default Register;
