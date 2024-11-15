const mongoose = require("mongoose");


const carSchema = mongoose.Schema({
    user: {
      
    },
    name: {
        type: String, 
        required: [true, "Please add a name"]
    },
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      required: [true, "Please add an owner"],
    },
    
},{
    timestamps: true,
});


const Car = mongoose.model("Car", carSchema)
module.exports = Car

