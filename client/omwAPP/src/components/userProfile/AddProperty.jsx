import NavBar from "../navbar/NavBar";
import { useState, useRef, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import storage from "../../firebase";
import axios from "axios";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import "./userProfile.css";

const AddProperty = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [numImages, setNumImages] = useState(0);
  let formData = new FormData();
  const baseURL = import.meta.env.VITE_REACT_API_URL;

  const [imageUpload, setImageUpload] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const [data, setData] = useState({
    name: "",
    type: "",
    city: "",
    address: "",
    distance: null,
    title: "",
    desc: "",
    cheapestPrice: null,
    photos: [],
  });
  const { photos, ...dataToSend } = data;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleImageChange = (event) => {
  //   setImageFiles([...event.target.files]);
  //   setNumImages(event.target.files.length);
  // };

  // const uploadImages = async (event) => {
  //   imageFiles.forEach((file) => {
  //     formData.append("image", file);
  //   });
  //   const res = await axios.post(baseURL + "/uploads/upload", formData, {
  //     withCredentials: true,
  //   });
  //   const photoUrls = res.data.map((item) => item.filename);
  //   setData((prevState) => ({ ...prevState, photos: photoUrls }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post(baseURL + "/hotels", data, {
  //       withCredentials: true,
  //     });
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const imagesListRef = ref(storage, "images/");
  // const uploadFile = (userID, propertyID) => {
  //   imageUpload.map((image) => {
  //     if (image == null) return;
  //     const imageRef = ref(
  //       storage,
  //       `images/userID/propertyID/${image.name + v4()}`
  //     );
  //     uploadBytes(imageRef, image).then((snapshot) => {
  //       getDownloadURL(snapshot.ref).then((url) => {
  //         setImageUrls((prev) => [...prev, url]);
  //         setData((prevData) => {
  //           const newPhotos = [...prevData.photos, url];
  //           return { ...prevData, photos: newPhotos };
  //         });
  //       });
  //     });
  //   });
  // };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
          setData((prevData) => {
            const newPhotos = [...prevData.photos, url];
            return { ...prevData, photos: newPhotos };
          });
        });
      });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(baseURL + "/hotels", dataToSend, {
        withCredentials: true,
      });
      const { owner, _id } = res.data;
  
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
        baseURL + `/hotels/${_id}`,
        {
          ...data,
          photos: urls,
        },
        {
          withCredentials: true,
        }
      );
  
      console.log(res2);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div>
      <NavBar />
      <div className="addProperty-wrapper">
        <div className="addProperty-container">
          <form onSubmit={handleSubmit}>
            <div className="addProperty">
              <h1>Add a new property</h1>

              <label id="title" htmlFor="title">
                Title :
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Big red hotel"
                required
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
                placeholder="Property name"
                required
                onChange={handleChange}
              />
            </div>
            <div className="addProperty">
              <label id="type" htmlFor="type">
                Type :
              </label>
              <select id="type" name="type" onChange={handleChange}>
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
                placeholder="London"
                required
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
                placeholder="London street 1"
                required
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
                placeholder="500"
                required
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
                    required
                    className="fileInput"
                    //onChange={handleImageChange}
                    onChange={(event) => {
                      setImageUpload([...event.target.files]);
                    }}
                  />
                </label>
                <FontAwesomeIcon icon={faFile} />
                <button>Upload Images</button> {/**onClick={uploadFile} */}
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
                required
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
                placeholder="299"
                required
                onChange={handleChange}
              />
            </div>
            {/*If button doesn't work, it should be here*/}
            <button className="addBtn" type="submit">
              {" "}
              {/**disabled={numImages === 0 || data.photos.length === 0} */}
              Add
            </button>
          </form>
          <button className="addBtn" type="submit">
            {" "}
            {/**disabled={numImages === 0 || data.photos.length === 0} */}
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
