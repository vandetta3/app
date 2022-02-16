const mongoose = require("mongoose");
const validator = require("validator");

const clientSchema = mongoose.Schema({
  ClientId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  AgencyId: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  Name: {
    type: String,
    required: true,
    maxLength: 30,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },

  TotalBill: {
    type: Number,
    required: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
    unique: true,
    minLength: 8,
    maxLength: 13,
  },
});

clientSchema.statics.clientExists = async function (clientId) {
  const client = await this.findOne({ ClientId: clientId });
  return !!client;
};

const Client = mongoose.model("Client", clientSchema);
module.exports = { Client };
