// $(function(){
	
// 	// mainMenu();
// 	// mainSlider();
// 	// brandsSlider();
// 	// sectionCollapse();
// })

document.addEventListener('DOMContentLoaded', function(){
	mainMenu();
	mainSLider();
	modelSort();
	modelSortMobile();
	cartegoryCarSort();
	cardSlider();
	cardOptionsToggle();

	stickyFrontElements();

	popupInit();
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

const mainSLider = () => {
	let slider = new Swiper('.main-slider', {
		// loop: true,
		spaceBetween: 60,
		// slidesPerView: 'auto',
		slidesPerView: 'auto',

		pagination: {
			el: '.main-slider__pagination',
			type: 'bullets',
			clickable: true,
		},

		// navigation: {
		// 	nextEl: '.brands-slider .swiper-button-next',
		// 	prevEl: '.brands-slider .swiper-button-prev',
		// },
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

const stickyFrontElements = () => {

	let elDist = $('.front-catalog').offset().top;
	let elHeight = $('.front-catalog').outerHeight();
	let cloned = false;

	$(window).scroll(function(){

		$(this).scrollTop() >= elDist ? cloneElements() : repairElements();

		// Высота стики фильтра (662)
		let stickyHeight = $('.front-catalog-sticky__header').outerHeight() + $('.category-sort').outerHeight();	
		let elBottomDist = (elDist + elHeight) - stickyHeight;

		// Вычисляем оступ от низа макета
		let pageHeight = $( document ).height();
		let bottomOffset = pageHeight - (elDist + elHeight - $('.category-sort').outerHeight());

		$(this).scrollTop() >= elBottomDist ? freezElements(bottomOffset) : unfreezElements();
		
		// console.log(stickyHeight);
		

	}).scroll();

	function cloneElements(){	
		
		if(cloned === false){
			$('.front-catalog-sticky').addClass('_is-visible');

			$('.front-catalog__title').prependTo($('.front-catalog-sticky .front-catalog__header .container'));
			$('.model-sort__content').prependTo($('.front-catalog-sticky .model-sort .container'));
			$('.category-sort').prependTo($('.front-catalog-sticky .content__aside'));
		
			cloned = true;

			console.log('clone the elements');
			
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
			console.log('remove the elements');
		}
	};

	function freezElements(bottomOffset){
		$('.front-catalog-sticky').css({
			// "top": elBottomDist - _this.scrollTop(),
			'position': 'absolute',
			"top": 'auto',
			"bottom": bottomOffset + "px",
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

	// let elDist = $('.front-catalog-sticky__group-title').offset().top;
	// console.log(elDist);

	$(window).scroll(function(){

		// let top = $(this).scrollTop();

		// console.log('window scroll', top);

		let elDist = $('.front-catalog-sticky__group-title').offset().top;
		// console.log("sticky title", elDist);

		// let element = $('.cards-group__title')[1];
		// let first = $(element).offset().top;
		// console.log('first element', first);

		// if(elDist == first){
		// 	$('.front-catalog-sticky__group-title').html($(element).html());
		// 	console.log(true);
		// }

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
