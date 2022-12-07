window.sr = ScrollReveal({reset: true})

ScrollReveal().reveal('.main-banner', {
	cleanup: true,
	afterReveal: function (el) {
		ScrollReveal().clean(el)
	},
})
ScrollReveal().reveal('.left-side', {
	delay: 500,
	cleanup: true,
	afterReveal: function (el) {
		ScrollReveal().clean(el)
	},
})
ScrollReveal().reveal('.right-side', {
	delay: 1000,
	interval: 60,
	afterReveal: function (el) {
		ScrollReveal().clean(el)
	},
})
ScrollReveal().reveal('.card-service', {
	duration: 1000,
	scale: 0.5,
	interval: 90,
	afterReveal: function (el) {
		ScrollReveal().clean(el)
	},
})
ScrollReveal().reveal('.vision', {
	origin: 'left',
	duration: 1000,
})
ScrollReveal().reveal('.products .card', {
	duration: 1000,
	interval: 50,
})

document.addEventListener('DOMContentLoaded', function () {
	const splide = new Splide('.splide', {
		type: 'loop',
		drag: 'free',
		focus: 'center',
		height: '5rem',
		perPage: 3,
		pauseOnHover: true,
		autoScroll: {
			speed: 1,
		},
	})
	splide.mount(window.splide.Extensions)
})
