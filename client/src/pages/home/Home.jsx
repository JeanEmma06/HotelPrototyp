import Featured from "../../components/jsx/Featured";
import FeaturedProperties from "../../components/jsx/FeaturedProperties";
import Footer from "../../components/jsx/Footer";
import Header from "../../components/jsx/Header";
import MailList from "../../components/jsx/MailList";
import Navbar from "../../components/jsx/Navbar";
import PropertyList from "../../components/jsx/PropertyList";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header/>
      <div className="homeContainer">
        <Featured />
        <h1>Nous sommes présent partout</h1>
        <MailList/>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
