//------------------------
// Fix para desplegar meses en Español
//------------------------
moment.updateLocale('es', {
    months : [
        "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
        "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ]
});

//
// Fecha de hoy
//----------------------------------------
var today = moment();
var hours = today.format("HH");

//
// Obtener DATESTAMP (AAAMMDD)
//----------------------------------------
var datestamp = today.format("YYYYMMDD");
var day = today.format("DD");

var minDay = "07 septiembre";
var maxDay = "18 septiembre";
var dateText = today.format('DD MMMM')

var changeLeft = true;
var changeRight = false;

var urlJson = '/paralimpicos/json/agenda.json';

//
// Intervalo de actualizacion
//----------------------------------------
var updateInterval = 300000; //5 min

//=====================================
// Cambiar a string los numeros
//=====================================
function numToString(num){
    return num<10 ? "0"+num : num;
}

//
// Función para añadir ceros a la izquierda, si hace falta
//----------------------------------------
function normalzeDuration( string ){
	var dif = 6 - string.length;
	var zeros = ["", "0", "00", "000", "0000", "00000", "000000"];
	return zeros[dif]+string;
}

//=====================================
// Construir eventos
//=====================================
function buildEvents( uvi, title, description , status, start, end, chanel){
    if( title != undefined ){
        var htmlEvents = status ? '<div class="live-event" data-chanel="'+chanel+'">' : '<div>';
        htmlEvents += '<div class="times">'
        htmlEvents += '<span>'+ start.format('HH:mm');
        htmlEvents += ' - '+ end.format('HH:mm') +'</span>';
        htmlEvents += '</div>';
        htmlEvents += '<div class="titles"><h2>'+ title +'</h2>';
        if (description != "ND") {
            htmlEvents += '<h3>'+ description +'</h3>';
        }
        htmlEvents += '</div>';
        htmlEvents += '<div class="buttons">';
        if( status ){
            htmlEvents += '<a class="live" href="/paralimpicos/en-vivo/#chanel='+ encodeURIComponent( chanel ) + '">'
            htmlEvents += '<i class="fa fa-play"></i> En Vivo </a>';
        }
        htmlEvents += '</div></div>';
        $('#agenda-content').append( htmlEvents );
    }
}

//
// Obtenber Elementos disponibles em el dia
//----------------------------------------
function getItemsAbilableForDate( data , date ){
	return data.items.filter( function( item ){
		var esHoy = item.begintime.toString().substring(0,8) == date;
		return esHoy;
	});
}

//=====================================
// Obtener versiones del contenido
//=====================================
function getScheduleContent( date ){

    $.getJSON( urlJson, function( data ){

        var scheduleItems = getItemsAbilableForDate( data , date )

        // Ordena el arreglo por hoar de inicio
        //======================================
        scheduleItems.sort(function(a, b){
            if(a.begintime < b.begintime) return -1;
            if(a.begintime > b.begintime) return 1;
            return 0;
        });

        // Construye cada elemento de la agenda
        //======================================
        $.each( scheduleItems , function() {

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

            buildEvents( "id", this.evNombre, this.evDescription, isLive, startTime, endTime, this.channelId)

        });
	});
}

//=====================================
// Checar flecha activa
//=====================================
function checkDatesAvailable(){
    // Desabilitar: boton fecha anterior
    //----------------------------------
    if( dateText == minDay ){
        changeLeft = false;
        $('#prev').removeClass('active');
    }else{
        changeLeft = true;
        $('#prev').addClass('active');
    }

    // Desabilitar: boton fecha siguiente
    //----------------------------------
    if( dateText == maxDay ){
        changeRight = false;
        $('#next').removeClass('active');
    }else{
        changeRight = true;
        $('#next').addClass('active');
    }
}

//=====================================
// Actualizar Schedule
//=====================================
function updateSchedule() {
    getScheduleContent( datestamp );
    $('#agenda-content >div').remove();
    $('.change-day-bar #date').text( dateText );
    checkDatesAvailable();
}

//=====================================
// Función principal
//=====================================
$(document).ready(function(){

    $('.change-day-bar #date').text( dateText );

    // Carga inicial
    //----------------------------------
    updateSchedule();
    setInterval(updateSchedule, updateInterval);

    // Cargar Día anterior
    //----------------------------------
    $('.change-day-bar #prev').click(function(event) {
        event.preventDefault();

        if(changeLeft == true){
            day = numToString( parseInt( day ) - 1 );
            dateText = day + ' septiembre';
            datestamp = "201609" + day;
            updateSchedule()
        }
    });

    //
    // Cargar Día siguiente
    //----------------------------------
    $('.change-day-bar #next').click(function(event) {
        event.preventDefault();

        if(changeRight == true){
            day = numToString( parseInt( day ) + 1 );
            dateText = day + ' septiembre';
            datestamp = "201609" + day;
            updateSchedule()
        }

    });

    //
    // Abrir o cerrar acordeón
    //----------------------------------
    $("#agenda-content").click(function(event) {
        var newChanel = $("#agenda-content .live-event:hover").attr( 'data-chanel' )
        if (newChanel != undefined) {
            location.href = '/paralimpicos/en-vivo/#chanel='+ encodeURIComponent( newChanel )
        }
    });
});
