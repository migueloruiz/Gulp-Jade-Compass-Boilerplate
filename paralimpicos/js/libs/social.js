
$(window).load(function() {

	//=======================================================================================
	//
	// Social Share
	//
	//=======================================================================================

	// UTMs
	var utmFb = encodeURIComponent('?utm_source=shared&utm_medium=boton-facebook&utm_campaign=social-clicks');
	var utmTwitter = encodeURIComponent('?utm_source=shared&utm_medium=boton-twitter&utm_campaign=social-clicks');
	var utmGooglePlus = encodeURIComponent('?utm_source=shared&utm_medium=boton-google-plus&utm_campaign=social-clicks');
	var utmWhatsApp = encodeURIComponent('?utm_source=shared&utm_medium=boton-whatsapp&utm_campaign=social-clicks');

	// Utils
	var docTitle = document.title;
	var docUrl = location.protocol + '//' + location.host + location.pathname;
	var utmSource = window.location.search;
	var docEncodedUrl = encodeURIComponent(docUrl);
	$('body').append('<div id="anchorShareButtons"> </div>');


	// Button construction @ CONTENT
	// ---------------------------------

	// - FB
	$('#socialShare').append('<a id="ga-facebook"><i class="ga-facebook fa fa-facebook"></i><span class="ga-facebook">Compartir</span></a>');
	$('#ga-facebook').attr({
		'href' : 'https://www.facebook.com/dialog/share?app_id=470170489788455&display=popup&href='+docEncodedUrl+utmFb+'&redirect_uri='+docEncodedUrl,
		'class' : 'btn-facebook ga-facebook'
	});

	// - TW
	$('#socialShare').append('<a id="ga-twitter"><i class="fa fa-twitter ga-twitter"></i><span class="ga-twitter">Tuitear</span></a>');
	$('#ga-twitter').attr({
		'href' : 'https://twitter.com/share?url='+docEncodedUrl+utmTwitter+'&via=ClaroSports&hashtags=LoViEnClaroSports&text='+docTitle,
		'class' : 'btn-twitter ga-twitter'
	});

	// - PLUS
	$('#socialShare').append('<a id="ga-gaplus"><i class="ga-gaplus fa fa-google-plus"></i><span class="ga-gaplus">Compartir</span>');
	$('#ga-gaplus').attr({
		'href': 'https://plus.google.com/share?url='+docEncodedUrl+utmGooglePlus,
		'onclick': "javascript:window.open(this.href,'','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;",
		'class' : 'btn-plus ga-gaplus'
	});

	// - WHATS
	$('#socialShare').append('<a id="ga-whatsapp"><i class="ga-whatsapp fa fa-whatsapp"></i><span class="ga-whatsapp">Enviar</span></a>');
	$('#ga-whatsapp').attr({
		'href' : 'whatsapp://send?text=Checa esta noticia: '+docTitle+' '+docEncodedUrl+utmWhatsApp,
		'class' : 'btn-whatsapp ga-whatsapp',
		'data-action' : "share/whatsapp/share"
	});


	// Button construction @ ANCHOR
	// ---------------------------------

	// - FB
	$('#anchorShareButtons').append('<a id="ga-facebook-anchor"><i class="ga-facebook-anchor fa fa-facebook"></i></a>');
	$('#ga-facebook-anchor').attr({
		'href' : 'https://www.facebook.com/dialog/share?app_id=470170489788455&display=popup&href='+docEncodedUrl+utmFb+'&redirect_uri='+docEncodedUrl,
		'class' : 'btn-facebook ga-facebook-anchor'
	});

	// - TW
	$('#anchorShareButtons').append('<a id="ga-twitter-anchor"><i class="ga-twitter-anchor fa fa-twitter"></i></a>');
	$('#ga-twitter-anchor').attr({
		'href' : 'https://twitter.com/share?url='+docEncodedUrl+utmTwitter+'&via=ClaroSports&hashtags=LoViEnClaroSports&text='+docTitle,
		'class' : 'btn-twitter ga-twitter-anchor'
	});

	// - WHATS
	$('#anchorShareButtons').append('<a id="ga-whatsapp-anchor"><i class="ga-whatsapp-anchor fa fa-whatsapp"></i></a>');
	$('#ga-whatsapp-anchor').attr({
		'href' : 'whatsapp://send?text=Checa esta noticia: '+docTitle+' '+docEncodedUrl+utmWhatsApp,
		'class' : 'btn-whatsapp ga-whatsapp-anchor',
		'data-action' : "share/whatsapp/share"
	});


});
