import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({

    creatorComment: {

        type: String,
        required: ["Is necessaty the creator Comment"]

    },

    titleComment: {

        type: String,
        required: ["Is necessary the tittle comment"]

    },

    descriptionComment: {

        type: String,
        required: ["Is necessary the description comment"]

    },

    postName: {

        type: String,
        required: ["Is necessary the post Name"]

    },

});

export default mongoose.model('Comment', CommentSchema);