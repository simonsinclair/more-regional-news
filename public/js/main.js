// main.js
//

"use strict";

(function(w, $, M, undefined) {

	// Carousel object
	var carousel = {
		init: function(carouselId) {
			this.carousel      = $(carouselId);

			this.bindEvts();
			this.populate();
		},
		bindEvts: function() {

		},
		populate: function() {
			$.when(
				$.get('carousel-items.json'),
				$.get('tpl/carousel-items.tpl')
			).then(function(data, tpl) {
				var rendered = M.render(tpl[0], data[0]);
				$('#js-carousel__items', this.carousel).html(rendered);
			});
		}
	};

	// Init Carousel on DOM ready
	$(function() {
		carousel.init('#js-carousel');
	});

})(this, jQuery, Mustache);
