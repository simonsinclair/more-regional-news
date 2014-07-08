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
			this.numItems = 0;

			this.bindEvts();

			// Load the correct number of items in to the
			// module using device configuration values.
			this.loadItems( this.config[this.device].numItems );
		},

		bindEvts: function() {
			$('.add', this.$config).on('click', $.proxy(this.addItem, this));
			$('.remove', this.$config).on('click', $.proxy(this.removeItem, this));
		},

		loadItems: function(numItems) {
			this.numItems = numItems;
			// ...
		},

		addItem: function(e) {
			e.preventDefault();
			// ...
		},

		removeItem: function(e) {
			e.preventDefault();
			// ...
		}

	};

	// Initialise
	$(function() {
		demo.init();
	});
})(this, jQuery, Mustache);
