//===========================================
//
// VARIABLES GLOBALES
//
//===========================================

var date = moment();
var minDate = "20160826";
var maxDate = date.format("YYYYMMDD");
var changeLeft = false;
var changeRight = false;

//===========================================
//
// FUNCIONES
//
//===========================================

//------------------------
// Render Video
//------------------------
function buildVideos( url, title, image, type ){
	
	var htmlVideos = '<a href="'+ url +'">';
	htmlVideos += '<div class="thumb"><img src="'+ image +'">';
	htmlVideos += type == 'video' ? '<i class="fa fa-play"></i></div>' : '</div>';
	htmlVideos += '<div class="info">';
	htmlVideos += '<h2>'+ title +'</h2>';
	htmlVideos += '</div>';
	htmlVideos += '</a>';

	$('#more-videos-content').append( htmlVideos );
}

//------------------------
// Obtener json
//------------------------
function getJsonVideos( date ){

	var url = "/paralimpicos/json/videos."+ date.format("YYYYMMDD") +".json";

	$.getJSON( url, function( data ){

		var articles = data.items;

		// Si encuentra datos, renderearlos
		//-----------------------------------
		if( articles.length ){
			for( i=0; i<4; i++ ){

				var url = articles[i].url;
				var title = articles[i].titulo;
				var image = articles[i].url_imagen;
				var type = articles[i].tipo;

				buildVideos( url, title, image, type );
			}

		// Si no tiene datos, cargar el día anterior.
		//-----------------------------------
		}else{
			date = date.subtract( 1, 'day');
			maxDate = date.format("YYYYMMDD");
			getJsonVideos( date );
		}

	// Si no existe el json, cargar el día anterior.
	//-----------------------------------
	}).fail(function(){

		date = date.subtract( 1, 'day');
		maxDate = date.format("YYYYMMDD");
		getJsonVideos( date );
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
	getJsonVideos( date );

});