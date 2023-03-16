import { Button, Modal } from "react-bootstrap";
const PrivacyModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Privacy
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Privacy</h4>
        <p>
          Our privacy
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PrivacyModal;
