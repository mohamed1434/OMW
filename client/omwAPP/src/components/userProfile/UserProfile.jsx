import { useContext } from "react";
import NavBar from "../navbar/NavBar";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./userProfile.css";
import {
  faBullhorn,
  faCircleInfo,
  faHouse,
  faMoneyBill,
  faPenToSquare,
  faShieldHalved,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const UserProfile = () => {
  const { user, dispatch } = useContext(AuthContext);
  return (
    <div>
      <NavBar />
      <div className="wrapper">
        <div className="account-container">
          <h1>Account</h1>
          <span>
            <b>{user.username}</b>, {user.email}·{" "}
            <a href="#" className="goTo">
              <b>Go to Profile</b>
            </a>
          </span>
        </div>
        <div className="user-options">
          <div className="personalInfo">
            <FontAwesomeIcon
              icon={faCircleInfo}
              style={{ marginBottom: "20px", fontSize: "20px" }}
            />
            <h4>Personal info</h4>
            <p>Provide personal details and how we can reach you</p>
          </div>
          <div className="personalInfo">
            <FontAwesomeIcon
              icon={faShieldHalved}
              style={{ marginBottom: "20px", fontSize: "20px" }}
            />
            <h4>Login & security</h4>
            <p>Update your password and secure your account</p>
          </div>

          <div className="personalInfo">
            <FontAwesomeIcon
              icon={faMoneyBill}
              style={{ marginBottom: "20px", fontSize: "20px" }}
            />
            <h4>Payments & payouts</h4>
            <p>Review payments, payouts, coupons, and gift cards</p>
          </div>

          <div className="personalInfo">
            <FontAwesomeIcon
              icon={faBullhorn}
              style={{ marginBottom: "20px", fontSize: "20px" }}
            />
            <h4>Notifications</h4>
            <p>
              Choose notification preferences and how you want to be contacted
            </p>
          </div>

          <div className="personalInfo">
            <FontAwesomeIcon
              icon={faHouse}
              style={{ marginBottom: "20px", fontSize: "20px" }}
            />
            <h4>Add a property</h4>
            <p>
              Add your own property to welcome guests to your house
            </p>
          </div>

          <div className="personalInfo">
            <FontAwesomeIcon
              icon={faTrash}
              style={{ marginBottom: "20px", fontSize: "20px" }}
            />
            <h4>Delete a property</h4>
            <p>
              Delete a property you don't want it anymore for guests
            </p>
          </div>

          <div className="personalInfo">
            <FontAwesomeIcon
              icon={faPenToSquare}
              style={{ marginBottom: "20px", fontSize: "20px" }}
            />
            <h4>Update a property</h4>
            <p>
              Update an existing property to provide the best info about it
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
