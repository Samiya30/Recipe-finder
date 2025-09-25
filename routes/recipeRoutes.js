const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');


router.get('/', async (req, res) => {
    const recipes = await Recipe.find();
    res.json(recipes);
});

router.post('/', async (req, res) => {
    const { name, ingredients, instructions, image } = req.body;
    if(!name || !ingredients || !instructions) return res.json({ msg: 'Please enter all fields' });

    const recipe = new Recipe({ name, ingredients, instructions, image });
    await recipe.save();
    res.json(recipe);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Recipe.findByIdAndDelete(id);
    res.json({ msg: 'Recipe deleted' });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, instructions, image } = req.body;
    const updated = await Recipe.findByIdAndUpdate(id, { name, ingredients, instructions, image }, { new: true });
    res.json(updated);
});

module.exports = router;