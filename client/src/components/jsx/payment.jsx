import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import "../css/payment.css";
import Loading from "./Loading";
import Logo from "../../images/UCBU SIZE-16.png";

const Payment = ({ setOpen, roomId, price, dates }) => {
  const { loading } = useFetch(`/rooms/find/${roomId}`);
  const { user } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    cardHolderName: undefined,
    cardNumber: undefined,
    typeCard: undefined,
    cardExpiration: undefined,
    cvv: undefined,
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoi des données de réservation au serveur
      await Promise.all([
        //axios.put(`/rooms/availability/${roomId}`, {dates: alldates, }),
        axios.post(`/bookings/${roomId}`, { 
          userId: user._id,
          checkIn: dates[0].startDate,
          checkOut: dates[0].endDate,
          totalPrice: price,
          creditCard: formData, }),
        axios.put(`/users/${user._id}`, { creditCard:formData})
      ]);

      setOpen(true);
      navigate("/confirm");
    } catch (error) {
      setError("Une erreur s'est produite lors du paiement.");
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="payment">
          {error && <div className="pError">{error}</div>}
          <div className="card">
            <div className="leftside">
              <img src={Logo} className="product" alt="hotel" />
            </div>

            <div className="pContainer">
              <form onSubmit={handleSubmit}>
                <h1>Paiement</h1>
                <h2>Informations sur le paiement</h2>
                <p>Nom sur la carte</p>
                <input
                  type="text"
                  className="inputbox"
                  id="cardHolderName"
                  onChange={handleInputChange}
                  required
                />
                <p>Numéro de la carte</p>
                <input
                  type="text"
                  className="inputbox"
                  id="cardNumber"
                  onChange={handleInputChange}
                  maxLength="16"
                  pattern="[0-9]{0,16}"
                  required
                />
                <p>Type</p>
                <select
                  className="inputbox"
                  id="typeCard"
                  onChange={handleInputChange}
                  required
                >
                  <option value="">--Sélectionnez un type de carte--</option>
                  <option value="Visa">Visa</option>
                  <option value="MasterCard">MasterCard</option>
                </select>
                <div className="expcvv">
                  <p className="expcvv_text">Expiration</p>
                  <input
                    type="text"
                    className="inputbox"
                    minLength={4}
                    maxLength={4}
                    id="cardExpiration"
                    onChange={handleInputChange}
                    pattern="[0-9]{0,16}"
                    required
                  />
                  <p className="expcvv_text2">CVV</p>
                  <input
                    type="number"
                    className="inputbox"
                    id="cvv"
                    onChange={handleInputChange}
                    minLength={3}
                    maxLength="3"
                    required
                  />
                </div>
                <p></p>
                <button
                  type="submit"
                  className="button"
                  disabled={loading}
                >
                  
                  {loading ?  "En cours de traitement..." : "Payer maintenant"}
                </button>
              </form>
              <button className="pClose" onClick={() => setOpen(false)}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;