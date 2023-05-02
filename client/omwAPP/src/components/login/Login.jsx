import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = (props) => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthContext);
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   dispatch({ type: "LOGIN_START" });
  //   try {
  //     const res = await axios.post(baseURL + "/auth/login", credentials);
  //     dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  //     props.onHide();
  //   } catch (error) {
  //     dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(baseURL + "/auth/login", credentials, {
        withCredentials: true,
      });
      if (res && res.data) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        const access_token = Cookies.get("access_token"); // Wait for the cookie to be set
        Cookies.set("access_token", access_token, { expires: 1 }); // set the token in a cookie with a 1-day expiration
        props.onHide();
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: "Invalid response" });
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="login-container">
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
        <Button variant="danger" onClick={handleLogin}>
          Login
        </Button>
        {error && <span>{error.message}</span>}
      </Modal.Footer>
    </Modal>
  );
};

export default Login;
