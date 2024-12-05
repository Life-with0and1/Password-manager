import mongoose from "mongoose";


const credentialSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  cred: {
    type: String,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export const CredentialsModal =
  mongoose.models.Credential ||
  mongoose.model("Credential", credentialSchema);
