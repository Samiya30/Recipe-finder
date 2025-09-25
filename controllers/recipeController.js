const recipes = []; 
exports.getAllRecipes = (req, res) => {
    res.json(recipes);
};

exports.addRecipe = (req, res) => {
    const { title, ingredients, instructions } = req.body;
    const recipe = { id: recipes.length + 1, title, ingredients, instructions, author: req.user.username };
    recipes.push(recipe);
    res.json({ message: 'Recipe added', recipe });
};

exports.searchRecipes = (req, res) => {
    const { query } = req.query;
    const results = recipes.filter(r => r.title.toLowerCase().includes(query.toLowerCase()));
    res.json(results);
};
