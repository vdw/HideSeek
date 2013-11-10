// Run javascript after DOM is initialized
$(document).ready(function() {

	$('#body').waypoint('sticky');

	$('#search').hideseek();

	$('#search-highlight').hideseek({
		highlight: true
	});

  $('#search-nodata').hideseek({
    nodata: 'No results found'
  });

});