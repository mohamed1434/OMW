import useFetch from "../../hooks/useFetch";
import { types } from "./Types";
const PropertyList = () => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const { data, loading, error } = useFetch(
    baseURL + `/hotels/countByType?types=${types()}` //hotel,pool,camp,cabin,caravan
  );
  const images = [
    "https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1595181961755-bcca8f3b675f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNhbXB8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://plus.unsplash.com/premium_photo-1664358190450-2d84d93b9546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGNhcmF2YW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FiaW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1577974454721-bd643a5a6c49?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHBvb2x8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  ];
  return (
    <div className="propertyList">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          {data &&
            images.map((img,i) => (
              <div className="propertyListItem" key={i}>
                <img src={img} className="propertyListImg" />
                <div className="propertyListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>{data[i]?.count} {data[i]?.type}s</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
