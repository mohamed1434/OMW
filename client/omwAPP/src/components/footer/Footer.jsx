import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
const Footer = () => {
  return (
    <Navbar
      fixed="bottom"
      expand="lg"
      variant="light"
      bg="light"
      className="footer"
    >
      <Container className="footerContainer">
        <Navbar.Brand>
          <span className="footerTitle">&copy; 2023 OMW, Inc.</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Footer;
