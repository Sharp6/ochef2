require('dotenv').config();

var chai = require("chai"), expect = chai.expect;
chai.use(require('chai-as-promised'));
chai.use(require('chai-shallow-deep-equal'));

var mongoose = require('mongoose');

var moment = require('moment-timezone');
var fs = require('fs');

function loadSolution(filename) {
	return JSON.parse(fs.readFileSync(filename).toString());
}

var DA = require('../../build/ingredienten/ingredient.da.server');
var ingredientDA = new DA();

describe("The ingredientDA", function() {
	var data = loadSolution("./data/test/ingredient/ingredient.test.data.json");

	beforeEach(function(done) {
		mongoose.connect(process.env.DB_HOST_TEST);
		ingredientDA.removeAll().then(function() { done(); });
	});

	afterEach(function(done) {
		ingredientDA.removeAll();
		mongoose.connection.close(done);
	});
	it("returns all ingredienten");

	describe("when saving a new ingredient", function() {
		var action = ingredientDA.save(data.ingredienten[0]);
		var check = action.then(function() {
			return ingredientDA.getAll();
		});
		var record = check.then(function(arr) { return arr[0]; } );

		it("has inserted a single record in the db", function() {
			return expect(check).to.eventually.have.length(1);
		});

		it("has inserted the correct data", function() {
			return expect(record).to.eventually.have.property('naam').which.equals('appel');
		});

	});

/*
	it("returns all ingredienten");
	it("returns the data for an ingredient name");
	it("updates an existing ingredient");

	it("returns the ingredient based on search criteria");
	*/

});