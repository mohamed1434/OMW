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
  faPlus,
  faShieldHalved,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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
            {/* <a href="#" className="goTo"> */}
            <Link to="/user-profile/profileInfo" style={{  color: "black" }}>
              <b>Go to Profile</b>
            </Link>
            {/* </a> */}
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

          <Link
            to="/user-profile/add-property"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="personalInfo">
              <FontAwesomeIcon
                icon={faPlus}
                style={{ marginBottom: "20px", fontSize: "20px" }}
              />
              <h4>Add a property</h4>
              <p>Add your own property to welcome guests to your house</p>
            </div>
          </Link>
          <Link
            to="/user-profile/my-properties"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="personalInfo">
              <FontAwesomeIcon
                icon={faHouse}
                style={{ marginBottom: "20px", fontSize: "20px" }}
              />
              <h4>My properties</h4>
              <p>
                View all your properties that you own in order to edit or delete
                the property
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
