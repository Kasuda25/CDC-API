import { Schema, model } from "mongoose";

const jwtSchema = Schema({
    refreshToken: {
        type: String,
        required: true
    }
});

jwtSchema.methods.toJSON = function () {
    const { token } = this.toObject();
    return token;
}

export default model('JWT', jwtSchema);