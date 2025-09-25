const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    image: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png' }
});

module.exports = mongoose.model('Recipe', recipeSchema);
