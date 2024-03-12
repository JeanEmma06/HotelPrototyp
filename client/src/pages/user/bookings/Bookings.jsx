import { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/jsx/Navbar";
import Footer from "../../../components/jsx/Footer";
import { AuthContext } from "../../../context/AuthContext";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../../components/jsx/Loading";
import "./bookings.css";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const { data: bookings, loading } = useFetch(`/users/bookings/${user._id}`);

  return (
    <>
      <Navbar />
      <div className="bookings">
        <h1 className="bookings__title">Historique des réservations</h1>
        {loading ? (
          <Loading />
        ) : (
          <ul className="bookings__list">
            {bookings.map((booking) => (
              <li key={booking._id} className="bookings__item">
                <div className="bookings__item-id">
                  <strong>ID de réservation:</strong> {booking._id}
                </div>
                <div className="bookings__item-dates">
                  <strong>Date de réservation:</strong> {booking.checkIn} au {booking.checkOut}
                </div>
                <div className="bookings__item-room">
                  <strong>Chambre réservée:</strong> {booking.roomName}
                </div>
                <div className="bookings__item-price">
                  <strong>Prix:</strong> {booking.totalPrice}
                </div>
                {/* Add additional information */}
                <div className="bookings__item-payment">
                  <strong>Payment:</strong> {booking.paymentDetails}
                </div>
                <div className="bookings__item-room-details">
                  <strong>Room Details:</strong> {booking.roomDetails}
                </div>
                <div className="bookings__item-client-info">
                  <strong>Client Information:</strong> {booking.clientInfo}
                </div>
                {/* Add images */}
                <div className="bookings__item-images">
                  
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Bookings;