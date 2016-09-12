//===========================================
// Vars
//===========================================
var itemBanner1 = '<div id="div-mb01"><script>googletag.cmd.push(function() { googletag.display("div-mb01"); });</script></div>';
var itemBanner2 = '<div id="div-mb02"><script>googletag.cmd.push(function() { googletag.display("div-mb02"); });</script></div>';
var itemBanner3 = '<div id="div-mb03"><script>googletag.cmd.push(function() { googletag.display("div-mb03"); });</script></div>';


//===========================================
// Render artículos
//===========================================
function buildArticle( url, title, image, type, live ){
	
	if(live != undefined && live != '') {
		var htmlArticle = '<a class="live" href="'+ live +'">';
	} else {
		var htmlArticle = '<a href="'+ url +'">';
	}

	htmlArticle += '<img src="'+ image +'">';
	htmlArticle += '<div class="info">';
	htmlArticle += '<h2>'+ title +'</h2>';
	htmlArticle += type == 'video' ? '<i class="fa fa-play"></i>' : '';
	htmlArticle += '</div>';
	htmlArticle += '</a>';

	$('#home-content').append( htmlArticle );
}

//===========================================
// Obtener json
//===========================================
function getJsonHome( url ){
	$.getJSON( url, function( data ){

		var articles = data.items;

		$.each( articles, function(){

			var url = this.url;
			var title = this.titulo;
			var image = this.url_imagen;
			var type = this.tipo;
			var live = this.url_externa;

			buildArticle( url, title, image, type, live );

		});

		// Intercalar banners
		$( itemBanner1 ).insertAfter( $( "#home-content >a:nth-of-type(1)" ) );
		$( itemBanner2 ).insertAfter( $( "#home-content >a:nth-of-type(4)" ) );
		$( itemBanner3 ).insertAfter( $( "#home-content >a:nth-of-type(5)" ) );
		googletag.pubads().refresh();



	});
}

//===========================================
// Llamada principal
//===========================================
$(document).ready(function(){

	var urlJsonHome = "/paralimpicos/json/home.json";
	getJsonHome( urlJsonHome );

});