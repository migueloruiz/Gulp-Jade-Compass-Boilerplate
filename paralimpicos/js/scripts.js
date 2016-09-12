var id;
var windowWidth = $(window).width();

//------------------------
// Rotar Tweets
//------------------------
function rotateTweets(dir){

	// Variables para saber si girar a izquierda o a derecha
	var direction = (dir == "right" || dir == undefined ? 1 : -1);
	var last = (dir == "right" || dir == undefined ? 9 : 0);
	var first = (dir == "right" || dir == undefined ? 0 : 9);

	// Saber qué elemento está activo y desactivarlo
	numActive = $("#tweetsContainer .active").index();
	$("#tweetsContainer ul li").eq(numActive).fadeOut(200).removeClass("active");

	setTimeout(function(){

		// Si el elemento es el último, regresar al primero para hacerlo circular
		if(numActive==last){
			$("#tweetsContainer ul li").eq(first).fadeIn(200).addClass("active");
		}
		// Si no es el último, activar el siguiente
		else{
			$("#tweetsContainer ul li").eq(numActive + direction).fadeIn(200).addClass("active");
		}
	},300);
}

//------------------------
// Cambiar Tweets
//------------------------
function changeTweets(time){

	$("#tweetsContainer ul li:first").addClass("active");
	tweetsRotation = setInterval(rotateTweets,time);

}

//------------------------
// Controlar Tweets
//------------------------
function controlTweets(){

	$("#tweetNext").click(function(){
		clearInterval(tweetsRotation);
		rotateTweets("right");
	});

	$("#tweetPrev").click(function(){
		clearInterval(tweetsRotation);
		rotateTweets("left");
	});
}

//------------------------
// Refresh banners
//------------------------
function refreshBanners () {
	googletag.pubads().refresh();
	console.log("Se actualizaron los banners");
}

//------------------------
// Player Responsivo
//------------------------
function resizePlayer() {
	aspect = 16 / 9;

	anchoVine = $("#vineplayer").width();
	altoVine = anchoVine;
	$("#vineplayer iframe").height(altoVine);

	anchoYoutube = $("#youtubeplayer").width();
	altoYoutube = anchoYoutube / aspect;
	$("#youtubeplayer iframe").height(altoYoutube);


}

//===========================================
// Documento Listo
//===========================================

$(document).ready(function() {

	//------------------------
	// Abrir, cerrar menu
	//------------------------
	var open = false;

	$('#menu-mobile').click(function(event) {
		event.preventDefault();

		if (!open) {
			$('nav').css('left','0px');
			$('.top-bar').addClass('fixed');
			$('header').addClass('fixed');
			$('#menu-mobile i').removeClass('fa-menu fa-bars').addClass('fa-close');
			open = true
		} else {
			$('nav').css('left','-100%');
			$('.top-bar').removeClass('fixed');
			$('header').removeClass('fixed');
			$('#menu-mobile i').removeClass('fa-close').addClass('fa-menu fa-bars');
			open = false
		}

	});

	//------------------------
	// Mostrar Tweets
	//------------------------
	var config1 = {
		"id": "689937017375854592",
		"domId": "tweetsContainer",
		"maxTweets": 10,
		"showUser": true,
		"enableLinks": true,
		"showPermalinks": false,
		"lang": "es"
	};

	twitterFetcher.fetch(config1);

	//------------------------
	// Players responsivos
	//------------------------
	resizePlayer();

});

//===========================================
// Ventana Cargada
//===========================================

$(window).load(function(){

	//------------------------
	// Rotar y controlar Tweets
	//------------------------
	changeTweets(5000);
	controlTweets();

});

//===========================================
// Resize
//===========================================
$(window).resize(function(event) {

	if($(window).width() === windowWidth){ return; }
	else{
		resizePlayer();
		clearTimeout(id);
		id = setTimeout(refreshBanners, 500);
		windowWidth = $(window).width();
	}
});
