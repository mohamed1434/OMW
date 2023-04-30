import { Button } from "react-bootstrap";
import NavBar from "../navbar/NavBar";

const AddProperty = () => {
  return (
    <div>
      <NavBar />
      <div className="addProperty">
        <label id="title" for="title">
          Title :
        </label>
        <input type="text" id="title" name="title" placeholder="Big red hotel" />
      </div>
      <div className="addProperty">
        <label id="name" for="name">
          Name :
        </label>
        <input type="text" id="name" name="name" placeholder="Property name" />
      </div>
      <div className="addProperty">
        <label id="type" for="type">
          Type :
        </label>
        <select id="type" name="type">
          <option value="hotel">hotel</option>
          <option value="camp">camp</option>
          <option value="caravan">caravan</option>
          <option value="pool">pool</option>
          <option value="apartment">apartment</option>
          <option value="hotel">hotel</option>
        </select>
      </div>
      <div className="addProperty">
        <label id="city" for="city">
          City :
        </label>
        <input type="text" id="city" name="city" placeholder="London" />
      </div>
      <div className="addProperty">
        <label id="address" for="address">
          Address :
        </label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="London street 1"
        />
      </div>
      <div className="addProperty">
        <label id="distance" for="distance">
          Distnace :
        </label>
        <input type="number" id="distance" name="distance" placeholder="500" />
      </div>

      <div className="addProperty">
        <label id="photos" for="photos">
          Images :
        </label>
        <input type="img" id="photos" name="photos" placeholder="Photos" />
      </div>

      <div className="addProperty">
        <label id="desc" for="desc">
          Description :
        </label>
        <textarea id="desc" name="desc" rows="5" cols="33">
          Big red hotel with ....
        </textarea>
      </div>

      <div className="addProperty">
        <label id="price" for="price">
          Price :
        </label>
        <input type="number" id="price" name="price" placeholder="299" />
      </div>
      <button className="addBtn">Add</button>
    </div>
  );
};

export default AddProperty;
