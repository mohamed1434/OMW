import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Login from "../login/Login";
import { AuthContext } from "../../context/AuthContext";
import Register from "../Register/Register";

const NavBar = () => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const { user, dispatch } = useContext(AuthContext);
  const [modalShow, setModalShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
    navigate("/");
  };

  return (
    <Navbar variant="dark" className="nav-bar">
      <Container>
        <Link to="/">
          <Navbar.Brand className="logo">
            <img
              src="/omw-logo.png"
              style={{ width: "60px", height: "21px" }}
            />
          </Navbar.Brand>
        </Link>
        {user ? (
          <div className="logged-in">
            <h4>{user.username}</h4>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <Nav className="ml-auto">
            <Nav.Link>
              <Button onClick={() => setModalShow(true)}>Login</Button>
              <Login show={modalShow} onHide={() => setModalShow(false)} />
            </Nav.Link>
            <Nav.Link>
              <Button onClick={() => setRegisterShow(true)}>Sign-Up</Button>
              <Register
                show={registerShow}
                onHide={() => setRegisterShow(false)}
              />
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
