define(function (require) {
	var size = [600, 800];
	var layers = [];

	for (i = 0; i < 5; i++) {
		layers.push(require('./layer'));
	}
});
