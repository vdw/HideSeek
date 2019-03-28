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
      .replace(/[áàãâä]/gi, "a")
      .replace(/[çč]/gi, "c")
      .replace(/[éè¨ê]/gi, "e")
      .replace(/[íìïî]/gi, "i")
      .replace(/[ĺľ]/gi, "l")
      .replace(/[ñň]/gi, "n")
      .replace(/[óòöôõ]/gi, "o")
      .replace(/[ŕř]/gi, "r")
      .replace(/[š]/gi, "s")
      .replace(/[ť]/gi, "t")
      .replace(/[úùüû]/gi, "u")
      .replace(/[ý]/gi, "y")
      .replace(/[ž]/gi, "z");
  };

  hideseek.removeAccents = removeAccents;
})(window["hideseek"] = window["hideseek"] || {});