//
// Fecha de hoy
//----------------------------------------
var today = moment();
var hours = today.format("HH");

//
// Obtener DATESTAMP (AAAMMDD)
//----------------------------------------
var datestamp = today.format("YYYYMMDD");

//
// Obtener HOURSTAMP (HHMM)
//----------------------------------------
var hourstamp = today.format("HHmm");

//
// URL json de agenda
//----------------------------------------
var urlJson = '/paralimpicos/json/agenda.json';


//
// Arreglos
//----------------------------------------
var itemsLive = [];
var itemsNotLive = [];

//
// Intervalo de actualizacion
//----------------------------------------
var updateInterval = 300000; //5 min

//
// Función para añadir ceros a la izquierda, si hace falta
//----------------------------------------
function normalzeDuration( string ){
	var dif = 6 - string.length;
	var zeros = ["", "0", "00", "000", "0000", "00000", "000000"];
	return zeros[dif]+string;
}

//
// Obtenber Elementos disponibles en las siguientes 3 horas
//----------------------------------------
function getItemsAbilable( data ){
	return data.items.filter( function( item ){

		var nombre = item.evNombre;
		var hora = item.begintime.toString().substring(8,10);

		var hayTransmision = nombre !== "Sin transmisión" && nombre !== "Evento sin transmisión";
		var esHoy = item.begintime.toString().substring(0,8) == datestamp;
		//var proxTresHoras = parseInt(hora) >= hours && parseInt(hora) <= hours + 3;

		return hayTransmision && esHoy ;


	});
}

//
// Obtenber Elementos disponibles en las siguientes 3 horas
//----------------------------------------
function getLiveSchedule() {

	$.getJSON( urlJson, function( data ){

		$.each( getItemsAbilable( data ) , function(){

			var durationString = normalzeDuration( this.duration.toString() );
			var duration = moment.duration({
				hours: parseInt( durationString.substring( 0, 2 ) ),
				minutes: parseInt( durationString.substring( 2, 4 ) ),
				seconds: parseInt( durationString.substring( 4, 6 ) )
			});

			var start = this.begintime.toString();
			var startTime = moment( start.substring(0,8) + "T" + start.substring(8,14) );
			var evStarted = moment().isAfter( startTime );
			var endTime = moment( startTime ).add( duration );
			var evFinished = moment().isBefore( endTime );

			var isLive = evStarted && evFinished;

			if ( isLive ){
				var htmlAgenda = '<div class="canal-'+ this.channelId +' item-transmision live">';
				htmlAgenda += '<div class="time"><span>'+ this.begintime.toString().substring(8,10) + ':';
				htmlAgenda += this.begintime.toString().substring(10,12) + ' - ' + endTime.format('HH:mm') +'</span></div>';
				htmlAgenda += '<div class="title"><h2>'+ this.evNombre +'</h2>';
				htmlAgenda += this.evDescription !== "ND" ? '<h3>'+ this.evDescription +'</h3></div>' : '</div>';
				htmlAgenda += '<span>EN VIVO</span>';
				htmlAgenda += '<div class="button"><span>Canal '+ this.channelId +'</span></div>';
				htmlAgenda += '</div>';

				itemsLive.push( htmlAgenda );

			}else{
				var htmlAgenda = '<div class="canal-'+ this.channelId +' item-transmision">';
				htmlAgenda += '<div class="time"><span>'+ this.begintime.toString().substring(8,10) + ':';
				htmlAgenda += this.begintime.toString().substring(10,12) + ' - ' + endTime.format('HH:mm') +'</span></div>';
				htmlAgenda += '<div class="title"><h2>'+ this.evNombre +'</h2>';
				htmlAgenda += this.evDescription !== "ND" ? '<h3>'+ this.evDescription +'</h3></div>' : '</div>';
				htmlAgenda += '<div class="button"><span>Canal '+ this.channelId +'</span></div>';
				htmlAgenda += '</div>';

				itemsNotLive.push( htmlAgenda );
			}
		});

		// Añadir dos banners intercalados
		//----------------------------------------
		var totalVideos = itemsLive.concat( itemsNotLive );
		var itemBanner1 = '<div id="div-mb01"><script>googletag.cmd.push(function() { googletag.display("div-mb01"); });</script></div>';
		var itemBanner2 = '<div id="div-mb02"><script>googletag.cmd.push(function() { googletag.display("div-mb02"); });</script></div>';
		var itemBanner3 = '<div id="div-mb03"><script>googletag.cmd.push(function() { googletag.display("div-mb03"); });</script></div>';

		totalVideos.splice( 2, 0, itemBanner1 );
		totalVideos.splice( 4, 0, itemBanner2 );
		totalVideos.splice( 6, 0, itemBanner3 );


		$('#schedule-content').append( totalVideos.join('') );
	});
}


//=====================================
// Actualizar Schedule
//=====================================
function updateSchedule() {
	itemsLive = [];
	itemsNotLive = [];
    $('#schedule-content >div').remove();
	getLiveSchedule();
}

//
// Función principal
//----------------------------------------
$(document).ready(function(){
	updateSchedule()
	setInterval(updateSchedule, updateInterval);
})
