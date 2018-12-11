import {model, Schema} from "mongoose";

const PostSchema: Schema = new Schema({
    title: {type: String, required: true},
    slug: {type: String, required: true, unique: true, lowercase: true},
    content: {type: String, required: true},
    featuredImage: {type: String, default: ""},
    createdAt: Date,
    updatedAt: Date
});

export default model("Post", PostSchema);
