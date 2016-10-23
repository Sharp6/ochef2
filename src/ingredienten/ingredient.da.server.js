"use strict";
var mongoose = require('mongoose');

var IngredientDA = function() {
	// SCHEMA
	var ingredientSchema = new mongoose.Schema({
		naam: String,
		nota: String, 
		beschrijving: String,
		inDiepvries: Boolean,
		maandenInSeizoen: [Number],
		tags: [String]
	});

	var IngredientModel;
	try {
		IngredientModel = mongoose.model('Ingredient');
	} catch(error) {
		IngredientModel = mongoose.model('Ingredient', ingredientSchema);
	}

	// GENERIC DA
	var get = function(naam) {
		return new Promise(function(resolve,reject) {
			IngredientModel.findOne({naam: naam}, function(err, ingredientData) {
				if(err) {
					return reject(err);
				}
				return resolve(ingredientData);
			});
		});
	};

	var getAll = function() {
		return new Promise(function(resolve,reject) {
			IngredientModel.find({}, function(err,results) {
				if(err) {
					return reject(err);
				}
				return resolve(results);
			});
		});
	};

	var search = function(query) {
		
	};

	var save = function(ingredient) {
		return new Promise(function(resolve,reject) {
			IngredientModel.findOne({ naam: ingredient.naam }).exec(function(err,doc) {
				if(err) {
					return reject(err);
				}
				if(doc) {
					return resolve(doc);
				} else {
					var ingredientModel = new IngredientModel({});
					return resolve(ingredientModel);
				}
			});
		})
		.then(function(ingredientModel) {
			return new Promise(function(resolve,reject) {
				ingredientModel.naam = ingredient.naam;
				ingredientModel.nota = ingredient.nota;
				ingredientModel.beschrijving = ingredient.beschrijving;
				ingredientModel.inDiepvries = ingredient.inDiepvries;
				ingredientModel.maandenInSeizoen = ingredient.maandenInSeizoen;
				ingredientModel.tags = ingredient.tags;
				
				ingredientModel.save(function (err) {
					if (err) {
						reject(err);
					} else {
						resolve(ingredient);
					}
				});
			});
		});
	};

	var remove = function(ingredient) {
		return new Promise(function(resolve,reject) {
			IngredientModel.remove({ naam: ingredient.naam }, function(err,result) {
				if(err) {
					return reject(err);
				}
				return resolve(result);
			});
		});
	};

	var removeAll = function() {
		return new Promise(function(resolve,reject) {
			IngredientModel.remove({}, function(err,result) {
				if(err) {
					return reject(err);
				}
				return resolve(result);
			});
		});
	};

	// SPECIFIC SHIT 
	var getTags = function() {
		return new Promise(function(resolve,reject) {
			IngredientModel.distinct('tags', function(err,tags) {
				if(err) {
					return reject(err);
				}
				return resolve(tags);
			});
		});
	};

	// RETURN 
	return {
		get: get,
		getAll: getAll,
		save: save,
		remove: remove,
		removeAll: removeAll,
		getTags: getTags
	};
};

module.exports = IngredientDA;