import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { useState } from "react";
import ReviewModal from "./ReviewModal";
import AddReviewModal from "./AddReviewModal";
const Reviews = ({ data }) => {
  const [modal, setModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  let averageRating = 0;
  if (data && data.reviews) {
    let totalRating = 0;
    data.reviews.map((review) => {
      totalRating += review.rating;
    });
    averageRating = Math.round(totalRating / data.reviews.length);
  }
  return (
    <div className="reviews-container">
      <div className="reviews-title">
        <FontAwesomeIcon icon={faStar} />
        <h1>{averageRating}</h1>
        <h1>{`· ${data.reviews && data.reviews.length} reviews`}</h1>
      </div>
      <div className="reviews">
        {data.reviews &&
          data.reviews.slice(0, 6).map((review) => (
            <div className="review">
              <img src={review.owner.img} alt="" />
              <div className="review-content">
                <h3>{review.owner.username}</h3>
                <p>{review.body}</p>
              </div>
            </div>
          ))}
      </div>
      <div className="reviewBtns">
        <Button onClick={() => setModal(true)}>{`Show all ${
          data.reviews && data.reviews.length
        } reviews`}</Button>
        <ReviewModal show={modal} onHide={() => setModal(false)} data={data} />
        <Button onClick={() => setAddModal(true)}>Leave a review</Button>
        <AddReviewModal show={addModal} onHide={() => setAddModal(false)} data={data} />
      </div>
    </div>
  );
};

export default Reviews;
