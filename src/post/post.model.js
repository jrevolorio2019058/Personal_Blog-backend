import mongoose from "mongoose";

const PostSchema = mongoose.Schema({

    postName: {

        type: String,
        required: [true, "Is necessary the post Name."]

    },

    postDescription: {

        type: String,
        required: [true, "Is necessary the Post Description."]

    },

    postImage: {

        type: String,
        default: "none"

    },

    proyectLink: {

        type: [String],
        default: [""]

    },

    nameCreator: {

        type: String,
        required: [true, "Is necessary the name of the creator"]

    },

    nameComments: {

        type: [String],
        default: [""]

    }



});

export default mongoose.model('Post', PostSchema);