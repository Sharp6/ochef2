var IngredientController = function(Ingredient, ingredientDA) {
	// Middleware
	var fetchIngredient = function(req,res,next) {
		ingredientDA.get(req.params.id)
			.then(function(ingredientData) {
				var ingredient = new Ingredient(ingredientData);
				return ingredient;
			})
			.then(function(ingredient) {
				req.ingredient = ingredient;
				return;
			})
			.then(next);
	};

	var fetchIngredienten = function(req,res,next) {
		ingredientDA
	}

	// API
	var get = function(req,res) {
		res.json(req.ingredient);
	};

	var getMultiple = function(req,res) {

	}

	// Renderers

	return {
		fetchIngredient: fetchIngredient,
		get: get,
		getAll: getAll
	};
};

module.exports = IngredientController;