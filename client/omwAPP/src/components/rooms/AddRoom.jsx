import { useState } from "react";
import NavBar from "../navbar/NavBar";
import axios from "axios";

const AddRoom = () => {
  const propertyID = location.pathname.split("/")[4];
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const [newData, setNewData] = useState({
    title: "",
    desc: "",
    price: null,
    maxPeople: null,
    roomNumbers: [],
  });

  const [roomNumbers, setRoomNumbers] = useState([]);

  // Add a new room number object to the array when the user clicks the "Add" button
  const handleAddRoomNumber = () => {
    setRoomNumbers([...roomNumbers, {}]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Update the number property of a room number object in the array when the user changes the input field
  const handleRoomNumberChange = (index, value) => {
    const newRoomNumbers = [...roomNumbers];
    newRoomNumbers[index] = { number: value };
    setRoomNumbers(newRoomNumbers);
    setNewData((prevState) => ({ ...prevState, roomNumbers: newRoomNumbers }));
  };
  const renderRoomNumbers = () => {
    return roomNumbers.map((roomNumber, index) => {
      return (
        <div key={index} className="addProperty">
          <label htmlFor={`roomNumber-${index}`}>Room number :</label>
          <input
            type="text"
            id={`roomNumber-${index}`}
            name={`roomNumber-${index}`}
            value={roomNumber.number || ""}
            onChange={(e) => handleRoomNumberChange(index, e.target.value)}
          />
        </div>
      );
    });
  };

  const handleSubmit = async () => {
    try {
      const formattedData = {
        ...newData,
        roomNumbers: roomNumbers.map((roomNumber) => ({
          number: roomNumber.number,
        })),
      };
      const res = await axios.post(
        baseURL + `/rooms/${propertyID}`,
        formattedData,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <NavBar />
      <div className="addProperty-wrapper">
        <div className="addProperty-container">
          <div className="addProperty">
            <h1>Add rooms</h1>

            <label id="title" htmlFor="title">
              Title :
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              onChange={handleChange}
            />
          </div>
          <div className="addProperty">
            <label id="desc" htmlFor="desc">
              Description :
            </label>
            <textarea
              id="desc"
              name="desc"
              rows="4"
              cols="50"
              required
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="addProperty">
            <label id="price" htmlFor="price">
              Price :
            </label>
            <input
              type="number"
              id="price"
              name="price"
              required
              onChange={handleChange}
            />
          </div>
          <div className="addProperty">
            <label id="maxPeople" htmlFor="maxPeople">
              Maximum number of people :
            </label>
            <input
              type="number"
              id="maxPeople"
              name="maxPeople"
              required
              onChange={handleChange}
            />
          </div>
          {renderRoomNumbers()}
          <button className="addBtn" onClick={handleAddRoomNumber}>Add a room number</button>
          <button className="addBtn" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};
export default AddRoom;
