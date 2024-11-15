require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const carRoute = require("./routes/carRoute");
const path = require("path");


const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

// file upload path
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// routes middlewares
app.use("/api/users", userRoute);
app.use("/api/cars", carRoute);

// Routes 
app.get("/", (req, res) => {
    res.send("Hello World");
});

// connect with mongodb and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`)    
    })
})
.catch((err) => console.log(err))
