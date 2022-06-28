const asyncHandler = require('express-async-handler');
const Starship = require('../models/starshipModel');
const User = require('../models/userModel');

// @desc    Get starships
// @route   GET /api/starships/
// @access  Private
const getStarships = asyncHandler(async (req, res) => {
    const starships = await Starship.find({ user: req.user.id });
    res.status(200).json(starships);
});

// @desc    Set starships
// @route   Post /api/starships/
// @access  Private
const setStarship = asyncHandler(async (req, res) => {

    if(!req.body){
        res.status(400);
        throw new Error('Please enter starship details.')
    }

    const { shipName, shipRegistry, shipClass, topSpeed, manufacturer} = req.body;

    console.log(req.body);

    if(!shipName || !shipRegistry || !shipClass || !topSpeed || !manufacturer){
        res.status(400);
        throw new Error('Please submit values for all fields.')
    }

    const starshipExists = await Starship.findOne({ shipRegistry });

    if(starshipExists){
        res.status(400);
        throw new Error('StarshipExists already exists with that registry id.');
    }

    const starship = await Starship.create({
        user: req.user.id,
        shipName,
        shipRegistry,
        shipClass,
        topSpeed,
        manufacturer
    });

    res.status(200).json(starship);
});

// @desc    Update starship
// @route   PUT /api/starships/
// @access  Private
const updateStarship = asyncHandler(async (req, res) => {

    const starship = await Starship.findById(req.params.id);

    if(!starship){
        res.status(400);
        throw new Error('Starship not found.');
    }

    const user = await User.findById(req.user.id);

    if(!user){
        res.status(401);
        throw new Error('User not found.');
    }

    if(starship.user.toString() !== user.id){
        res.status(401);
        throw new Error('User not authorized.');
    }

    const updatedStarship = await Starship.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedStarship);

});

// @desc    Delete starship
// @route   DELETE /api/starships/
// @access  Private
const deleteStarship = asyncHandler(async (req, res) => {

    const starship = await Starship.findById(req.params.id);

    if(!starship){
        res.status(400);
        throw new Error('Starship not found.');
    }

    const user = await User.findById(req.user.id);

    if(!user){
        res.status(400);
        throw new Error('User not found.');
    }

    if(starship.user.toString() !== user.id){
        res.status(401);
        throw new Error('User not authorized.');
    }

    await starship.remove();

    res.status(200).json({ id: req.params.id });

});

module.exports = {
    getStarships,
    setStarship,
    updateStarship,
    deleteStarship
};