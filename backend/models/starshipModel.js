const mongoose = require('mongoose');


const starshipSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    shipName: {
        type: String, 
        required: [true, 'Please add ship Name value.']
    },
    shipRegistry: {
        type: String, 
        required: [true, 'Please add shipRegistry value.'],
        unique: true
    },
    shipClass: {
        type: String, 
        required: [true, 'Please add email value.']
    },
    topSpeed: {
        type: Number, 
        required: [true, 'Please add top speed value.'],
    },
    manufacturer: {
        type: String, 
        required: [true, 'Please add manufacturer value.']
    },
},{ timestamps: true });

module.exports = mongoose.model('Starship', starshipSchema);