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

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    userlastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
    },
    address: {
      type: String,
    },
    zip: {
      type: String,
    },
    city: {
      type: String,
    },
    img: {
      data: Buffer,
      type: String,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    creditCard: {
      type: [CreditCardSchema],
    },
    bookings: {
      type: [String]
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
