import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faHome,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/esm/Button";
import { DateRange } from "react-date-range";
import { useState } from "react";
import { format } from "date-fns";
import { Dropdown, DropdownButton } from "react-bootstrap";
const Header = ({ type }) => {
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    rooms: 1,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  return (
    <div className="header">
      <div className={type === "list" ? "header-container list-mode" : "header-container"}>
        <div className="header-list">
          <div className="header-list-item active">
            <Button>
              <FontAwesomeIcon icon={faHome} />
              <span>Stays</span>
            </Button>
          </div>
          <div>
            <Button>
              <FontAwesomeIcon icon={faBed} />
              <span>Beds</span>
            </Button>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              Find your ideal rental property with ease
            </h1>
            <p className="headerDesc">
              Whether you're searching for a cozy apartment or a spacious house,
              our platform offers a wide selection of rental properties to suit
              your needs and budget.Browse our listings today and start your
              next adventure!
            </p>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faHome} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going ?"
                  className="headerSearchInput"
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => {
                    setOpenDate(!openDate);
                  }}
                  className="headerSearchText"
                >{`${format(date[0].startDate, "dd/MM/yy")} to ${format(
                  date[0].endDate,
                  "dd/MM/yy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    rangeColors={["#A82431", "#3ecf8e", "#fed14c"]}
                    className="date"
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => {
                    setOpenOptions(!openOptions);
                  }}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.rooms} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="otpionText">Adult</span>
                      <div class="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "dec")}
                        >
                          -
                        </button>
                        <span className="OptionCounterNumber">{`${options.adult}`}</span>
                        <button
                          disabled={options.adult >= 10}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "inc")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="otpionText">Children</span>
                      <div class="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "dec")}
                        >
                          -
                        </button>
                        <span className="OptionCounterNumber">{`${options.children}`}</span>
                        <button
                          disabled={options.children >= 10}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "inc")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="otpionText">Room</span>
                      <div class="optionCounter">
                        <button
                          disabled={options.rooms <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("rooms", "dec")}
                        >
                          -
                        </button>
                        <span className="OptionCounterNumber">{`${options.rooms}`}</span>
                        <button
                          disabled={options.rooms >= 10}
                          className="optionCounterButton"
                          onClick={() => handleOption("rooms", "inc")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <Button>Search</Button>
              </div>
            </div>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
