"use strict";

var config = require( "./config" )
  , SVGO = require( "svgo" )
  , svgo;

var _execute = function ( mimosaConfig, options, next ) {
  if ( options.files && options.files.length) {

    // no reason to be more than one file for SVG
    // grab output file text if copied already, otherwise grab inputFileText
    var file = options.files[0]
      , src = file.outputFileText || file.inputFileText;

    if ( typeof src === "object" ) {
      src = src.toString();
    }

    try {
      svgo.optimize( src, function( result ) {
        if ( result.error ) {
          mimosaConfig.log.error( "[[ " + file.inputFileName + " ]] could not be parsed: ", result.error );
        } else {
          var sizeDiff = src.length - result.data.length;
          if ( sizeDiff ) {
            var pcnt = Math.round( ( sizeDiff / src.length ) * 100 );
            mimosaConfig.log.info( "Saved [[ " + sizeDiff + " (" + pcnt + "%) ]] characters for file [[ " + file.inputFileName + " ]]");
            file.outputFileText = result.data;
          }
        }
        next();
      });
    } catch (err) {
      // error seems to both be captured in callback result.error and thrown
      mimosaConfig.log.error( "Error minifying SVG [[ " + file.inputFileName + " ]], ", err );
    }

  } else  {
    next();
  }
};

var registration = function ( mimosaConfig, register ) {
  svgo = new SVGO( mimosaConfig.minifySvg.options );
  if ( mimosaConfig.isMinify) {
    register( [ "add", "update", "buildFile"], "afterCompile", _execute, [ "svg" ] );
  }
};

module.exports = {
  registration: registration,
  defaults: config.defaults,
  placeholder: config.placeholder,
  validate: config.validate
};