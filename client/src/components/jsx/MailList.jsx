import { useState } from "react";
import axios from "axios";
import "../css/mailList.css";

const MailList = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      try {
        await axios.post("/subscribe", { email });
        setMessage("Merci de vous être abonné à ReservAfrik !");
        setEmail("");
      } catch (err) {
        setMessage("Une erreur s'est produite. Veuillez réessayer.");
      }
    } else {
      setMessage("Veuillez saisir une adresse e-mail valide.");
    }
  };

  return (
    <div className="mail">
      <h1 className="mailTitle">Gagnez du temps et de l'argent !</h1>
      <span className="mailDesc">
        Inscrivez-vous et nous vous enverrons les meilleures offres
      </span>
      <form className="mailInputContainer" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Votre adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">S'abonner</button>
      </form>
      {message && <span className="mailMessage">{message}</span>}
    </div>
  );
};

export default MailList;