import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Login from "../login/Login";
import { AuthContext } from "../../context/AuthContext";

const NavBar = () => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const { user, dispatch } = useContext(AuthContext);
  const [modalShow, setModalShow] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
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
              <Button>Sign-Up</Button>
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
