import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import roomsRoute from "./routes/rooms.js";
import bookingRoute from "./routes/bookings.js";
import subscribesRoute from "./routes/subscribe.js";
 

import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()
dotenv.config()


// Définition de l'option strictQuery avant d'établir la connexion
mongoose.set('strictQuery', false);

//check the connection between the server and 
//the backend if is connected
const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to mongoDB.");
    } catch (error) {
      throw error;
    }
  };

  //check the connection between the server and 
  //the backend if is deconnected
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares 
app.use(express.json());
app.use(cors())
app.use(cookieParser())
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/subscribe", subscribesRoute);

//code load to redirect when error happens in backend
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Quelque chose s'est mal produit!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

//if the backend is connected
app.listen(8800, ()=>{
  connect()
    console.log("connected to backend")
})