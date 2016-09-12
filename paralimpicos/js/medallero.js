//===========================================
//
// FUNCIONES
//
//===========================================

function buildMedallero( rank, country, countryTitle, oro, plata, bronce, total ){
	var htmlMedallero = '<tr>';
	htmlMedallero += '<td><span>'+ rank +'</span></td>';
	htmlMedallero += '<td><span class="flag '+ country.toLowerCase() +'"></span>';
	htmlMedallero += '<span class="short-name">'+ country +'</span>';
	htmlMedallero += '<span class="long-name">'+ countryTitle +'</span></td>';
	htmlMedallero += '<td><span>'+ oro +'</span></td>';
	htmlMedallero += '<td><span>'+ plata +'</span></td>';
	htmlMedallero += '<td><span>'+ bronce +'</span></td>';
	htmlMedallero += '<td><span>'+ total +'</span></td>';
	$('#medallero-content').append( htmlMedallero );
}

//===========================================
//
// LLAMADA PRINCIPAL
//
//===========================================

$(document).ready(function(){

	var url = "/paralimpicos/utils/json/medallero.json";

	$.getJSON( url, function( data ){

		var paises = data.paises;

		$.each( paises, function( index ){

			var rank = index + 1;
			console.log(index);
			var country = this.nombreCorto;
			var countryTitle = this.nombre;
			var oro = this.oro;
			var plata = this.plata;
			var bronce = this.bronce;
			var total = this.total;

			buildMedallero( rank, country, countryTitle, oro, plata, bronce, total );
		});

	});

});
