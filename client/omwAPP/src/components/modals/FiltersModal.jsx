import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";

const FiltersModal = (props) => {
  //   const location = useLocation();
  //   const [destination, setDestination] = useState(location.state.destination);
  //   const [date, setDate] = useState(location.state.date);
  //   const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Filters</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{ maxHeight: "calc(100vh - 210px)", overflow: "auto" }}
      >
        <div className="filterItems">
          <h6>Destination</h6>
          <input type="text" placeholder="Kuwait" />
        </div>
        <div className="filterItems">
          <h6>Check-In Date</h6>
          <label>Check-in Date</label>
          <span onClick={() => setOpenDate(!openDate)}>{`${format(
            props.date[0].startDate,
            "MM/dd/yyyy"
          )} to ${format(props.date[0].endDate, "MM/dd/yyyy")}`}</span>
          {openDate && (
            <DateRange
              onChange={(item) => setDate([item.selection])}
              minDate={new Date()}
              ranges={date}
            />
          )}
        </div>
        <div className="filterItems">
          <h6>Min Price (per night)</h6>
          <input placeholder="min price" />
        </div>
        <div className="filterItems">
          <h6>Max Price (per night)</h6>
          <input placeholder="max price" />
        </div>
        <div className="filterItems">
          <h6>Adult</h6>
          <input type="text" placeholder="1" />
        </div>
        <div className="filterItems">
          <h6>Children</h6>
          <input type="text" placeholder="0" />
        </div>
        <div className="filterItems">
          <h6>Rooms</h6>
          <input type="text" placeholder="1" />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FiltersModal;
