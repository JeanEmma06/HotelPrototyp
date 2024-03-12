import { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import "./profil.css";

const Profil = () => {
  const { user} = useContext(AuthContext);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    username: user.username,
    userlastname: user.userlastname,
    email: user.email,
    country: user.country,
    address: user.address,
    zip: user.zip,
    city: user.city,
    phone: user.phone
  });
 

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      try {
        axios.put(`/users/${user._id}`, {
          username: user.username,
          userlastname: user.userlastname,
          email: user.email,
          country: user.country,
          address: user.address,
          zip: user.zip,
          city: user.city,
          phone: user.phone
        })
      } catch (error) {
        setError("Une erreur s'est produite lors de la mise a jour.");
      }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navContainer">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <span className="logo">HotelName</span>
          </Link>
        </div>
      </nav>
      <div className="profil">
          <div className="profil_container">
            <div className="profil_header">
              <div className="header_title">
                <h1 >Paramètres Utilisateur</h1>
              </div>
            </div>
            <div className="profil_main">
              <div className="main_picture">
                <div>
                  <div className="items-center">
                    <a href="#" className="main_photo">
                      <img alt="..." src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" img />
                    </a>
                    <div className="main_title">
                      <span className="mb-0">{user.username} {user.userlastname}</span>
                    </div>
                  </div>
                </div>
                <div className="main_button">
                  <button >Charger une nouvelle photo</button>
                </div>
              </div>

              <div className="main_info">
                <h3>Informations personnelles</h3>
              </div>
              <form onSubmit={handleSubmit} className="main_formContainer">
                <div className="main_form">
                  <div className="mainform_item">
                    <div>
                      <label className="form-label" for="first_name">Prénoms</label>
                      <input type="text" class="form-control" id="first_name" 
                      value={formData.username}
                      onChange={handleChange} ></input>
                    </div>
                  </div>
                  <div className="mainform_item">
                    <div>
                      <label class="form-label" for="last_name">Nom de famille</label>
                      <input type="text" class="form-control" id="last_name"
                      value={formData.userlastname}
                      onChange={handleChange}></input>
                    </div>
                  </div>
                </div>
                <div className="main_form">
                  <div className="mainform_item">
                    <div>
                      <label class="form-label" for="email">Email</label>
                      <input type="email" class="form-control" id="email"
                      value={formData.email}
                      onChange={handleChange} ></input>
                    </div>
                  </div>
                  <div className="mainform_item">
                    <div>
                      <label class="form-label" for="phone_number">Numéro de téléphone</label>
                      <input type="tel" class="form-control" id="phone_number"
                      value={formData.phone}
                      onChange={handleChange}></input>
                    </div>
                  </div>
                  <div className="mainform_item">
                    <div>
                      <label class="form-label" for="address">Adresse</label>
                      <input type="text" class="form-control" id="address"
                      value={formData.address}
                      onChange={handleChange}></input>
                    </div>
                  </div>
                  <div className="mainform_item">
                    <div>
                      <label class="form-label" for="city" >Ville</label>
                      <input type="text" class="form-control" id="city"
                      value={formData.city}
                       onChange={handleChange}></input>
                    </div>
                  </div>
                  <div className="mainform_item">
                    <div className="item_option">
                      <label className="form-label" for="country">Pays</label>
                      <select className="form-select" id="country" placeholder="Pays" >
                        <option selected>{formData.country}</option>
                        <option value="1">Canada</option>
                        <option value="2">USA</option>
                        <option value="3">Cote d'Ivoire</option>
                      </select>
                    </div>
                  </div>
                  <div className="mainform_item">
                    <div >
                      <label class="form-label" for="zip">Code Postal</label>
                      <input type="tel" className="form-control" id="zip"
                      value={formData.zip}
                       onChange={handleChange}></input>
                    </div>
                  </div>
                  <div className="mainform_checkbox">
                    <div class="form-check">
                      <input className="form-check-input" type="checkbox" name="check_primary_address" id="check_primary_address" ></input>
                      <label className="form-check-label" for="check_primary_address">
                        Mettre comme adresse par defaut
                      </label>
                    </div>
                  </div>
                </div>
                <div class="text-end">
                  <button >Annuler</button>
                  <button type="submit" >Enregistrer</button>
                </div>
              </form>
              <div className="main_last">
                <div className="last_section">
                    <div class="section_item">
                      <h5>Profil public</h5>
                      <p>
                      Rendre votre profil public signifie que n'importe qui sur le réseau pourra vous trouver.
                      </p>
                      <div >
                        <input type="checkbox" id="flexSwitchCheckDefault" checked ></input>
                      </div>
                    </div>
                </div>
                <div className="last_section">
                    <div class="section_item">
                      <h5 >Afficher mon e-mail</h5>
                      <p >
                      Afficher vos adresses e-mail signifie que n'importe qui sur le réseau pourra vous trouver.
                      </p>
                      <div>
                        <input type="checkbox" id="flexSwitchCheckDefault"></input>
                      </div>
                    </div>
                </div>
                <div className="last_section">
                    <div className="desactive_account">
                      <div>
                        <h5 >Supprimer le compte</h5>
                        <p>
                        Une fois votre compte supprimé, vous ne pourrez plus revenir en arrière. Soyez-en sûr, s'il vous plaît.
                        </p>
                      </div>
                      <div>
                        <button >Supprimer le compte</button>
                      </div>
                    </div>
                </div>
              </div>
            
            </div>
          </div>
      </div>
    </div>
  );
};

export default Profil;