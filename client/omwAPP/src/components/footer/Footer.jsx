import { useState } from "react";
import { Button, Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import PrivacyModal from "../modals/PrivacyModal";
import TermsModal from "../modals/TermsModal";

const Footer = () => {
  const [termsModalShow, setTermsModalShow] = useState(false);
  const [privacyModalShow, setPrivacyModalShow] = useState(false);

  return (
    <Navbar fixed="bottom" variant="dark" className="footer">
      <Container className="footerContainer">
        <div className="d-flex align-items-center">
          <Navbar.Brand>
            <span className="footerTitle">&copy; 2023 OMW, Inc. · </span>
            <style>
              @import
              url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300;1,700&display=swap');
            </style>
          </Navbar.Brand>
          <Nav className="footerItems">
            <Nav.Link>
              <Button onClick={() => setTermsModalShow(true)}>Terms</Button>
              <TermsModal
                show={termsModalShow}
                onHide={() => setTermsModalShow(false)}
              />
            </Nav.Link>
            <Nav.Link>
              <Button onClick={() => setPrivacyModalShow(true)}>Privacy</Button>
              <PrivacyModal
                show={privacyModalShow}
                onHide={() => setPrivacyModalShow(false)}
              />
            </Nav.Link>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default Footer;
