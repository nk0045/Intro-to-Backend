import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minLength: 1,
            maxLength: 30
        },

        password: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 30
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        }
    },

    {
        timestamps:true
    }
)

// before saving any password we need to hash it
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);

    next();
});

// compare passwords
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", UserSchema)