import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Reserve = (props) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const { data, loading, error, reFetch } = useFetch(
    baseURL + `/hotels/room/${props.hotelid}`
  );
  const { dates } = useContext(SearchContext);
  const navigate = useNavigate();
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) => {
      allDates.includes(new Date(date).getTime());
    });
    return !isFound;
  };
  
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(baseURL + `/rooms/availability/${roomId}`, {
            dates: allDates,
          });
          console.log(roomId);
          return res.data;
        })
      );
    } catch (err) {
      console.log(err);
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
          Reserve a room
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>Select your rooms</span>
        {data.map((item) => (
          <div className="rItem">
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max People: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClick} className="rButton">
          Reserve Now!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Reserve;
