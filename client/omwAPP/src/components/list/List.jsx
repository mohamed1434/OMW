import NavBar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItems from "../propertyList/SearchItems";
import Places from "../propertyList/Places";
import {
  faBuilding,
  faCampground,
  faCircleArrowLeft,
  faCircleArrowRight,
  faFilter,
  faHotel,
  faHouse,
  faSwimmingPool,
  faCaravan,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import useFetch from "../../hooks/useFetch";
import "swiper/css";
import Skeleton from "../skeleton/Skeleton";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(
    location.state?.destination || ""
  ); //todo
  const [dates, setDates] = useState(
    location.state?.dates || [{ startDate: new Date(), endDate: new Date() }]
  ); //todo
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state?.options || {}); //todo
  const [openList, setOpenList] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState();
  const [type, setType] = useState(null);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const { data, loading, error, reFetch } = useFetch(
    baseURL +
      `/hotels?city=${destination || ""}&min=${min || 0}&max=${
        max || 999
      }&type=${type || ""}`
  );

  console.log(loading);

  const handleClick = () => {
    reFetch();
  };

  const handleType = (categoryType) => {
    setType(categoryType);
    reFetch();
  };

  const categories = [
    {
      id: 1,
      name: "house",
      icon: <FontAwesomeIcon icon={faHouse} />,
    },
    {
      id: 2,
      name: "pool",
      icon: <FontAwesomeIcon icon={faSwimmingPool} />,
    },
    {
      id: 3,
      name: "camp",
      icon: <FontAwesomeIcon icon={faCampground} />,
    },
    {
      id: 4,
      name: "apartment",
      icon: <FontAwesomeIcon icon={faBuilding} />,
    },
    {
      id: 5,
      name: "hotel",
      icon: <FontAwesomeIcon icon={faHotel} />,
    },
    {
      id: 6,
      name: "caravan",
      icon: <FontAwesomeIcon icon={faCaravan} />,
    },
  ];

  window.onscroll = function () {
    var categories = document.querySelector(".categories");
    if (window.pageYOffset > 0) {
      categories.classList.add("shadow");
    } else {
      categories.classList.remove("shadow");
    }
  };

  return (
    <div>
      <NavBar />
      {/* <Header type="list" /> */}

      <div className="categories">
        <div className="swiper-button-prev">
          <FontAwesomeIcon icon={faCircleArrowLeft} />
        </div>
        <Swiper
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={6}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
        >
          {categories.map((cat, i) => (
            <SwiperSlide onClick={() => handleType(cat.name)}>
              <div className="swiper-container">
                <Link
                  to={`/hotels?type=${cat.name}`}
                  state={{ type: cat.name }}
                >
                  <h2>{cat.icon}</h2>
                  <span>{cat.name}</span>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-next">
          <FontAwesomeIcon
            icon={faCircleArrowRight}
            style={{ color: "#000000" }}
          />
        </div>
        <Button onClick={() => setOpenList(!openList)}>
          <FontAwesomeIcon icon={faFilter} />
          <span>Filters</span>
        </Button>
      </div>

      <div className="listContainer">
        <div className="listWrapper">
          {openList && (
            <div className="listSearch">
              <h1 className="lsTitle">Search</h1>
              <div className="lsItem">
                <label>Destination</label>
                <input placeholder={destination} type="text" />
              </div>
              <div className="lsItem">
                <label>Check-in Date</label>
                <span onClick={() => setOpenDate(!openDate)}>{`${format(
                  dates[0].startDate,
                  "MM/dd/yyyy"
                )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                {openDate && (
                  <DateRange
                    onChange={(item) => setDates([item.selection])}
                    minDate={new Date()}
                    ranges={dates}
                  />
                )}
              </div>
              <div className="lsItem">
                <label>Options</label>
                <div className="lsOptions">
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Min price <small>per night</small>
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMin(e.target.value)}
                      className="lsOptionInput"
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Max price <small>per night</small>
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMax(e.target.value)}
                      className="lsOptionInput"
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Adult</span>
                    <input
                      type="number"
                      min={1}
                      className="lsOptionInput"
                      placeholder={options.adult}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Children</span>
                    <input
                      type="number"
                      min={0}
                      className="lsOptionInput"
                      placeholder={options.children}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Room</span>
                    <input
                      type="number"
                      min={1}
                      className="lsOptionInput"
                      placeholder={options.rooms}
                    />
                  </div>
                </div>
              </div>
              <button onClick={handleClick}>Search</button>
            </div>
          )}
          {loading ? (
            <div className="places-skel">
            <Skeleton type="places" counter={28} />
            </div>
          ) : (
            <div className="listResult">
              <Places items={data} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
