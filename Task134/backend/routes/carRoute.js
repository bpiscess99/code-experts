const express = require("express");
const protect = require("../middleware/middleware");
const { addCar, updateCar, getCars, getCar, deleteCar } = require("../controllers/carController");
const router = express.Router();


router.post("/addCar", protect, addCar);
router.get("/", protect, getCars)
router.get("/:id", protect, getCar)
router.delete("/:id", protect, deleteCar)
router.patch("/:id", protect, updateCar)


module.exports = router;