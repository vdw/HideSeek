// Run javascript after DOM is initialized
$(document).ready(function() {

	$('#body').waypoint('sticky');

	$('#search').hideseek();

	$('#search-highlight').hideseek({
		highlight: true
	});

});