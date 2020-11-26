const mongoose = require("mongoose")
const crypto = require("crypto")
const uuidv1 = require("uuid/v1")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: 32
    },
    hashed_password: {
        type: String,
        required:true
    },
    about: {
        type: String,
        trim: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
}, 
{ timestamps: true}
);

// virtual field
userSchema.virtual("passworld")
.set(function(passworld) {
    this._password = passworld
    this.salt = uuidv1()
    this.hashed_password = this.encryptPassword(passworld)
})
.get(function() {
    return this._password
})

userSchema.methods = {
    encryptPassword: function(passworld) {
        if(!passworld) return "";
        try {
            return crypto
            .createHmac("sha1", this.salt)
            .update(passworld)
            .digest("hex")
        } catch (err) {
            return "";
        }
    }
};

module.exports = mongoose.model( "User",UserSchema);