import Navbar from "../../components/jsx/Navbar";
import Header from "../../components/jsx/Header";
import MailList from "../../components/jsx/MailList";
import Footer from "../../components/jsx/Footer";
import Loading from "../../components/jsx/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faDoorClosed,
  faDesktop,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Payment from "../../components/jsx/payment";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "./room.css";

const Room = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [openModal, setOpenModal] = useState(false);
  const [openDate, setOpenDate] = useState(false);

  const {data, loading } = useFetch(`/rooms/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, setDates } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  let days = dayDifference(dates[0].endDate, dates[0].startDate);
  let defaultDay = 1;
  if (days === 0) {
    days = defaultDay;
   }

  //details sur le prix de la reservation
  let prixdefaut;
  if (days === 0) {
    prixdefaut = data.price;
  } else {
    prixdefaut = data.price * days; 
  }
  const fraisCleaning = 165;
  const price = prixdefaut + fraisCleaning;
  const taxes = price * 0.15;
  const totalPrice = price + taxes;

  const handleClick = () => {
    if (user) { 
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        <Loading />
      ) : (
        <div className="containerRoom">
          <div className="rhotelContainer">
            <div className="rhotelName">
              <h1>HotelName</h1>
            </div>
            
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>100 Rue du Succes</span>
            </div>
          </div>
         
          <div className="rContainerRoom">
               <div className="rDetailReservation">
                  <div className=" infoRoom">
                    <FontAwesomeIcon icon={faDesktop} />
                    <h3>Espace de travail</h3>
                  </div>
                  <div className=" infoRoom">
                    <FontAwesomeIcon icon={faDoorClosed} />
                    <h3>Arrivee autonome</h3>
                  </div>
                  <div className=" infoRoom">
                    <FontAwesomeIcon icon={faPerson} />
                    <h3>Super hote a votre disposition</h3>
                  </div>
                  <div className="detailRoom"></div>
                  <div className="imgRoom">
                  {data.photos?.map((photo, i) => (
                    <div className="rhotelImgWrapper" key={i}>
                      <img
                        src={photo}
                        alt=""
                        className="rhotelImg"
                      />
                    </div>
                  ))}
                  </div>
               </div>

               <div className="rPayment">
                  <h1 className="priceByNight">{data.price}$ CAD<small>  par nuit</small></h1>
                  <div className="detailDates">
                    <span onClick={() => setOpenDate(!openDate)}>{`${format(
                      dates[0].startDate,
                      "MM/dd/yyyy"
                    )}  à  ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                    {openDate && (
                      <DateRange
                        onChange={(item) => setDates([item.selection])}
                        minDate={new Date()}
                        ranges={dates}
                      />
                    )}
                  </div>
                  <button onClick={handleClick}>Reserver</button>
                  <div className="detailPrice">
                    <div className="dPrice">
                      <div className="dPrice_item">{data.price}$ CAD x {days} nuits</div>
                      <div className="dPrice_item">{prixdefaut}$ CAD</div>
                    </div>
                    <div className="dPrice">
                      <div className="dPrice_item">Frais de netoyage</div>
                      <div className="dPrice_item">{fraisCleaning}$ CAD</div>
                    </div>
                    <div className="dPrice">
                    <div className="dPrice_item">Taxes</div>
                      <div className="dPrice_item">{taxes}$ CAD</div>
                    </div>
                    <div className="dPrice"></div>
                  </div>
                  <div className="dTotal">
                  <div className="dPrice_item">Total</div>
                      <div className="dPrice_item">{totalPrice}$ CAD</div>
                  </div>
               </div>
          </div>
          
        </div>
      )}
      {openModal && <Payment setOpen={setOpenModal} roomId={id} price={totalPrice} dates={dates}/>}

      <MailList />
      <Footer />
    </div>
  );
};

export default Room;