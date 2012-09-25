/*
 * jQuery File Upload ICanHaz/Mustache Template Engine Plugin 0.1.2
 * https://github.com/meso-unimpressed/jQuery-File-Upload-ICanHaz-Mustache-Template-Engine
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2012, MESO Web Scapes - Mathias Wollin
 * http://meso.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 * Dependencies
 * - jQuery File Upload (https://github.com/blueimp/jQuery-File-Upload)
 *      - jQuery (http://jquery.com)
 *      - jQuery UI widget factory
 *        (http://wiki.jqueryui.com/w/page/12138135/Widget_factory)
 *      - jQuery Iframe Transport plugin
 *        (https://github.com/blueimp/jQuery-File-Upload)
 * - ICanHas or Mustache template Engine
 *   (http://icanhazjs.com or https://github.com/janl/mustache.js )
 * - I18n library
 *   (e.g. https://github.com/fnando/i18n-js/blob/master/vendor/assets/javascripts/i18n.js )
 */
$.widget('blueimpUIX.fileupload', $.blueimpUI.fileupload, {
  options: {
    // The template engine: either "ICanHas" or "Mustache".
    // If this string is empty, the detectTemplateEngine method tries to find
    // the appropriate engine, starting with "IcanHas" then "Mustache".
    templateEngine: "",
    // The ID fo the download template:
    uploadTemplateId: 'templateUpload',
    // The ID of the download template:
    downloadTemplateId: 'templateDownload',
    // render download template
    downloadTemplate: function (o) {
      var tEngine = $.blueimpUI.fileupload.detectTemplateEngine(o);
      // inject locale function (I18n translation)
      o.locale = $.blueimpUI.fileupload._locale;

      if (tEngine == "icanhaz") {
        return ich[o.options.downloadTemplateId](o);
      }else if( tEngine == "mustache") {
        // toDo: Test this
        return Mustache.render(o, [o.options.downloadTemplateId]);
      }else {
        return false;
      }
    },
    // render upload template
    uploadTemplate: function (o) {
      var tEngine = $.blueimpUI.fileupload.detectTemplateEngine(o);
      // inject locale function (I18n translation)
      o.locale = $.blueimpUI.fileupload._locale;

      if (tEngine == "icanhaz") {
        return ich[o.options.uploadTemplateId](o);
      }else if( tEngine == "mustache") {
        // toDo: Test this
        return Mustache.render(o, [o.options.uploadTemplateId]);
      }else {
        return false;
      }
    }
  },
  // overwrite and call prototype function
  _formatFileSize: function() {
    return function(text,render) {
      var bytes = Number(render(text));
      if(isNaN(bytes)) {
        return "";
      }else {
        return $.blueimpUI.fileupload.prototype._formatFileSize.call(this, bytes);
      }
    };
  }
});
/*
 * Extend fileupload widget
 */
$.extend($.blueimpUI.fileupload, {
  /*
   * Autodetect ICanHaz or Mustache template engine.
   *
   * If options.templateEngine is set to "ICanHas" or "Mustache" this will be
   * returned without trying the availability of IcanHas or Mustache.
   */
  detectTemplateEngine: function(o) {
    var engine = o.options.templateEngine;
    if (typeof engine == "string") {
      engine = engine.toLowerCase();
    }else{
      engine = "";
    }
    if (engine == "mustache" || engine == "icanhaz")
      return engine;
    try {
      if (typeof ich  == "object") {
        o.options.templateEngine = "ICanHaz";
      }
    }
    catch(e) {
      try {
        if (typeof Mustache == "object") {
          o.options.templateEngine = "Mustache";
        }
      }
      catch(e) {
        throw {
          name: "Missing Library",
          message: "Neither ICanHaz nor Mustache.js is available"
        };
      }
    }
    return o.options.templateEngine.toLowerCase();
  },
  /*
   * I18n translation
   */
  _locale: function(){
    return function(text,render) {
      return I18n.t($.trim(String(render(text))));
    };
  }
});