import useFetch from "../../hooks/useFetch";

const Featured = () => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const { data, loading, error } = useFetch(
    baseURL + "/hotels/countByCity?cities=Kuwait city,Beirut,Amman"
  );
  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              className="featuredImg"
              src="https://images.unsplash.com/photo-1589088684702-d8feec945a39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGt1d2FpdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            />
            <div className="featuredTitles">
              <h1>Kuwait City</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              className="featuredImg"
              src="https://images.unsplash.com/photo-1632854269541-dfff1eb1646f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmVpcnV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            />
            <div className="featuredTitles">
              <h1>Beirut</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              className="featuredImg"
              src="https://images.unsplash.com/photo-1573082987491-217b12b67990?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGFtbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            />
            <div className="featuredTitles">
              <h1>Amman</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
