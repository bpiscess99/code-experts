const Car = require("../models/carModel");
const asyncHandler = require("express-async-handler");


// Add a car 
const addCar = asyncHandler(async (req, res) => {
    const { name, model, price } = req.body;
  
    //   Validation
    if (!name || !model || !price) {
      res.status(400);
      throw new Error("Please fill in all fields");
    } 

    // Create Product
  const car = await Car.create({
      name,
      model,
      price,
      owner: req.user.id,
  });

  res.status(201).json(car);
});

// Get All Cars 
const getCars = asyncHandler(async (req, res) => {
    const cars = await Car.find({ owner: req.user.id }).sort("createdAt");
    // console.log(cars)
    res.status(200).json(cars);
  });

  // Get Single Car
const getCar = asyncHandler(async (req, res) => {
    const car = await Car.findById(req.params.id);
    // if car doesn't exist
    if (!car) {
      res.status(400);
      throw new Error("car not found");
    }
  
    // Match car to it's user
    if (car.owner.toString() !== req.user.id) {
      res.status(400);
      throw new Error("User not authorized");
    }
    res.status(200).json(car);
  });

  // Delete Car
const deleteCar = asyncHandler(async (req, res) => {
    const car = await Car.findById(req.params.id);
    // if product doesn't exist
    if (!car) {
      res.status(400);
      throw new Error("Product not found");
    }
    await car.deleteOne();
    res.status(200).json({ message: "Car deleted" });
  });

  // update product
const updateCar = asyncHandler(async (req, res) => {
    const { name, model, price } = req.body;
    const { id } = req.params;
  
    const car = await Car.findById(id);
  
    //   if product doesn't exist
    if (!car) {
      res.status(404);
      throw new Error("Product not found");
    }
  
    // Match product to it's user
    if (car.owner.toString() !== req.user.id) {
      // toString() return string as string and convert a string object into a string
      res.status(401);
      throw new Error("User not Authorized");
    }
   
    //   update Product
  const updatedCar = await Car.findByIdAndUpdate(
    {_id: id},
    {
      name,
      model,
      price,
    },
    {
      new: true,
      runValidators: true, 
    }
  );
  res.status(200).json({"car updated": updatedCar});
});

module.exports = {
    addCar,
    getCars,
    getCar,
    deleteCar,
    updateCar
}