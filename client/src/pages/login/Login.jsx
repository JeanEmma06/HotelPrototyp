import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Logo from "../../images/UCBU SIZE_1.2.png";
import "./login.css";
import loading from "../../components/jsx/Loading";

const Login = () => {
  const [ user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data.details });
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  return (
    <div>
      <div className="login">
        <div className="login__container">
            <div className="logo_login">
              <img src={Logo} alt="" />
            </div>

            <div className="email">
              <label htmlFor="email">e-mail</label>
              <div className="sec-2">
                <i className="fas fa-envelope"></i>
                <input
                  type="text"
                  id="email"
                  value={credentials.email}
                  onChange={handleChange}
                  className="login__input"
                />
              </div>
            </div>

            <div className="password">
              <label htmlFor="password">Mot de passe</label>
              <div className="se-2">
                <i className="fas fa-lock"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="login__input"
                />
               <div className="se-2_modif"> 
                  <i className="fas fa-eye" onClick={handleTogglePassword}>
                </i></div>
              </div>
            </div>
          
          <button
            disabled={loading} 
            onClick={handleLogin}
            className="login_btn"
          >
            {loading ? "<connexion en cours...>" : "Se connecter"}
          </button>
          {error && <span className="login__error">{error.message}</span>}
        </div>
      </div>
    </div>
  );
};

export default Login;