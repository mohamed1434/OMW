import Featured from "../featured/Featured";
import Header from "../header/Header";
import MailList from "../mailList/MailList";
import NavBar from "../navbar/NavBar";
import Places from "../propertyList/Places";
import PropertyList from "../propertyList/PropertList";

const Home = () => {
  return (
    <div>
      <NavBar />
      <Header />
      <div className="homeContainer">
        <h1 class="homeTitle">Featured countries</h1>
        <Featured />
        <h1 class="homeTitle">Browse by property type</h1>
        <PropertyList />
        <h1 class="homeTitle">All properties</h1>
        <Places />
        <MailList />
      </div>
    </div>
  );
};

export default Home;
