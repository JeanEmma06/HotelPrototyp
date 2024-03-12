import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Logo from "../../images/UCBU SIZE_1.2.png";
import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: undefined,
    userlastname: undefined,
    email: undefined,
    country: undefined,
    city: undefined,
    phone: undefined,
    password: undefined,
    confirmPassword: undefined,
  });
 
  
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      dispatch({
        type: "REGISTER_FAILURE",
        payload: { message: "Les mots de passe ne correspondent pas" },
      });
      return;
    }
    dispatch({ type: "REGISTER_START" });
    try {
      const response = await axios.post("/auth/register", formData);
      dispatch({ type: "REGISTER_SUCCESS", payload: response.data.details });
      navigate("/login");
    } catch (error) {
      dispatch({ type: "REGISTER_FAILURE", payload: error.response.data });
    }
  };

  return (
    <div>
      
      <div className="register">
        <div className="register__container">
          <div className="logo_login">
              <img src={Logo} alt="" />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="division">
              <div className="side_left">
                <div className=" section_division">
                  <input
                    type="text"
                    placeholder="Prenom"
                    id="username"
                    onChange={handleChange}
                    className="register__input"
                    required
                  />
                  <i class="fas fa-user"></i>
                </div>

                <div className=" section_division">
                  <input
                    type="text"
                    placeholder="Nom de famille"
                    id="userlastname"
                    onChange={handleChange}
                    className="register__input"
                    required
                  />
                  <i class="fas fa-user"></i>
                </div>

                <div className=" section_division">
                  <input
                    type="email"
                    placeholder="Adresse e-mail"
                    id="email"
                    onChange={handleChange}
                    className="register__input"
                    required
                  />
                  <i class="fas fa-envelope"></i>
                </div>

                <div className=" section_division">
                  <input
                    type="text"
                    placeholder="Pays"
                    id="country"
                    onChange={handleChange}
                    className="register__input"
                    required
                  />
                  <i class="fas fa-globe"></i>
                </div>
              </div>

              <div className="side_right">

                <div className=" section_division" >
                  <input
                    type="text"
                    placeholder="Ville"
                    id="city"
                    onChange={handleChange}
                    className="register__input"
                    required
                  />
                  <i class="fas fa-city"></i>
                </div>
                <div className=" section_division">
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    id="phone"
                    onChange={handleChange}
                    className="register__input"
                    pattern="[0-9]{10}"
                    title="Veuillez entrer un numéro de téléphone valide"
                    required
                  />
                  <i class="fas fa-phone"></i>
                </div>
                <div className=" section_division">
                  <input
                    type="password"
                    placeholder="Mot de passe"
                    id="password"
                    onChange={handleChange}
                    className="register__input"
                    required
                  />
                  <i class="fas fa-lock"></i>
                </div>
               <div className=" section_division">
                <input
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    id="confirmPassword"
                    onChange={handleChange}
                    className="register__input"
                    required
                  />
                  <i class="fas fa-lock"></i>
               </div>
              </div>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="register__button"
            >
              {loading ? "En cours..." : "S'inscrire"}
            </button>
          </form>
          {error && <span className="register__error">{error.message}</span>}
        </div>
      </div>

      </div>
  );
};

export default Register;