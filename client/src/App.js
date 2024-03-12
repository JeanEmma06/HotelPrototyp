import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profil from "./pages/user/profile/profil";
import Room from "./pages/room/Room";
import Bookings from "./pages/user/bookings/Bookings";
import Confirm from "./pages/Confirmation/Confirm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/rooms" element={<List/>}/>
        <Route path="/rooms/:id" element={<Room/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/confirm" element={<Confirm/>}/>
        <Route path="/room/:id" element={<Room/>}/>
        <Route path="/profil" element={<Profil/>}/>
        <Route path="/bookings" element={<Bookings/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
