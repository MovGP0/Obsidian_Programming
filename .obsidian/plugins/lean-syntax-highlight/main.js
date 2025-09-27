'use strict';

var obsidian = require('obsidian');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var codemirror = CodeMirror;

createCommonjsModule(function (module, exports) {
(function(mod) {
  mod(codemirror);
})(function(CodeMirror) {

  const keywords =
    [ "show","have","from","suffices","nomatch","set_option","initialize","builtin_initialize","example","universe","universes","variable","variables","import","open","export","theory","prelude","renaming","hiding","exposing","do","by","let","extends","mutual","mut","where","rec","syntax","macro_rules","macro","deriving","fun","section","namespace","end","infix","infixl","infixr","postfix","prefix","notation","if","then","else","calc","match","with","for","in","unless","try","catch","finally","return","continue","break","global","local","scoped","partial","unsafe","private","protected","noncomputable","true","false" ];

  CodeMirror.defineMode("lean", function() {
    return {
      token: function(stream, state) {
        if (stream.eatSpace()) return null;

        if (state.commentLevel > 0) {
          if (stream.match(/.*?\/-/)) {
            state.commentLevel += 1;
          } else if (stream.match(/.*?-\//)) {
            state.commentLevel -= 1;
          } else {
            stream.skipToEnd();
          }
          return "comment";
        }

        if (stream.match(/\/-/)) {
          state.commentLevel += 1;
          return "comment";
        }

        if (stream.match(/--.*/)) {
          return "comment";
        }

        if (stream.match(/\b0b[01]+\b/i) ||
            stream.match(/\b0o[0-7]+\b/i) ||
            stream.match(/\b0x[0-9a-f]+\b/i) ||
            stream.match(/\b-?\d+(?:\.\d+)?(?:e[-+]?\d+)?\b/i)) {
          return "number";
        }

        if (stream.match(new RegExp(`\b(?:${keywords.join("|")})\b`))) {
          return "keyword";
        }

        if (stream.match(/#(print|check|eval|reduce|check_failure)\b/)) {
          return "operator";
        }

        if (stream.match(/\+|\*|-|\/|:=|>>>|<<<|\^\^\^|&&&|\|\|\||\+\+|\^|%|~~~|<|<=|>|>=|==|=/)) {
          return "operator";
        }

        if (stream.match(/[()\[\]{},:]/)) {
          return "meta";
        }

        if (stream.match(/\b(?:sorry|admit)\b/)) {
          return "error";
        }

        if (stream.match(/\b(inductive|coinductive|structure|theorem|axiom|abbrev|lemma|def|instance|class|constant)\b/)) {
          state.inDefinition = true;
          return "keyword";
        }

        if (state.inDefinition && stream.match(/\w+/)) {
          state.inDefinition = false;
          return "attribute";
        }

        if (stream.match(/"[^"\\]*(?:\\.[^"\\]*)*"/)) {
          return "string";
        }

        if (stream.match(/'[^'\\]*(?:\\.[^'\\]*)*'/)) {
          return "string";
        }

        if (stream.match(/@\[[^\]\n]*\]/)) {
          return "keyword";
        }

        if (stream.match(/\`[^(\s]*/)) {
          return "operator";
        }

        stream.next();
        return null;
      },
      startState: function() {
        return { inDefinition: false, commentLevel: 0 };
      }
    };
  });
});
});

var LeanSyntaxHighlightPlugin = /** @class */ (function (_super) {
    __extends(LeanSyntaxHighlightPlugin, _super);
    function LeanSyntaxHighlightPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LeanSyntaxHighlightPlugin.prototype.onload = function () { };
    LeanSyntaxHighlightPlugin.prototype.onunload = function () {
        delete CodeMirror.modes["lean"];
    };
    return LeanSyntaxHighlightPlugin;
}(obsidian.Plugin));

module.exports = LeanSyntaxHighlightPlugin;


/* nosourcemap */