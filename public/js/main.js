// main.js
//

"use strict";

(function(w, $, M, undefined) {

	// Carousel object
	var carousel = {
		config: {
			compact: {
				scrollBy: 1
			},
			tablet: {
				scrollBy: 3
			}
		},

		init: function(carouselId) {
			carousel.$self       = $(carouselId);
			carousel.isLoaded    = false;
			carousel.carriagePos = 0;

			carousel.numItems      = 0;
			carousel.itemWidth     = 0;
			carousel.carriageWidth = 0;

			carousel.bindEvts();
			carousel.load();
		},

		bindEvts: function() {
			$('#js-carousel__left', carousel.$self).on('click', carousel.pageLeft);
			$('#js-carousel__right', carousel.$self).on('click', carousel.pageRight);
			$.subscribe('loaded', carousel.onLoaded);		
		},

		pageLeft: function(e) {
			e.preventDefault();
			if(!carousel.isLoaded) {
				return;
			}

			// Calculate new carriage x position and ADD
			// it to the current translate3d x-value,
			// then update the carriagePos tracking var.
			var newXPos = carousel.carriagePos + carousel.itemWidth;
			$('#js-carousel__carriage', carousel.$self).css('-webkit-transform', 'translate3d(' + newXPos + 'px, 0, 0)');
			carousel.carriagePos = newXPos;
		},

		pageRight: function(e) {
			e.preventDefault();
			if(!carousel.isLoaded) {
				return;
			}

			// Calculate new carriage x position and SUBTRACT
			// it from the current translate3d x-value,
			// then update the carriagePos tracking var.
			var newXPos = carousel.carriagePos - carousel.itemWidth;
			$('#js-carousel__carriage', carousel.$self).css('-webkit-transform', 'translate3d(' + newXPos + 'px, 0, 0)');
			carousel.carriagePos = newXPos;
		},

		load: function() {
			$.when(
				$.get('carousel-items.json'),
				$.get('tpl/carousel-items.tpl')
			).then(function(data, tpl) {

				// When both $.get's are successful,
				// render carousel items template
				// and insert it in to the DOM.
				var rendered = M.render(tpl[0], data[0]);
				$('#js-carousel__carriage', carousel.$self).html(rendered);

				// Set number of loaded carousel items
				// and publish the loaded event.
				carousel.numItems = data[0].carouselItems.length;
				$.publish('loaded');
			});
		},

		onLoaded: function() {
			carousel.isLoaded = true;
			carousel.calculateWidths();
		},

		calculateWidths: function() {
			carousel.itemWidth  = $('#js-carousel__carriage li:first-child', carousel.$self).outerWidth();
			carousel.carriageWidth = carousel.itemWidth * carousel.numItems;
		}
	};

	// Init Carousel on DOM ready
	$(function() {
		carousel.init('#js-carousel');
	});

})(this, jQuery, Mustache);
