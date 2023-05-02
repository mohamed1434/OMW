import NavBar from "../navbar/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faXmark } from "@fortawesome/free-solid-svg-icons";
import storage from "../../firebase";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import "./userProfile.css";
import { forwardRef, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { v4 } from "uuid";

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <button
    className="deletePhotoBtn"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <FontAwesomeIcon
      icon={faXmark}
      style={{ marginRight: "10px", position: "absolute", top: 0, left: 0 }}
    />
    {children}
  </button>
));

const UpdateProperty = () => {
  const [newData, setNewData] = useState({});
  const [imageUpload, setImageUpload] = useState([]);
  const propertyID = location.pathname.split("/")[4];
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const { data, loading, error, reFetch } = useFetch(
    baseURL + `/hotels/show/${propertyID}`
  );

  useEffect(() => {
    if (data) {
      setNewData(data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhotoDelete = async (e) => {
    const photoUrl = e.target.src;
    const newPhotos = newData.photos.filter((photo) => photo !== photoUrl);

    await axios.put(
      baseURL + `/hotels/${propertyID}`,
      { photos: newPhotos },
      {
        withCredentials: true,
      }
    );

    // Get a reference to the file
    const storageRef = ref(storage, photoUrl);

    try {
      // Delete the file
      await deleteObject(storageRef);

      // Update the state
      setNewData((prevState) => ({ ...prevState, photos: newPhotos }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const { owner, _id } = data;

      const urls = [];

      const uploadPromises = imageUpload.map((image) => {
        if (!image) return Promise.resolve();
        const imageRef = ref(
          storage,
          `images/${owner}/${_id}/${image.name + v4()}`
        );
        return uploadBytes(imageRef, image).then(() =>
          getDownloadURL(imageRef).then((url) => {
            urls.push(url);
          })
        );
      });

      await Promise.all(uploadPromises);

      const res2 = await axios.put(
        baseURL + `/hotels/${propertyID}`,
        {
          ...newData,
          photos: [...newData.photos, ...urls], // Add new URLs to the existing URLs
          urls: urls, // Add the new URLs array to the newData object
        },
        {
          withCredentials: true,
        }
      );
      const { photos } = res2.data;
      setNewData({ photos });

      console.log(res2);
    } catch (error) {
      console.log(error);
    }
    //remove above if doesnt work
    // await axios.put(baseURL + `/hotels/${propertyID}`, newData, {
    //   withCredentials: true,
    // });
  };

  return (
    <div>
      <NavBar />
      <div className="addProperty-wrapper">
        <div className="addProperty-container">
          <div className="addProperty">
            <h1>Edit your property</h1>

            <label id="title" htmlFor="title">
              Title :
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newData.title}
              onChange={handleChange}
            />
          </div>
          <div className="addProperty">
            <label id="name" htmlFor="name">
              Name :
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newData.name}
              onChange={handleChange}
            />
          </div>
          <div className="addProperty">
            <label id="type" htmlFor="type">
              Type :
            </label>
            <select
              id="type"
              name="type"
              value={newData.type}
              onChange={handleChange}
            >
              <option value="hotel">hotel</option>
              <option value="camp">camp</option>
              <option value="caravan">caravan</option>
              <option value="pool">pool</option>
              <option value="apartment">apartment</option>
              <option value="hotel">hotel</option>
            </select>
          </div>
          <div className="addProperty">
            <label id="city" htmlFor="city">
              City :
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={newData.city}
              onChange={handleChange}
            />
          </div>
          <div className="addProperty">
            <label id="address" htmlFor="address">
              Address :
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={newData.address}
              onChange={handleChange}
            />
          </div>
          <div className="addProperty">
            <label id="distance" htmlFor="distance">
              Distnace :
            </label>
            <input
              type="number"
              id="distance"
              name="distance"
              value={newData.distance}
              onChange={handleChange}
            />
          </div>
          <div className="addProperty">
            <div className="fileLabel">
              <label id="photos" htmlFor="photos">
                <input
                  type="file"
                  id="photos"
                  name="photos"
                  accept=".jpg,.jpeg,.png"
                  multiple
                  placeholder="Photos"
                  className="fileInput"
                  onChange={(event) => {
                    setImageUpload([...event.target.files]);
                  }}
                />
              </label>
              <FontAwesomeIcon
                icon={faFile}
                style={{ marginRight: "20px", fontSize: "20px" }}
              />
            </div>
            <div className="editPhotos">
              {newData &&
                newData.photos &&
                newData.photos.map((photo) => (
                  <>
                    <img src={photo} onDoubleClick={handlePhotoDelete} />
                  </>
                ))}
            </div>
          </div>
          <div className="addProperty">
            <label id="desc" htmlFor="desc">
              Description :
            </label>
            <textarea
              id="desc"
              name="desc"
              rows="5"
              cols="33"
              value={newData.desc}
              onChange={handleChange}
            />
          </div>
          <div className="addProperty">
            <label id="cheapestPrice" htmlFor="cheapestPrice">
              Price :
            </label>
            <input
              type="number"
              id="cheapestPrice"
              name="cheapestPrice"
              value={newData.cheapestPrice}
              onChange={handleChange}
            />
          </div>
          <button className="addBtn" type="submit" onClick={handleEdit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProperty;
