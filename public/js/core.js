// core.js
//

"use strict";

(function(w, $, M, undefined) {

	var demo = {

		config: {
			feature: {
				numItems: 4
			},
			smart: {
				numItems: 6
			},
			tablet: {
				numItems: 6
			},
			desktop: {
				numItems: 8
			}
		},

		init: function() {
			this.device   = $('#js-mrn').data('device');
			this.$config  = $('#js-config');

			this.bindEvts();
			this.loadItems();
		},

		bindEvts: function() {
			$('.add', this.$config).on('click', $.proxy(this.addItem, this));
			$('.remove', this.$config).on('click', $.proxy(this.removeItem, this));
		},

		loadItems: function() {

		},

		addItem: function(e) {
			e.preventDefault();
			// ...
			console.log(e);
		},

		removeItem: function(e) {
			e.preventDefault();
			// ...
			console.log(e);
		}

	};

	// Initialise
	$(function() {
		demo.init();
	});
})(this, jQuery, Mustache);
