const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    firstName: {
        type: String, 
        required: [true, "Please add a name"]
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Please add a email"],
        unique: true,
        trim: true,
        match: [
           /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
           "Please enter a valid email" // Regex for validation of email     
        ]
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minLength: [6, "Password word must be up to 6 characters"],
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            "Password must include an uppercase letter, a lowercase letter, a number, and a special character"
          ]
    },
    photo: {
        type: Object,
        default: {},
    },
    dateOfBirth: {
       type: String 
    },
    skills:{
        type: [String],
        required: true,
    },
},{
    timestamps: true,
});

// Encrypt password before to saving to DB

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next()
    }

// Hash Password
const salt = await bcrypt.genSalt(10); // genSalt(10) is algorthim and 10 speed is very good
const hashedPassword = await bcrypt.hash(this.password, salt); // it will get the simple password and then will bcrypt after merge in salt
this.password = hashedPassword;
next();
});


const User = mongoose.model("User", userSchema)
module.exports = User

// Email
// Password (Must have Strong Password)
// Confirm Password
// User Image
// Date of Birth 
// Skills/Expertise (multiple input fields by clicking on the “Add more” button)
