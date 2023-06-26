const mongoose = require("mongoose");
const { Schema } = mongoose;

const TenantsSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  Tenant_name: {
    type: String,
    required: true,
  },
  Tenant_phone: {
    type: Number,
    required: true,
  },
  Tenant_address: {
    type: String,
    required: true,
  },
  Tenant_email: {
    type: String,
    required: true,
  },
  Tenant_adhaar: {
    type: String,
    unique: true,
  },
  Tenant_type: {
    type: String,
  },
  Property_address: {
    type: String,
    required: true,
  },
  Owner_name: {
    type: String,
    required: true,
  },
  Property_type: {
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
  date: {
    type: Date,
    default: Date.now,
  },
});
const Tenants = mongoose.model("tenants", TenantsSchema);
module.exports = Tenants;
