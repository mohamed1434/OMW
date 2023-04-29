import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import StarRating from "./StarRating";
import { useState } from "react";
import axios from "axios";

const AddReviewModal = (props) => {
  const [rating, setRating] = useState(0);
  const [reviewBody, setReviewBody] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  const handleReviewBodyChange = (event) => {
    setReviewBody(event.target.value);
  };
  const handleAdd = async () => {
    const data = {
      body: reviewBody,
      rating: rating,
    };
    try {
      await axios.post(
        baseURL + `/hotels/${props.data._id}/reviews`,
        data,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      setErrorMessage(error.response.data.message);
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
        <Modal.Title id="contained-modal-title-vcenter">
          Leave a review
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Rating : </Form.Label>
            <StarRating onChange={handleRatingChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Review : </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={handleReviewBodyChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="danger" onClick={handleAdd}>
          Add
        </Button>
        {errorMessage && <span>{errorMessage}</span>}
      </Modal.Footer>
    </Modal>
  );
};

export default AddReviewModal;
