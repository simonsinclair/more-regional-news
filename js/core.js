// core.js
//

"use strict";

(function(w, $, M, undefined) {

	var demo = {

		config: {
			all: {
				minItems: 4,
				maxItems: 6
			},
			feature: {
				numItems: 4
			},
			smart: {
				numItems: 5
			},
			tablet: {
				numItems: 5
			},
			desktop: {
				numItems: 5
			}
		},

		init: function() {
			demo.device   = $('#js-mrn').data('device');
			demo.$config  = $('#js-config');
			demo.numItems = 0;
			demo.itemData = {};
			demo.tpl      = '';

			demo.bindEvts();

			// Load the correct number of items in to the
			// module using device configuration values.
			demo.loadItems( demo.config[ demo.device ].numItems );
		},

		bindEvts: function() {
			$('.add', demo.$config).on('click', demo.addItem);
			$('.remove', demo.$config).on('click', demo.removeItem);

			$(w.document).on('keyup', function(e) {
				var key = {
					"-": 109,
					"DOWN": 40,
					"+": 107,
					"UP": 38
				};
				
				if(e.keyCode === key['-'] || e.keyCode === key['DOWN']) {
					demo.removeItem(e);
				} else if(e.keyCode === key['+'] || e.keyCode === key['UP']) {
					demo.addItem(e);
				}
			});
		},

		loadItems: function(numItems) {
			demo.numItems = numItems;

			$.when(

				$.get('carousel-items.json'),
				$.get('tpl/core-mrn.tpl')

			).then(function(itemData, tpl) {

				demo.itemData = itemData[0];
				demo.tpl      = tpl[0];

				demo.render();
			});
		},

		render: function() {
			var itemDataSliced = {
				carouselItems: demo.itemData.carouselItems.slice(0, demo.numItems)
			};

			var rendered = M.render(demo.tpl, itemDataSliced);
			$('#js-mrn').html(rendered);
		},

		addItem: function(e) {
			e.preventDefault();

			if(demo.numItems < demo.config.all.maxItems) {
				demo.numItems++;
				demo.render();
			}
			
		},

		removeItem: function(e) {
			e.preventDefault();

			if(demo.numItems > demo.config.all.minItems) {
				demo.numItems--;
				demo.render();
			}
			
		}

	};

	// Initialise
	$(function() {
		demo.init();
	});

})(this, jQuery, Mustache);
