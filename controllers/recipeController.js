const Recipe = require('../models/Recipe');

// Get all recipes of the logged-in user
exports.getRecipes = async (req, res) => {
    const recipes = await Recipe.find({ userId: req.user.id });
    res.json(recipes);
};

// Add recipe
exports.addRecipe = async (req, res) => {
    const { name, ingredients, instructions, image } = req.body;
    if (!name || !ingredients || !instructions) return res.status(400).json({ message: 'All fields required' });

    const recipe = new Recipe({ userId: req.user.id, name, ingredients, instructions, image });
    await recipe.save();
    res.json({ message: 'Recipe added', recipe });
};

// Update recipe
exports.updateRecipe = async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findOneAndUpdate(
        { _id: id, userId: req.user.id },
        req.body,
        { new: true }
    );
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json({ message: 'Recipe updated', recipe });
};

// Delete recipe
exports.deleteRecipe = async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json({ message: 'Recipe deleted' });
};
