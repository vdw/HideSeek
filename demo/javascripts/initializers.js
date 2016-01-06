// Run javascript after DOM is initialized
$(document).ready(function() {

	$('#search').hideseek();

	$('#search-highlight').hideseek({
		highlight: true
	});

  $('#search-nodata').hideseek({
    nodata: 'No results found'
  });

  $('#search-navigation').hideseek({
    nodata: 'No results found',
    navigation: true
  });

  $('#search-ignore').hideseek({
    highlight: true,
    ignore: '.ignore'
  });

  $('#search-ignore-accents').hideseek({
    highlight: true,
    ignore_accents: true
  });

  $('#search-headers').hideseek({
    highlight: true,
    headers: '.origin'
  });

  $('#search-hidden-mode').hideseek({
    hidden_mode: true
  });

  $('#search-custom-event').hideseek();
  $('#search-custom-event').on("_after", function() {
    alert('This alert comes after the search!')
  });

  $('#search-custom-event-2').hideseek();
  $('#search-custom-event-2').on("_after", function() {
    alert('This alert comes after the procession of each element!')
  });

});