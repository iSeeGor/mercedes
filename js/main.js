// $(function(){
	
// 	// mainMenu();
// 	// mainSlider();
// 	// brandsSlider();
// 	// sectionCollapse();
// })

document.addEventListener('DOMContentLoaded', function(){
	mainMenu();
	mainSLider();
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
