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

const Show = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [openSlider, setOpenSlider] = useState(false);
  const photos = [
    {
      src: "https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
    {
      src: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
    {
      src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
    {
      src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
  ];

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
              <img src={photos[sliderIndex].src} alt="" className="sliderImg" />
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
          <h1 className="hotelTitle">Grand Hotel</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Salmiyah Youssef Al-Badr Street 10</span>
          </div>
          <span className="hotelDistance">
            Excellent location - 500m from center
          </span>
          <span className="hotelPriceHighLight">
            Book a stay over $114 at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImageWrapper">
                <img
                  onClick={() => handleOpen(i)}
                  src={photo.src}
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Stay in the heart of Kuwait</h1>
              <p className="hotelDesc">
                Villa Suer, which has a magnificent view of nature and sea and
                is located in the Kaş region, offers the opportunity to spend an
                unforgettable holiday in crowded families with its accommodation
                capacity for 4 people. Our villa, where you can take in the
                eye-catching sea view, has a spacious atmosphere next to a
                comfortable interior design. A must-see for holiday lovers who
                want to explore the Kas area and have a privileged time are
                waiting for you.
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

      <div className="reviews">
      <h1>Reviews</h1>
        <div className="review">
          <img src="https://i.pinimg.com/236x/19/eb/69/19eb691fb9a95ef1a6651710688792c9.jpg" alt=""/>
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