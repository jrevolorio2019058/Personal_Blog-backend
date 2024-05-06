import mongoose from "mongoose";

const CredentialsSchema = mongoose.Schema({

    role: {

        type: String

    }

});

export default mongoose.model('Credentials', CredentialsSchema);