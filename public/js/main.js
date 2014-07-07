// main.js
//

"use strict";

(function(w, $, M, undefined) {

	var carousel = {
		config: {
			compact: {
				scrollBy: 1
			},
			tablet: {
				scrollBy: 3
			}
		},

		init: function(carouselElem) {
			carousel.$elem       = $(carouselElem);
			carousel.device      = $(carouselElem).data('device');
			carousel.isLoaded    = false;
			carousel.carriagePos = 0;

			carousel.numItems      = 0;
			carousel.itemWidth     = 0;
			carousel.carriageWidth = 0;

			carousel.bindEvts();
			carousel.deactivateCtrl('#js-carousel__left');
			carousel.loadItems();
		},

		bindEvts: function() {
			$('#js-carousel__left', carousel.$elem).on('click', carousel.pageLeft);
			$('#js-carousel__right', carousel.$elem).on('click', carousel.pageRight);
			$.subscribe('itemsLoaded', carousel.onItemsLoaded);		
		},

		pageLeft: function(e) {
			e.preventDefault();

			// Don't do anything if the carousel hasn't loaded
			// or if the button has a 'deactivated' class.
			if(!carousel.isLoaded || $(this).hasClass('deactivated')) {
				return;
			}

			// Calculate new carriage x position and ADD
			// it to the current translate3d x-value,
			// then update the carriagePos tracking var.
			var newCarriageXPos = carousel.carriagePos + (carousel.itemWidth * carousel.config[carousel.device].scrollBy);

			// Check to see whether the button states needs to change.
			carousel.updateCtrl(newCarriageXPos);

			$('#js-carousel__carriage', carousel.$elem).css('-webkit-transform', 'translate3d(' + newCarriageXPos + 'px, 0, 0)');
			carousel.carriagePos = newCarriageXPos;
		},

		pageRight: function(e) {
			e.preventDefault();

			// Don't do anything if the carousel hasn't loaded
			// or if the button has a 'deactivated' class.
			if(!carousel.isLoaded || $(this).hasClass('deactivated')) {
				return;
			}

			// Calculate new carriage x position and SUBTRACT
			// it from the current translate3d x-value,
			// then update the carriagePos tracking var.
			var newCarriageXPos = carousel.carriagePos - (carousel.itemWidth * carousel.config[carousel.device].scrollBy);

			// Check to see whether the button states needs to change.
			carousel.updateCtrl(newCarriageXPos);

			$('#js-carousel__carriage', carousel.$elem).css('-webkit-transform', 'translate3d(' + newCarriageXPos + 'px, 0, 0)');
			carousel.carriagePos = newCarriageXPos;
		},

		deactivateCtrl: function(ctrlElem) {
			$(ctrlElem).addClass('deactivated');
		},

		activateCtrl: function(ctrlElem) {
			$(ctrlElem).removeClass('deactivated');
		},

		updateCtrl: function(newCarriageXPos) {
			var itemsInViewWidth = carousel.config[carousel.device].scrollBy * carousel.itemWidth;
			var xPosRight        = Math.abs(newCarriageXPos) + itemsInViewWidth;

			var isAtStart = xPosRight <= itemsInViewWidth;
			var isAtEnd   = xPosRight >= carousel.carriageWidth;

			// By default, assume we're in the middle
			carousel.activateCtrl('#js-carousel__left');
			carousel.activateCtrl('#js-carousel__right');

			// Else, check whether we're at the beginning
			// or the end, and set ctrl state accordingly.
			if(isAtStart) {
				carousel.deactivateCtrl('#js-carousel__left');
				carousel.activateCtrl('#js-carousel__right');
			}

			if(isAtEnd) {
				carousel.deactivateCtrl('#js-carousel__right');
				carousel.activateCtrl('#js-carousel__left');
			}
		},

		loadItems: function() {
			$.when(
				$.get('carousel-items.json'),
				$.get('tpl/carousel-items.tpl')
			).then(function(data, tpl) {

				// When both $.get's are successful,
				// render carousel items template
				// and insert it in to the DOM.
				var rendered = M.render(tpl[0], data[0]);
				$('#js-carousel__carriage', carousel.$elem).html(rendered);

				// Set number of loaded carousel items
				// and publish the loaded event.
				carousel.numItems = data[0].carouselItems.length;
				$.publish('itemsLoaded');
			});
		},

		onItemsLoaded: function() {
			carousel.isLoaded = true;
			carousel.calculateWidths();
		},

		calculateWidths: function() {
			carousel.itemWidth     = $('#js-carousel__carriage li:first-child', carousel.$elem).outerWidth();
			carousel.carriageWidth = carousel.itemWidth * carousel.numItems;
		}
	};

	// Initialise
	$(function() {
		carousel.init('#js-carousel');
	});
})(this, jQuery, Mustache);
