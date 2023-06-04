import { useContext, useState } from "react";
import NavBar from "../navbar/NavBar";
import { AuthContext } from "../../context/AuthContext";
import Footer from "../footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./userProfile.css";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [editMode, setEditMode] = useState("");
  const [newUsername, setNewUsername] = useState(user.username);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newPhone, setNewPhone] = useState(user.phone);

  const handleEditClick = (field) => {
    setEditMode(field);
  };

  const hidePhoneNumber = (phone) => {
    // find the index of the first digit after the country code
    const firstDigitIndex = phone.search(/\d/);
    // find the index of the last digit
    const lastDigitIndex = phone.length - 1;
    // create a new string where all digits except the first and last two are replaced with asterisks
    let hiddenPhone = "";
    for (let i = 0; i < phone.length; i++) {
      if (i < firstDigitIndex + 2 || i > lastDigitIndex - 2) {
        hiddenPhone += phone[i];
      } else {
        hiddenPhone += "*";
      }
    }
    return hiddenPhone;
  };

  const handleSaveClick = () => {
    // update user information in state and database
    // dispatch({ type: "UPDATE_USER", payload: { username: newUsername, email: newEmail, phone: newPhone } });
    setEditMode("");
  };

  return (
    <div>
      <NavBar />
      <div className="profile-info-container">
        <div className="profile-picture">
          <img src={user.img} />
          <label>Username : </label>
          {editMode === "username" ? (
            <div className="editContainer">
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <button onClick={handleSaveClick}>Save</button>
            </div>
          ) : (
            <>
              <div className="editContainer">
                <h4>{user.username}</h4>
                {/* <button onClick={() => handleEditClick("username")}>Edit</button> */}
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  onClick={() => handleEditClick("username")}
                  style={{ fontSize: "20px", marginBottom: "6px" }}
                />
              </div>
            </>
          )}
          <label>Email : </label>
          {editMode === "email" ? (
            <div className="editContainer">
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <button onClick={handleSaveClick}>Save</button>
            </div>
          ) : (
            <>
              <div className="editContainer">
                <h4>{user.email}</h4>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  onClick={() => handleEditClick("email")}
                  style={{ fontSize: "20px", marginBottom: "6px" }}
                />
              </div>
            </>
          )}
          <label>Phone : </label>
          {editMode === "phone" ? (
            <div className="editContainer">
              <input
                type="tel"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
              <button onClick={handleSaveClick}>Save</button>
            </div>
          ) : (
            <>
              <div className="editContainer">
                <h4>{hidePhoneNumber(user.phone)}</h4>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  onClick={() => handleEditClick("phone")}
                  style={{ fontSize: "20px", marginBottom: "6px" }}
                />
              </div>
            </>
          )}
          {/* {editMode && <button onClick={handleSaveClick}>Save</button>} */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
