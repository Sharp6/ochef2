var ingredientRoutes = function() {
	var express = require('express');
	var ingredientRouter = express.Router();

	ingredientRouter.route('/api/ingredienten')
		.get(function(req,res) {
			res.send("Hello world");
		});

	return ingredientRouter;
};

module.exports = ingredientRoutes;