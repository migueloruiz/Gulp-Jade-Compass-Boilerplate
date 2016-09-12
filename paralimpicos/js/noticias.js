//===========================================
//
// VARIABLES GLOBALES
//
//===========================================

//------------------------
// Fix para desplegar meses en Español
//------------------------
moment.updateLocale('es', {
	months : [
		"enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
		"agosto", "septiembre", "octubre", "noviembre", "diciembre"
	]
});

var date = moment();
var minDate = "20160905";
var maxDate = date.format("YYYYMMDD");
var changeLeft = false;
var changeRight = false;

var itemBanner1 = '<div id="div-mb01"><script>googletag.cmd.push(function() { googletag.display("div-mb01"); });</script></div>';
var itemBanner2 = '<div id="div-mb02"><script>googletag.cmd.push(function() { googletag.display("div-mb02"); });</script></div>';
var itemBanner3 = '<div id="div-mb03"><script>googletag.cmd.push(function() { googletag.display("div-mb03"); });</script></div>';


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
	htmlNews += '<img src="'+ image +'">';
	htmlNews += '<div class="info">';
	htmlNews += '<h2>'+ title +'</h2>';
	htmlNews += type == 'video' ? '<i class="fa fa-play"></i>' : '';
	htmlNews += '</div>';
	htmlNews += '</a>';

	$('#news-list').append( htmlNews );
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
			$.each( articles, function(){

				var url = this.url;
				var title = this.titulo;
				var image = this.url_imagen;
				var type = this.tipo;

				buildNews( url, title, image, type );
			});

			// Intercalar banners
			$( itemBanner1 ).insertAfter( $( "#news-list >a:nth-of-type(1)" ) );
			$( itemBanner2 ).insertAfter( $( "#news-list >a:nth-of-type(4)" ) );
			$( itemBanner3 ).insertAfter( $( "#news-list >a:nth-of-type(5)" ) );
			googletag.pubads().refresh();



		// Si no tiene datos, cargar el día anterior.
		//-----------------------------------
		}else{
			date = date.subtract( 1, 'day');
			maxDate = date.format("YYYYMMDD");
			getNews( date );
		}

	// Si no existe el json, cargar el día anterior.
	//-----------------------------------
	}).fail(function(){

		date = date.subtract( 1, 'day');
		maxDate = date.format("YYYYMMDD");
		getNews( date );
	});
}

//------------------------
// Checar Flechas
//------------------------
function checkArrows( date ){
	
	if( date.format("YYYYMMDD") == minDate ){
		changeLeft = false;
		$('#prev').removeClass('active');
	}else{
		changeLeft = true;
		$('#prev').addClass('active');
	}
	if( date.format("YYYYMMDD") == maxDate ){
		changeRight = false;
		$('#next').removeClass('active');
	}else{
		changeRight = true;
		$('#next').addClass('active');
	}
}

//------------------------
// Cargar noticias del día
//------------------------
function getNews( date ){

	getJsonNews( date );
	checkArrows( date );
	$("#news-list >a").remove();
	$("#news-list >div").remove();
	$("#date").text( date.format("DD MMMM") );

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
	getNews( date );

	//------------------------
	// Cargar día anterior
	//------------------------
	$("#prev").click(function( event ){
		
		event.preventDefault();
 
		if( changeLeft ){
			date = date.subtract( 1, 'day');
			getNews( date );
		}
	});

	//------------------------
	// Cargar día siguiente
	//------------------------
	$("#next").click(function( event ){
		
		event.preventDefault();

		if( changeRight ){
			date = date.add( 1, 'day');
			getNews( date );
		}
	});

});