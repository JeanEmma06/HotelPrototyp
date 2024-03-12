import mongoose from "mongoose";

const CreditCardSchema = new mongoose.Schema({
  
  cardHolderName: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: Number,
    required: true,
  },
  typeCard:{
    type: String,
    enum: ['Visa', 'MasterCard'],
    default: 'Visa'
  },
  cardExpiration: {
    type: String,
    required: true,
  },
  cvv: {
    type: Number,
    required: true,
  },
});

const BookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  checkIn: {
    type: String,
    required: true,
  },
  checkOut: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: String,
    required: true,
  },
  creditCard: {
    type: CreditCardSchema,
    required: true,
  },
});

export default mongoose.model("Booking", BookingSchema);