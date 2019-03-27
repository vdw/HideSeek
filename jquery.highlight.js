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
