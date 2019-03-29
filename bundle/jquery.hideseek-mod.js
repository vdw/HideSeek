/**
 * HideSeek-Mod jQuery plugin
 *
 * @copyright Copyright 2015, Dimitris Krestos
 * @license   Apache License, Version 2.0 (http://www.opensource.org/licenses/apache2.0.php)
 * @link      http://vdw.staytuned.gr
 * @version   v0.8.1
 *
 * Dependencies are include in minified versions at the bottom:
 * 1. Highlight v4 by Johann Burkard
 *
 * Sample html structure
 *
 *   <input name="search" placeholder="Start typing here" type="text" data-list=".list">
 *   <ul class="list">
 *     <li>item 1</li>
 *     <li>...</li>
 *     <li><a href="#">item 2</a></li>
 *   </ul>
 *
 *   or
 *
 *   <input name="search" placeholder="Start typing here" type="text" data-list=".list">
 *   <div class="list">
 *     <span>item 1</span>
 *     <span>...</span>
 *     <span>item 2</span>
 *   </div>
 *
 *   or any similar structure...
 */
(function ($, hideseek) {
  "use strict";

  $.fn.hideseek = function (options) {

    var defaults = {
      list: '.hideseek-data',
      nodata: '',
      attribute: 'text',
      matches: false,
      highlight: false,
      ignore: '',
      headers: '',
      navigation: false,
      ignore_accents: false,
      hidden_mode: false,
      min_chars: 1,
      throttle: 0,
    };

    var options = $.extend(defaults, options);

    return this.each(function () {

      var $this = $(this);

      $this.opts = [];

      $.map(['list', 'nodata', 'attribute', 'matches', 'highlight', 'ignore', 'headers', 'navigation', 'ignore_accents', 'hidden_mode', 'min_chars', 'throttle'], function (val, i) {
        $this.opts[val] = $this.data(val) || options[val];
      });

      if ($this.opts.headers)
        $this.opts.ignore += $this.opts.ignore ? ', ' + $this.opts.headers : $this.opts.headers;

      var $list = $($this.opts.list);

      if ($this.opts.navigation) $this.attr('autocomplete', 'off');

      if ($this.opts.hidden_mode) $list.children().hide();

      $this.keyup(throttle(function (e) {

        if ([38, 40, 13].indexOf(e.keyCode) == -1 && (e.keyCode != 8 ? $this.val().length >= $this.opts.min_chars : true)) {

          var q = $this.val().toLowerCase();

          $list.children($this.opts.ignore.trim() ? ":not(" + $this.opts.ignore + ")" : '').removeClass('selected').each(function () {

            var data = (
              $this.opts.attribute != 'text'
                ? ($(this).attr($this.opts.attribute) || '')
                : $(this).text()
            ).toLowerCase();

            data = $this.opts.ignore_accents ? hideseek.removeAccents(data) : data;
            var treaty = data.indexOf(q) == -1 || q === ($this.opts.hidden_mode ? '' : false)

            if (treaty) {

              $(this).hide();

            } else {

              show_element($(this));

              if ($this.opts.matches && q.match(new RegExp(Object.keys($this.opts.matches)[0])) !== null) {
                if (data.match(new RegExp(Object.values($this.opts.matches)[0])) !== null) {
                  show_element($(this));
                } else {
                  $(this).hide();
                }
              }
            }

            $this.trigger('_after_each');

          });

          // No results message
          if ($this.opts.nodata) {

            $list.find('.no-results').remove();

            if (!$list.children(':not([style*="display: none"])').length) {

              $list
                .children()
                .first()
                .clone()
                .removeHighlight()
                .addClass('no-results')
                .show()
                .prependTo($this.opts.list)
                .text($this.opts.nodata);

              $this.trigger('_after_nodata');

            }

          }

          // hide headers with no results
          if ($this.opts.headers) {
            $($this.opts.headers, $list).each(function () {
              if (!$(this).nextUntil($this.opts.headers).not('[style*="display: none"],' + $this.opts.ignore).length) {
                $(this).hide();
              } else {
                $(this).show();
              }
            });
          }

          $this.trigger('_after');

        };

        function show_element(element) {
          $this.opts.highlight ? element.removeHighlight().highlight(q, $this.opts.ignore_accents).show() : element.show();
        }

        // Navigation
        function current(element) {
          return element.children('.selected:visible');
        };

        function prev(element) {
          return current(element).prevAll(":visible:first");
        };

        function next(element) {
          return current(element).nextAll(":visible:first");
        };

        if ($this.opts.navigation) {

          if (e.keyCode == 38) {

            if (current($list).length) {

              prev($list).addClass('selected');

              current($list).last().removeClass('selected');

            } else {

              $list.children(':visible').last().addClass('selected');

            };

          } else if (e.keyCode == 40) {

            if (current($list).length) {

              next($list).addClass('selected');

              current($list).first().removeClass('selected');

            } else {

              $list.children(':visible').first().addClass('selected');

            };

          } else if (e.keyCode == 13) {

            if (current($list).find('a').length) {

              document.location = current($list).find('a').attr('href');

            } else {

              $this.val(current($list).text());

            };

          };

        };

      }, $this.opts.throttle));

    });

  };

  function throttle(func, time) {
    if (!time || typeof time !== "number" || time <= 0) {
      return func;
    }

    var throttleTimer = 0;

    return function () {
      var args = arguments;

      clearTimeout(throttleTimer);

      throttleTimer = setTimeout(function () {
        func.apply(null, args);
      }, time);
    }
  }

  $(document).ready(function () { $('[data-toggle="hideseek"]').hideseek(); });

})(jQuery, window["hideseek"] = window["hideseek"] || {});

/**
 * highlight v4
 *
 * Highlights arbitrary terms.
 *
 * <http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html>
 *
 * @license MIT
 * @author Johann Burkard <mailto:jb@eaio.com>
 * @link http://johannburkard.de
 */
(function ($, hideseek) {

  $.fn.highlight = function (pat, ignoreAccents) {
    function innerHighlight(node, pat) {
      var skip = 0;
      if (node.nodeType == 3) {
        var data = ignoreAccents ? hideseek.removeAccents(node.data) : node.data;
        var pos = data.toUpperCase().indexOf(pat);
        if (pos >= 0) {
          var spannode = document.createElement('span');
          spannode.className = 'highlight';
          var middlebit = node.splitText(pos);
          var endbit = middlebit.splitText(pat.length);
          var middleclone = middlebit.cloneNode(true);
          spannode.appendChild(middleclone);
          middlebit.parentNode.replaceChild(spannode, middlebit);
          skip = 1;
        }
      }
      else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
        for (var i = 0; i < node.childNodes.length; ++i) {
          i += innerHighlight(node.childNodes[i], pat);
        }
      }
      return skip;
    }
    return this.length && pat && pat.length ? this.each(function () {
      innerHighlight(this, pat.toUpperCase());
    }) : this;
  };

  $.fn.removeHighlight = function () {
    return this.find("span.highlight").each(function () {
      this.parentNode.firstChild.nodeName;
      with (this.parentNode) {
        replaceChild(this.firstChild, this);
        normalize();
      }
    }).end();
  };

})(jQuery, window["hideseek"] = window["hideseek"] || {});

/**
 * HideSeek helpers
 * @preserve
 */
(function (hideseek) {
  /**
   * Removes accents from given text
   */
  function removeAccents(text) {
    return text
      .replace(/[áàãâäą]/gi, "a")
      .replace(/[çčć]/gi, "c")
      .replace(/[éè¨êę]/gi, "e")
      .replace(/[íìïî]/gi, "i")
      .replace(/[ĺľł]/gi, "l")
      .replace(/[ñňń]/gi, "n")
      .replace(/[óòöôõ]/gi, "o")
      .replace(/[ŕř]/gi, "r")
      .replace(/[šś]/gi, "s")
      .replace(/[ť]/gi, "t")
      .replace(/[úùüû]/gi, "u")
      .replace(/[ý]/gi, "y")
      .replace(/[žźż]/gi, "z");
  };

  hideseek.removeAccents = removeAccents;
})(window["hideseek"] = window["hideseek"] || {});