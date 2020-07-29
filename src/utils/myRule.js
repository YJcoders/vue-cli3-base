/* eslint-disable */

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

import _CodeMirror from 'codemirror';
(function(mod) {
  if (typeof exports === 'object' && typeof module === 'object') {
    // CommonJS
    mod(require(_CodeMirror));
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define([_CodeMirror], mod);
  } else {
    // Plain browser env 
    mod(_CodeMirror);
  }
})(function(CodeMirror) {
  'use strict';

  CodeMirror.defineMode('testmode', function(config, parserConfig) {
    var cons = ['fix', 'count', 'exclude'];
    var keywordRegex = new RegExp('\\b((' + cons.join(')|(') + '))\\b');
    var numLiteral = /(-|\+)?([0-9]+(\.[0-9]*)?|0x[0-9a-f]+)/;
    return {
      token: function(stream, state) {
        if (stream.match(/^('([^']|\\.)*'?|"([^"]|\\.)*"?)/)) { return 'iv-string'; }

        if (stream.match(keywordRegex)) return 'keyword';
        if (stream.match(/({|})/)) return 'bracket';
        if (stream.match(numLiteral)) return 'number';
        if (stream.match(/(->)/)) return 'arrow';

        stream.next();
        return null;
      },
      startState: function() {
        return {
          pair: false,
          pairStart: false,
          keyCol: 0,
          inlinePairs: 0,
          inlineList: 0,
          literal: false,
          escaped: false
        };
      }
    };
  });

  CodeMirror.defineMIME('text/testmode', 'testmode');
  CodeMirror.defineMIME('application/testmode', 'testmode');
});
