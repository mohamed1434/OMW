import "./skeleton.css";
const Skeleton = ({ type, counter }) => {
  const PlacesSkeleton = () => (
    <div className="skel-container">
      <div className="skel-img">1</div>
      <div className="skel-info-container">
        <div className="skel-city">1</div>
        <div className="skel-title">1</div>
        <div className="skel-address">1</div>
      </div>
      <div className="skel-price-wrapper">
        <div className="skel-rating">1</div>
        <div className="skel-price">2</div>
      </div>
    </div>
  );
  const FeaturedSkeleton = () => (
    <div className="f">
    <div className="fItem">
      <div className="fImg"></div>
      <div className="fTitles">
        <div className="fCity">.</div>
        <div className="fCounts">.</div>
      </div>
    </div>
    <div className="fItem">
      <div className="fImg"></div>
      <div className="fTitles">
        <div className="fCity">.</div>
        <div className="fCounts">.</div>
      </div>
    </div>
    <div className="fItem">
      <div className="fImg"></div>
      <div className="fTitles">
        <div className="fCity">.</div>
        <div className="fCounts">.</div>
      </div>
    </div>
    </div>
  );
  if (type === "places") return Array(counter).fill(<PlacesSkeleton />);
  if(type === "featured") return <FeaturedSkeleton/> 
};

export default Skeleton;
