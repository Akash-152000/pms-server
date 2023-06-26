const mongoose = require("mongoose");
const { Schema } = mongoose;

const PropertiesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  Owner_name: {
    type: String,
    required: true,
  },
  Owner_phone: {
    type: Number,
    required: true,
  },
  Owner_address: {
    type: String,
    required: true,
  },
  Owner_email: {
    type: String,
    required: true,
  },
  Property_address: {
    type: String,
    required: true,
  },
  Property_status: {
    type: String,
    required: true,
  },
  Property_tenant_name: {
    type: String,
    required: function () {
      return this.Property_status === "occupied";
    },
  },
  Property_tenant_phone: {
    type: Number,
    required: function () {
      return this.Property_status === "occupied";
    },
  },
  Property_tenant_address: {
    type: String,
    required: function () {
      return this.Property_status === "occupied";
    },
  },
  Property_tenant_type: {
    type: String,
    required: function () {
      return this.Property_status === "occupied";
    },
  },
  Property_type: {
    type: String,
    required: true,
  },
  Rooms: {
    type: Number,
    required: true
  },
  Toilets: {
    type: Number,
    required: true
  },
  Electricity: {
    type: String,
    required: true,
    },
  Water_supply: {
    type: String,
    required: true,
  },
  Security: {
    type: Number,
    required: true,
  },
  Rent: {
    type: Number,
    required: true,
  },
  Tenants_count: {
    type: Number,
    required: function () {
      return this.Property_tenant_type === "Single";
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Properties = mongoose.model("properties", PropertiesSchema);
module.exports = Properties;
