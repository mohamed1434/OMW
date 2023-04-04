import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const NavBar = () => {
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
        <Nav className="ml-auto">
          <Nav.Link href="#home">
            <Button>Login</Button>
          </Nav.Link>
          <Nav.Link href="#features">
            <Button>Sign-Up</Button>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
