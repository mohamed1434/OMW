import { useState } from "react";
import Featured from "../featured/Featured";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import MailList from "../mailList/MailList";
import NavBar from "../navbar/NavBar";
import Places from "../propertyList/Places";
import PropertyList from "../propertyList/PropertList";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div>
      <NavBar />
      <Header />
      <div className="homeContainer">
        <h1 className="homeTitle">Featured countries</h1>
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
        {/* <h1 className="homeTitle">All properties</h1>
        <Places /> */}
        <MailList />
      </div>
      <Footer show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default Home;
