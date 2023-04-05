import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../header/Header";
import NavBar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useState } from "react";
import Places from "../propertyList/Places";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Show = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [openSlider, setOpenSlider] = useState(false);
  const location = useLocation();
  const placeID = location.pathname.split("/")[2];
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const { data, loading, error, reFetch } = useFetch(
    baseURL + `/hotels/show/${placeID}`
  );

  const handleOpen = (i) => {
    setSliderIndex(i);
    setOpenSlider(true);
  };

  const handleSliding = (direction) => {
    let newSliderIndex;
    if (direction === "left") {
      newSliderIndex = sliderIndex === 0 ? 5 : sliderIndex - 1;
    } else {
      newSliderIndex = sliderIndex === 5 ? 0 : sliderIndex + 1;
    }
    setSliderIndex(newSliderIndex);
  };

  return (
    <>
      <NavBar />
      <Header type="list" />
      {loading ? (
        "Loading please wait"
      ) : (
        <div className="hotelContainer">
          {openSlider && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="closeImg"
                onClick={() => setOpenSlider(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrowImg"
                onClick={() => handleSliding("left")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[sliderIndex]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrowImg"
                onClick={() => handleSliding("right")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location - {data.distance}m from center
            </span>
            <span className="hotelPriceHighLight">
              Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImageWrapper">
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">
                  {data.desc}
                </p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a 9-night stay!</h1>
                <span>
                  Located in the real heart of Kuwait, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>$945</b> (9 nights)
                </h2>
                <button>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="reviews">
        <h1>Reviews</h1>
        <div className="review">
          <img
            src="https://i.pinimg.com/236x/19/eb/69/19eb691fb9a95ef1a6651710688792c9.jpg"
            alt=""
          />
          <div className="review-content">
            <h3>User 1</h3>
            <p>This is a review from User 1</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Show;
