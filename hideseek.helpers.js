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
      .replace(/[éè¨ê]/gi, "e")
      .replace(/[íìïî]/gi, "i")
      .replace(/[óòöôõ]/gi, "o")
      .replace(/[úùüû]/gi, "u")
      .replace(/[ç]/gi, "c")
      .replace(/[ñ]/gi, "n");
  };

  hideseek.removeAccents = removeAccents;
})(window["hideseek"] = window["hideseek"] || {});