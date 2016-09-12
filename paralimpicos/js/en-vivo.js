// -------------------------
// Arreglo de canales
// -------------------------
var canales = [
	"",
	"xnc3Y1djqJ4-gdRjp7rKPx3hE-VwUNJC", // Canal 1
	"xvc3Y1djrVH79KBa-6U5icceit-EPnGS", // Canal 2
	"4zdHY1djq-VZS2EgJ616JNtI6frZeaNf", // Canal 3
	"JzcXY1djqov_Jh8-xp0baOqIwsca_sNT" // Claro Sports
];

// Canal Default
//=====================================
var defaultChanel = 1;

// Obener Variables en Url
//=====================================
function getUrlHash() {
    var pageHash = window.location.hash;
    var hashID = pageHash.split('=');
	var chanel = defaultChanel;
	if (hashID.length > 1){
		// Contine Parametros
		chanel = (hashID[1].indexOf("?") != -1 ) ? hashID[1].split('?')[0] : hashID[1];
	    // Validar canal
	    chanel = (chanel > (canales.length - 1) || chanel <= 0) ? defaultChanel : chanel;
	}
	return chanel;
};

// Actualizar hash
//=====================================
function updateHash(path) {
	var currentURL = window.location.href;
	var afterHash = (currentURL.indexOf("?") != -1) ? currentURL.slice(currentURL.indexOf("?")) : '';
	window.location.hash = 'chanel='+ path + afterHash;
}

// -------------------------
// Cambiar Canal
// -------------------------
function changeChannel( newChanel ){
	player.destroy();
	player = OO.Player.create('ooyalaPlayer', canales[newChanel], playerParam);
	$(".channel-buttons > a").removeClass( "active" );
	$('#canal' + newChanel).addClass("active");
	updateHash( newChanel );
}

// -------------------------
// Cambiar Canal con botones
// -------------------------
$(".channel-buttons a").click(function( event ){
	event.preventDefault();
	changeChannel( this.id.substring(5) );
});

$("body").on("click", "#schedule-content .live", function(){
	changeChannel( $(this).attr("class").substring(6,7) );
	window.scrollTo(0,0);
});


// -------------------------
// Parámetros del player
// -------------------------
var playerParam = {
	'pcode':'52dXkxOtgWV6xLDZC4kFl_nciWmm',
	'playerBrandingId':'e9d470f30cc04eb28661e03ca932d677',
	'autoplay': false,
	'skin': {
		'config': '/paralimpicos/json/config-ooyala.json'
	}
	//onCreate : window.onCreate
};

// -------------------------
// Iniciar player
// -------------------------
OO.ready(function() {
	var initChanel = getUrlHash();
	updateHash( initChanel );
	$('#canal'+initChanel).addClass("active");
	player = OO.Player.create('ooyalaPlayer', canales[initChanel], playerParam);
});
