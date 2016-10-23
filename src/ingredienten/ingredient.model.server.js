var Ingredient = function({
	naam = "",
	nota = "",
	beschrijving = "",
	inDiepvries = false,
	maandenInSeizoen = [],
	tags = []
}) {
	this.naam = naam;
	this.nota = nota;
	this.beschrijving = beschrijving;
	this.inDiepvries = inDiepvries;
	this.maandenInSeizoen = maandenInSeizoen;
	this.tags = tags;
};

module.exports = Ingredient;