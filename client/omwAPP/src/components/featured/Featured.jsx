const Featured = () => {
  return (
    <div className="featured">
      <div className="featuredItem">
        <img
          className="featuredImg"
          src="https://images.unsplash.com/photo-1589088684702-d8feec945a39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGt1d2FpdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        />
        <div className="featuredTitles">
          <h1>Kuwait</h1>
          <h2>2000 properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          className="featuredImg"
          src="https://images.unsplash.com/photo-1632854269541-dfff1eb1646f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmVpcnV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        />
        <div className="featuredTitles">
          <h1>Leabnon</h1>
          <h2>1024 properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          className="featuredImg"
          src="https://images.unsplash.com/photo-1573082987491-217b12b67990?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGFtbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        />
        <div className="featuredTitles">
          <h1>Jordan</h1>
          <h2>200 properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
