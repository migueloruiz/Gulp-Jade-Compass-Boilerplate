//===========================================
//
// VARIABLES GLOBALES
//
//===========================================

var date = moment();
var minDate = "20160906";
var maxDate = date.format("YYYYMMDD");
var changeLeft = false;
var changeRight = false;

//===========================================
//
// FUNCIONES
//
//===========================================

//------------------------
// Render Noticia
//------------------------
function buildNews( url, title, image, type ){

	var htmlNews = '<a href="'+ url +'">';
	htmlNews += '<div class="thumb"><img src="'+ image +'">';
	htmlNews += type == 'video' ? '<i class="fa fa-play"></i></div>' : '</div>';
	htmlNews += '<div class="info">';
	htmlNews += '<h2>'+ title +'</h2>';
	htmlNews += '</div>';
	htmlNews += '</a>';

	$('#more-news-content').append( htmlNews );
}

//------------------------
// Obtener json
//------------------------
function getJsonNews( date ){

	var url = "/paralimpicos/json/noticias."+ date.format("YYYYMMDD") +".json";

	$.getJSON( url, function( data ){

		var articles = data.items;

		// Si encuentra datos, renderearlos
		//-----------------------------------
		if( articles.length ){

			var i = 0;
			while (i < 4 && i < articles.length ) {
				var url = articles[i].url;
				var title = articles[i].titulo;
				var image = articles[i].url_imagen;
				var type = articles[i].tipo;

				buildNews( url, title, image, type );
				i++;
			}

		// Si no tiene datos, cargar el día anterior.
		//-----------------------------------
		}else{
			date = date.subtract( 1, 'day');
			maxDate = date.format("YYYYMMDD");
			getJsonNews( date );
		}

	// Si no existe el json, cargar el día anterior.
	//-----------------------------------
	}).fail(function(){

		date = date.subtract( 1, 'day');
		maxDate = date.format("YYYYMMDD");
		getJsonNews( date );
	});
}

//===========================================
//
// LLAMADA PRINCIPAL
//
//===========================================

$(document).ready(function(){

	//------------------------
	// Carga inicial
	//------------------------
	getJsonNews( date );

});
