/**
 * HideSeek jQuery plugin
 *
 * @copyright Copyright 2013, Dimitris Krestos
 * @license   Apache License, Version 2.0 (http://www.opensource.org/licenses/apache2.0.php)
 * @link      http://vdw.staytuned.gr
 * @version   v0.1.0
 */

  /* Sample html structure

  <div class='selector'></div>

  */

;(function($, window, undefined) {
  "use strict";

  $.fn.hideseek = function(options) {

    var defaults = {
      datalist:   '.hideseek-list',
      dataattr:   'text',
      highlight:  false
    };

    var options = $.extend(defaults, options);

    $(this).each(function() {

      var $this = $(this);

      $this.keyup(function() {

        var q = $this.val().toLowerCase();

        $(options.datalist).children().each(function() {

          var data = (options.dataattr != 'text') ? $(this).attr(options.dataattr).toLowerCase() : $(this).text().toLowerCase();

          if (data.indexOf(q) == -1) {

            $(this).hide();

          } else {

            $(this).show();

          }

        });

      });

    });

  };

  $(document).ready(function () { $('[data-toggle="hideseek"]').hideseek(); });

})(jQuery);