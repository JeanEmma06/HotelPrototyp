import "../css/navbar.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import '@fortawesome/fontawesome-free/css/all.min.css';
//import Logo from "../../images/UCBU SIZE-16.png";


const Navbar = () => {
  const { user,  dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  
  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout", null, { withCredentials: true });
      dispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGOUT_FAILURE", payload: error.response.data });
    }
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">HotelName</span>
        </Link>
        {user ? (
          <div className="navItems">
            <div className="dropdown">
              <button className="navLink dropdown-toggle" onClick={handleDropdownToggle}>
                {user.username}
              </button>
              {showDropdown && (
                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="sidebarAvatar">
                  <a href="/profil" class="dropdown-item">Paramètres</a>
                  <a href="/bookings" class="dropdown-item">Reservations</a>
                  <a onClick={handleLogout} class="dropdown-item">Se déconnecter</a>
              </div>
              )}
            </div>
            <img className="profilePicture" src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" alt="Profile" />
          </div>
        ) : (
          <div className="navItems">
             <div class="dropdown">
                <button class="navLink dropdown-toggle" onClick={handleDropdownToggle}>
                  <i class="fas fa-cog"></i>
                </button>
                {showDropdown && (
                  <div class="dropdown-menu dropdown-menu-end" aria-labelledby="sidebarAvatar">
                    <a href="/register"  class="dropdown-item">Inscription</a>
                    <a href="/login"  class="dropdown-item">Connexion</a>
                    <a href="/"  class="dropdown-item">Centre d'aide</a>
                  </div>
                )}
              </div>
            <img className="profilePicture" src="https://cdn3d.iconscout.com/3d/premium/thumb/user-6132700-5043877.png?f=webp" alt="Profile" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;