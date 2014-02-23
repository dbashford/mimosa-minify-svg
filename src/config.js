"use strict";

exports.defaults = function() {
  return {
    minifySvg: {
      options: {}
    }
  };
};

exports.placeholder = function() {
  return "\t\n\n" +
         "  minifySvg:      # config settings for SVG minifier\n" +
         "    options: {}   # pass-through options to the SVGO optimizer";

};

exports.validate = function( mimosaConfig, validators ) {
  var errors = [];

  if ( validators.ifExistsIsObject( errors, "minifySvg config", mimosaConfig.minifySvg ) ) {
    validators.ifExistsIsObject( errors, "minifySvg.options", mimosaConfig.minifySvg.options );
  }

  return errors;
};
