import Footer from "../../components/jsx/Footer";
import Navbar from "../../components/jsx/Navbar";
import {  useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import "./confirm.css";
import Loading from "../../components/jsx/Loading";
import Logo from "../../images/UCBU SIZE_1.2.png";

const Confirm= () => {
  const { user} = useContext(AuthContext);
  const { data, loading } = useFetch(`/users/confirm/${user._id}`);

 /*
  function getLastTwoDigits(cardNumber) {
    const lastTwoDigits = cardNumber.slice(-2);
    return lastTwoDigits;
  }
 */
  return (
    <div>
      <Navbar />
      {loading ? (
          <Loading />
        ) : (
          <div className="bg">
            <div className="card_confirm">
              <div className="card__success">
                <img src={Logo} alt="" />
              </div>
              <h1 className="card__msg">Payment Complete</h1>
              <p></p>
              <h1 className="card__msg">ID de reservation : {data._id}</h1>
              <h2 className="card__submsg">Merci d'avoir choisi HotelName</h2>

              <div className="card__body">
                <a href="#">
                  <img alt="..." src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" className="card__avatar" img />
                </a>
                <div className="card__recipient-info">
                  <p className="card__recipient">{user.username}</p>
                  <p className="card__email">{user.email}</p>
                </div>
                <h1 class="card__price"><span>$</span>{data.totalPrice}</h1>
                <p class="card__method">Payment method</p>

                <div class="card__payment">
                  <a href="#">
                    <img alt="..." src="https://seeklogo.com/images/V/VISA-logo-F3440F512B-seeklogo.com.png" className="card__credit-card" img />
                  </a>
                  <div class="card__card-details">
                    <p class="card__card-type">{data.typeCard}</p>
                    <p class="card__card-number">Carte bancaire se terminant par **</p>          
                  </div>
                </div>
              </div>
              <div className="card__tags">
                  <span className="card__tag">completed</span>
                  <span className="card__tag">#123456789</span>        
              </div>

            </div>
         </div>
        )}
         
      <Footer/>
    </div>
  );
};

export default Confirm;
