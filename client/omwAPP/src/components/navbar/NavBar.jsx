import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

const NavBar = () => {
  return (
    <Navbar variant="dark" className="nav-bar">
      <Container>
        <Navbar.Brand className="logo" href="#home"><img src="/omw-logo.png" style={{ width: "60px", height: "21px" }}/></Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="#home"><Button>Login</Button></Nav.Link>
          <Nav.Link href="#features"><Button>Sign-Up</Button></Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
