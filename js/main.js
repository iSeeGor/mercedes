
document.addEventListener('DOMContentLoaded', function(){
	mainMenu();
	mobileMenu();
	mainSLider();
	modelSort();
	modelSortMobile();
	cartegoryCarSort();
	cardSlider();
	cardOptionsToggle();
	stickyNav();

	popupInit();

	// if(window.innerWidth >= 768) {
	// 	stickyFrontElements();
	// }
	stickyFrontElements();
})

const mainMenu = () => {
	const body = document.body;
	const menuItem = document.querySelectorAll('.menu__item._has-submenu > a');
	const buttonsClose = document.querySelectorAll('.submenu .button');

	buttonsClose.forEach(item => {
		item.addEventListener('click',closeSubmenu);
	});

	
	menuItem.forEach(item => {
		item.addEventListener('click', showSubMenu, false);
	});

	function showSubMenu() {
		let submenu = this.parentNode.querySelector('.submenu');
		let visibleItens = this.parentNode.parentNode.querySelectorAll('._is-visible');
		
		visibleItens.forEach(item => {
			item.classList.remove('_is-visible');
		});
		submenu.classList.add('_is-visible');

		addBodyOverlay();

	}

	function closeSubmenu(){
		document.querySelectorAll('.submenu').forEach(item => item.classList.remove('_is-visible'));
		removeBodyOverlay();
	}

	function addBodyOverlay(){
		body.classList.add('overlay');
	}

	function removeBodyOverlay(){
		body.classList.remove('overlay');
	}

}

const mobileMenu = () => {
	let burger = $('.button-burger');
	let menu = $('.js-mobile-nav');
	let body = $('body');
	let hasSubmenu = $('._submenu');

	$(document).on('click', '.button-burger', function () { 


		$(this).toggleClass('_is-active');
		$('.m-submenu').removeClass('_is-visible');

		if(menu.hasClass('_is-visible')){
			menu.removeClass('_is-visible');
			body.removeClass('overflow');
			
		} else {
			menu.addClass('_is-visible');
			body.addClass('overflow');
		}

		checkScroll();
	})

	// show submenu
	$(document).on('click', '._submenu', function (e){
		e.stopPropagation();
		let _this = $(this);
		let submenu = _this.find(' > .m-submenu')
		let menu = submenu.find('.m-submenu__list')
		let container = submenu.find('.m-submenu__container');

		submenu.addClass('_is-visible');

		checkScroll(menu, container);
	});

	// hide submenu
	$(document).on('click', '.m-submenu__header', function(e){
		e.stopPropagation();
		let _this = $(this);
		let menu = _this.closest('._submenu').closest('.m-submenu__list');
		let container = _this.closest('._submenu').closest('.m-submenu__container');

		_this.closest('.m-submenu').removeClass('_is-visible');
		
		if(_this.closest('._submenu').hasClass('m-menu__item')){
			checkScroll();
		} else {
			checkScroll(menu, container);
		}
		
	});

	function checkScroll(menu = $('.m-menu'), container = $('.mobile-nav__container')){
		
		let containerH = container.outerHeight();
		let menuH = menu.outerHeight();

		$('.m-submenu__container').off('scroll');
		$('.mobile-nav__container').off('scroll');

		$(container).on('scroll', function(){
			let scrollTop = $(this).scrollTop();

			if(menuH > containerH + scrollTop){
				$('.mobile-nav__footer').addClass('_is-visible');
			} else {
				$('.mobile-nav__footer').removeClass('_is-visible');
				
			}
		}).scroll()

	};

}

const mainSLider = () => {
	let slider = new Swiper('.main-slider', {
		spaceBetween: 60,
		slidesPerView: 'auto',

		pagination: {
			el: '.main-slider__pagination',
			type: 'bullets',
			clickable: true,
		},
	})
}

const modelSort = () => {
	const buttons = document.querySelectorAll('.model-sort__button');

	buttons.forEach(button => {
		button.addEventListener('click', classToggle);
		
	});

	function classToggle(){
		buttons.forEach(button => button.classList.remove('_is-active'));
		this.classList.add('_is-active');
	}
}

const modelSortMobile = () => {
	$('.model-sort__dropdown').click(function(){
		$(this).toggleClass('_is-opened');

		if($('.model-sort__list').hasClass('_is-visible')){
			$('.model-sort__list').removeClass('_is-visible');
		} else {
			$('.model-sort__list').addClass('_is-visible');
		}
		
	});

	$('.model-sort__button').click(function(){

		$('.model-sort__list').removeClass('_is-visible');
		$('.model-sort__dropdown').removeClass('_is-opened').find('.button-text').text($(this).attr('data-model-sort-label'));

	});
}

const cartegoryCarSort = () => {
	const buttons = document.querySelectorAll('.category-sort__item .button');
	const butAll = document.querySelectorAll('.category-sort .button-primary');

	buttons.forEach(button => {
		button.addEventListener('click', classToggle);
		
	});

	butAll.forEach(button => {
		button.addEventListener('click', function(){
			buttons.forEach(button => button.classList.remove('_is-active'));
		})
	})

	function classToggle(){
		buttons.forEach(button => button.classList.remove('_is-active'));
		this.classList.add('_is-active');
	}
}

const cardSlider = () => {

	let slider = new Swiper('.card-slider', {
		// loop: true,
		spaceBetween: 20,
		// slidesPerView: 1,
		initialSlide: 1,
		centeredSlides: true,
		centeredSlidesBounds: true,
		effect: 'fade',
		autoplay: {
			autoplay: false,
			delay: 1300,
		},
		

		pagination: {
			el: '.card-slider__nav',
			type: 'bullets',
			clickable: true,
			bulletActiveClass: '_is-active',
			bulletClass: 'card-slider__bullet'
		},

	});


	slider.forEach((slide, index) => {
		let card = document.querySelectorAll('.card');

		slide.autoplay.stop();

		card[index].addEventListener('mouseenter', function() {
			slide.autoplay.start();

		});

		card[index].addEventListener('mouseleave', function() {
			slide.autoplay.stop();
			slide.slideTo(1);
		})

	})

}

const cardOptionsToggle = () => {

	$('.card__show-options').click(function (e) { 
		e.preventDefault();

		$(this).toggleClass('_is-active');

		if($(this).parent().find('.card-options').hasClass('_is-visible')){
			$(this).parent().find('.card-options').removeClass('_is-visible');
		} else {
			$(this).parent().find('.card-options').addClass('_is-visible');
		}
		
		
	});
}

const popupInit = () => {

	$('.js-popup').magnificPopup({
		type: 'inline',
		preloader: false,
		modal: true,
		// closeOnContentClick: true,
		// closeBtnInside: false,
	});

	// Close Popup
	$(document).on('click', '.popup__close', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});
}

const stickyNav = () => {

	let buttons = $('.sticky-nav .button-primary');

	if(window.innerWidth <= 660){
		
		buttons.each(function(){
			let buttonText = $(this).find('.button-primary__text');
			
			buttonText.html($(this).attr('data-sticky-nav-mobile-text'));
		});
	}

}

const stickyFrontElements = () => {

	let elDist = $('.front-catalog').offset().top;
	let elHeight = $('.front-catalog').outerHeight();
	let cloned = false;

	$(window).scroll(function(){

		let scrollTop = $(window).scrollTop();

		scrollTop >= elDist ? cloneElements() : repairElements();


		function stickyOffsetBottom(){

			let sctickyElemHeight = null;			
			let elBottomDist = null;

			if(window.innerWidth >= 1200){
				sctickyElemHeight = $('.front-catalog-sticky__header').outerHeight() + $('.category-sort').outerHeight();
			} else {
				sctickyElemHeight = $('.front-catalog-sticky').outerHeight();
			}

			elBottomDist = (elDist + elHeight) - sctickyElemHeight;

			// Вычисляем оступ от низа макета
			let pageHeight = $( document ).height();
			let bottomOffset = pageHeight - (elDist + elHeight);
			let stickyOffsetBottom = bottomOffset + $('.category-sort').outerHeight() - $('.front-catalog-sticky .content__main').outerHeight();

			$(this).scrollTop() >= elBottomDist ? freezElements(stickyOffsetBottom) : unfreezElements();
		}

		stickyOffsetBottom();

	}).scroll();

	function cloneElements(){	
		
		if(cloned === false){
			$('.front-catalog-sticky').addClass('_is-visible');

			$('.front-catalog__title').prependTo($('.front-catalog-sticky .front-catalog__header .container'));
			$('.model-sort__content').prependTo($('.front-catalog-sticky .model-sort .container'));
			$('.category-sort').prependTo($('.front-catalog-sticky .content__aside'));
		
			cloned = true;
			
			stickyGroupTitle();
		}

	};


	function repairElements(){
		if(cloned){
			$('.front-catalog-sticky').removeClass('_is-visible');

			$('.front-catalog-sticky .front-catalog__title').prependTo($('.front-catalog:not(._sticky) .front-catalog__header .container'));
			$('.front-catalog-sticky .model-sort__content').prependTo($('.front-catalog:not(._sticky) .model-sort .container'))
			$('.front-catalog-sticky .category-sort').prependTo($('.front-catalog:not(._sticky) .content__aside'))
			
			cloned = false;
		}
	};

	function freezElements(stickyOffsetBottom){
		$('.front-catalog-sticky').css({
			// "top": elBottomDist - _this.scrollTop(),
			'position': 'absolute',
			"top": 'auto',
			"bottom": stickyOffsetBottom + "px",
		})
	}

	function unfreezElements(){

		$('.front-catalog-sticky').css({
			'position': 'fixed',
			"top": 0,
			"bottom": 'auto'
		})
	}

	
}

function stickyGroupTitle(){


	$(window).scroll(function(){

		let elDist = $('.front-catalog-sticky__group-title').offset().top;


		$('.cards-group__title').each(function(){
			let distance = $(this).offset().top;
			
			if(elDist >= $(this).offset().top){
				$('.front-catalog-sticky__group-title').html($(this).html());

			} else {
			}
		})


	}).scroll();
	
}

// const mainSlider = () => {
// 	let slider = new Swiper('.js-main-slider', {
// 		loop: true,
// 		spaceBetween: 20,

// 		pagination: {
// 			el: '.js-main-slider .swiper-pagination',
// 			type: 'bullets',
// 		},

// 		navigation: {
// 			nextEl: '.js-main-slider .swiper-button-next',
// 			prevEl: '.js-main-slider .swiper-button-prev',
// 		},
// 	})
// }

// const mainMenu = () => {

// 	$(".menu-button").hover(function() {
//         $("body").addClass("_is-hover-menu");
//     }, function() {
// 		$("body").removeClass("_is-hover-menu");
//     });

// 	$('.menu-button__button').click(function(e) {
//         $('.menu-button').toggleClass('_is-hidden');
//         e.stopPropagation();
//         $('.menu-button .menu').slideToggle("2000");
//     });
 
//      $(".menu-button .menu").on("click", function(e) {
//         e.stopPropagation();
// 	});


	
// 	let menuItem = $('.menu__item');
// 	let submenu = $('.submenu');
// 	menuItem.hover(function () {
// 		if($(this).hasClass('_dropdown')){
// 			$(this).find('.submenu').addClass('_visible')
// 		}
// 	}, function(){
// 		if($(this).hasClass('_dropdown')){
// 			$(this).find('.submenu').removeClass('_visible')
// 		}
// 	});
	
// 	submenu.each(function(){
// 		let _this = $(this);
// 		let colW = 240;
// 		let colL = _this.find('.submenu__col').length;

// 		_this.css({
// 			'width': (colW * colL) + 60 + 'px'
// 		})
// 	});

// }

// const brandsSlider = () => {
// 	let slider = new Swiper('.js-brands-slider', {
// 		loop: true,
// 		spaceBetween: 20,
// 		// slidesPerView: 'auto',
// 		slidesPerView: 6,

// 		pagination: {
// 			el: '.brands-slider .swiper-pagination',
// 			type: 'bullets',
// 		},

// 		navigation: {
// 			nextEl: '.brands-slider .swiper-button-next',
// 			prevEl: '.brands-slider .swiper-button-prev',
// 		},
// 	})
// }

// const sectionCollapse = () => {
// 	let section = $('.js-section-collapse');

// 	section.each(function(){
// 		let section = $(this)
// 		let container = $(this).find('.section-items__content');
// 		let button = $(this).find('.section-items__toggle');
		
// 		container.css({
// 			'max-height': '640px',
// 		});

// 		button.on('click', function(){
// 			if(section.hasClass('_hidden')) {
// 				section.removeClass('_hidden');
// 				container.css({
// 					'max-height': '1900px',
// 					'overflow': 'hidden'
// 				});
	
	
// 				setTimeout(() => {
// 					container.css({
// 						'overflow': 'visible'
// 					});
// 				}, 200);
				
		
// 			} else {
// 				container.css({
// 					'max-height': '600px',
		
// 				});
	
// 				section.addClass('_hidden');
	
// 			}
// 		});
// 	})
// }
