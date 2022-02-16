const mongoose = require("mongoose");

const agencySchema = mongoose.Schema({
  AgencyId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  Name: {
    type: String,
    required: true,
    maxLength: 30,
  },
  Address1: {
    type: String,
    required: true,
  },
  Address2: {
    type: String,
  },
  State: {
    type: String,
    required: true,
    maxLength: 20,
  },
  City: {
    type: String,
    required: true,
    maxLength: 20,
  },
  PhoneNumber: {
    type: String,
    required: true,
    unique: true,
    maxLength: 13,
  },
});

agencySchema.statics.agencyExists = async function (agencyId) {
  const agency = await this.findOne({ AgencyId: agencyId });

  return agency;
};

const Agency = mongoose.model("Agency", agencySchema);
module.exports = { Agency };
