import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ReviewModal = (props) => {
  let averageRating = 0;
  if (props.data && props.data.reviews) {
    let totalRating = 0;
    props.data.reviews.map((review) => {
      totalRating += review.rating;
    });
    averageRating = Math.round(totalRating / props.data.reviews.length);
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="reviews-modal-title">
            <FontAwesomeIcon icon={faStar} />
            <h1>{averageRating}</h1>
            <h1>{`· ${
              props.data.reviews && props.data.reviews.length
            } reviews`}</h1>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="reviews-modal">
          {props.data.reviews &&
            props.data.reviews.map((review) => (
              <div className="review">
                <img src={review.owner.img} alt="" />
                <div className="review-content">
                  <h3>{review.owner.username}</h3>
                  <p>{review.body}</p>
                </div>
              </div>
            ))}
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default ReviewModal;
