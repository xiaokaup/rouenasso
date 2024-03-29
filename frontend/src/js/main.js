module.exports = {
  initBigHeader: initBigHeader,
  initSmallHeader: initSmallHeader
};

var owlPricing;
var ratio = 2;

function initBigHeader() {
  // console.log("big init");
    // Preloader
    $('.intro-tables, .parallax, header').css('opacity', '0');
    $('.preloader').addClass('animated fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $('.preloader').hide();
        $('.parallax, header').addClass('animated fadeIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $('.intro-tables').addClass('animated fadeInUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
        });
    });

    // Header Init
    if ($(window).height() > $(window).width()) {
        var ratio = $('.parallax').width() / $('.parallax').height();
        $('.parallax img').css('height', ($(window).height()) + 'px');
        $('.parallax img').css('width', $('.parallax').height() * ratio + 'px');
    }

    $('header').height($(window).height() - 10);
    $('section .cut').each(function () {
        if ($(this).hasClass('cut-top'))
            $(this).css('border-right-width', $(this).parent().width() + "px");
        else if ($(this).hasClass('cut-bottom'))
            $(this).css('border-left-width', $(this).parent().width() + "px");
    });

    // Navbar Init
    $('nav').addClass('original').clone().insertAfter('nav').addClass('navbar-fixed-top').css('position', 'fixed').css('top', '0').css('margin-top', '0').removeClass('original');
    $('.navbar-fixed-top').find('a').css('color', '#636363');
    $('.navbar-fixed-top .navbar-brand').append('<img class="nav-logo" ng-src="../../images/logo-text-white.png" data-active-url="../../images/logo-text-blue.png" alt="ACECR logo">');
    $('.mobile-nav ul').html($('nav .navbar-nav').html());
    $('nav.navbar-fixed-top .navbar-brand img').attr('src', $('nav.navbar-fixed-top .navbar-brand img').data("active-url"));

    // Typing Intro Init
    $(".typed").typewriter({
        speed: 120
    });
};

function initSmallHeader() {
  // console.log("small init");
    // Preloader
    $('.intro-tables, .parallax, header').css('opacity', '0');
    $('.preloader').addClass('animated fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $('.preloader').hide();
        $('.parallax, header').addClass('animated fadeIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $('.intro-tables').addClass('animated fadeInUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
        });
    });

    // Navbar Init
    $('nav').addClass('original').clone().insertAfter('nav').addClass('navbar-fixed-top').css('position', 'fixed').css('top', '0').css('margin-top', '0').removeClass('original');
    $('.navbar-fixed-top').find('a').css('color', '#636363');
    $('.mobile-nav ul').html($('nav .navbar-nav').html());
    $('nav.navbar-fixed-top .navbar-brand img').attr('src', $('nav.navbar-fixed-top .navbar-brand img').data("active-url"));

    $('#placeHolder').height(120).css('background-color', '#000147');

	// smooth anchor scroll
	$('html, body').on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - 67
		}, 500);
	});
};

$(window).load(function () {
    // Sliders Init
    $('.owl-schedule').owlCarousel({
        singleItem: true,
        pagination: true
    });
    $('.owl-testimonials').owlCarousel({
        singleItem: true,
        pagination: true
    });
    $('.owl-twitter').owlCarousel({
        singleItem: true,
        pagination: true
    });

    // Popup Form Init
    var i = 0;
    var interval = 0.15;
    $('.popup-form .dropdown-menu li').each(function () {
        $(this).css('animation-delay', i + "s");
        i += interval;
    });
    $('.popup-form .dropdown-menu li a').click(function (event) {
        event.preventDefault();
        $(this).parent().parent().prev('button').html($(this).html());
    });

    // Onepage Nav
    /*$('.navbar.navbar-fixed-top .navbar-nav').onePageNav({
        currentClass: 'active',
        changeHash: false,
        scrollSpeed: 400,
        filter: ':not(.btn)'
    });*/
});

// Window Scroll
function onScroll() {
    if ($(window).scrollTop() > 50) {
        $('nav.original').css('opacity', '0');
        $('nav.navbar-fixed-top').css('opacity', '1');
    } else {
        $('nav.original').css('opacity', '1');
        $('nav.navbar-fixed-top').css('opacity', '0');
    }
}

window.addEventListener('scroll', onScroll, false);

// Window Resize
$(window).resize(function () {
    $('header').height($(window).height());
});

// Pricing Box Click Event
$('.pricing .box-main').click(function () {
    $('.pricing .box-main').removeClass('active');
    $('.pricing .box-second').removeClass('active');
    $(this).addClass('active');
    $(this).next($('.box-second')).addClass('active');
    $('#pricing').css("background-image", "url(" + $(this).data('img') + ")");
    $('#pricing').css("background-size", "cover");
});

// Mobile Nav
$('body').on('click', 'nav .navbar-toggle', function () {
    event.stopPropagation();
    $('.mobile-nav').addClass('active');
});

$('body').on('click', '.mobile-nav a', function (event) {
    $('.mobile-nav').removeClass('active');
    if (!this.hash) return;
    event.preventDefault();
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        event.stopPropagation();
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
});
/*
 $(window).scroll(function(){
    if ($(window).scrollTop() >= 210)
    {
        $(".nav1").css({position:'fixed',top:'0'});
    }
    else
    {
        $(".nav1").css({position:'absolute',top:'0'});
    }
});
*/
