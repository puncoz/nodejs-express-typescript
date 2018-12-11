import {model, Schema} from "mongoose";

const UserSchema: Schema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true, lowercase: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdAt: Date,
    updatedAt: Date,

    posts: [{type: Schema.Types.ObjectId, ref: "Post"}]
});

export default model("User", UserSchema);
