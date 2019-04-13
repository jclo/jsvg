/** **************************************************************************
 *
 * Implements JSVG static methods.
 *
 * staticmethods.js is just a literal object that contains a set of functions.
 * it can't be intantiated.
 *
 * Private Functions:
 *  . _transformAttrToObj         converts a SVG transform attr. string to an object,
 *  . _transformAttrToStr         converts a SVG transform attr. string to an object,
 *
 *
 * Public Static Methods:
 *  . addClass                    adds an attribute of class to the SVG element,
 *  . removeClass                 removes an attribute of class from the SVG element,
 *  . transformAttrToObj          converts a SVG transform attr. string to an object,
 *  . transformAttrToStr          converts a SVG transform attr. string to an object,
 *
 *
 *
 * @namespace    JG.Methods.Static.Public
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ************************************************************************ */
/* eslint-disable one-var, semi-style, no-underscore-dangle */

'use strict';

(function() {
  // IIFE

  // -- Module path


  // -- Local modules


  // -- Local constants


  // -- Local variables


  // -- Private Functions ----------------------------------------------------

  /**
   * Converts a SVG transform attributes string to an object.
   *
   * @function (arg1)
   * @private
   * @param {String}      the SVG transform atributes string,
   * @returns {Object}    returns the transform attributes,
   * @since 0.0.0
   */
  /* eslint-disable one-var-declaration-per-line */
  function _transformAttrToObj(transform) {
    var tr = typeof transform === 'string' ? transform : ''
      , matrix
      , translate
      , scale
      , rotate
      , skewX
      , skewY
      , regexN
      , regexTr
      , regexSc
      , regexRo
      , regexSkX
      , regexSkY
      , regexMtx
      ;

    regexN = /[+-]?((?:[1-9]\d*|0)(?:\.\d*)?|\.\d+)([eE][+-]?\d+)?/g;
    regexTr = /translate(.*?)\)/;
    regexSc = /scale(.*?)\)/;
    regexRo = /rotate(.*?)\)/;
    regexSkX = /skewX(.*?)\)/;
    regexSkY = /skewY(.*?)\)/;
    regexMtx = /matrix(.*?)\)/;

    translate = tr.match(regexTr) === null
      ? null
      : (function() {
        var t, x, y;
        t = tr.match(regexTr)[0].match(regexN);
        if (!t) {
          x = null;
          y = null;
        } else if (t.length === 1) {
          x = parseFloat(t[0], 10);
          y = x;
        } else {
          x = parseFloat(t[0], 10);
          y = parseFloat(t[1], 10);
        }
        return {
          x: x,
          y: y
        };
      }());

    scale = tr.match(regexSc) === null
      ? null
      : (function() {
        var s, x, y;
        s = tr.match(regexSc)[0].match(regexN);
        if (!s) {
          x = null;
          y = null;
        } else if (s.length === 1) {
          x = parseFloat(s[0], 10);
          y = x;
        } else {
          x = parseFloat(s[0], 10);
          y = parseFloat(s[1], 10);
        }
        return {
          x: x,
          y: y
        };
      }());

    rotate = tr.match(regexRo) === null
      ? null
      : (function() {
        var r, a, cx, cy;
        r = tr.match(regexRo)[0].match(regexN);
        if (!r) {
          a = null;
          cx = null;
          cy = null;
        } else if (r.length === 1) {
          a = parseFloat(r[0], 10);
          cx = null;
          cy = null;
        } else if (r.length === 2) {
          a = parseFloat(r[0], 10);
          cx = parseFloat(r[1], 10);
          cy = cx;
        } else {
          a = parseFloat(r[0], 10);
          cx = parseFloat(r[1], 10);
          cy = parseFloat(r[2], 10);
        }
        return {
          a: a,
          cx: cx,
          cy: cy
        };
      }());

    skewX = tr.match(regexSkX) === null
      ? null
      : (function() {
        var sk;
        sk = tr.match(regexSkX)[0].match(regexN);
        if (sk) {
          return parseFloat(tr.match(regexSkX)[0].match(regexN)[0], 10);
        }
        return null;
      }());

    skewY = tr.match(regexSkY) === null
      ? null
      : (function() {
        var sk;
        sk = tr.match(regexSkY)[0].match(regexN);
        if (sk) {
          return parseFloat(tr.match(regexSkY)[0].match(regexN)[0], 10);
        }
        return null;
      }());

    // Not implemented.
    matrix = tr.match(regexMtx) === null
      ? null
      : null;

    return {
      translate: translate,
      scale: scale,
      rotate: rotate,
      matrix: matrix,
      skewX: skewX,
      skewY: skewY
    };
  }
  /* eslint-enable one-var-declaration-per-line */

  /**
   * Converts a SVG transform attributes string to an object.
   *
   * @function (arg1)
   * @private
   * @param {String}        the SVG transform atributes string,
   * @returns {Object}      returns the transform attributes,
   * @since 0.0.0
   */
  function _transformAttrToStr(tr) {
    var s = ''
      ;

    // Translate:
    if (tr.translate && typeof tr.translate.x === 'number') {
      if (typeof tr.translate.y === 'number') {
        s += 'translate(' + tr.translate.x + ', ' + tr.translate.y + ') ';
      } else {
        // if y isn't provided, it is assumed to 0:
        s += 'translate(' + tr.translate.x + ', ' + 0 + ') ';
      }
    }

    // Scale:
    if (tr.scale && typeof tr.scale.x === 'number') {
      if (typeof tr.scale.y === 'number') {
        s += 'scale(' + tr.scale.x + ', ' + tr.scale.y + ') ';
      } else {
        // if y isn't provided, it is assumed to be equal to x:
        s += 'scale(' + tr.scale.x + ', ' + tr.scale.x + ') ';
      }
    }

    // Rotate:
    if (tr.rotate && typeof tr.rotate.a === 'number') {
      if (typeof tr.rotate.cx === 'number' && typeof tr.rotate.cy === 'number') {
        s += 'rotate(' + tr.rotate.a + ', ' + tr.rotate.cx + ', ' + tr.rotate.cy + ') ';
      } else if (typeof tr.rotate.cx === 'number') {
        // if y isn't provided, it is assumed to be equal to x:
        s += 'rotate(' + tr.rotate.a + ', ' + tr.rotate.cx + ', ' + tr.rotate.cx + ') ';
      } else {
        s += 'rotate(' + tr.rotate.a + ') ';
      }
    }

    // SkewX:
    if (typeof tr.skewX === 'number') {
      s += 'skewX(' + tr.skewX + ') ';
    }

    // SkewY:
    if (typeof tr.skewY === 'number') {
      s += 'skewY(' + tr.skewY + ') ';
    }

    // matrix not implemented!
    // -

    // Return a clean string (no leading/trailing blanck spaces):
    return s.replace(/(^\s+|\s+$)/g, '');
  }


  // -- Public Static Methods ------------------------------------------------

  JG.Methods.Static.Public = {

    /**
     * Adds an attribute of class to the SVG element.
     *
     * @method (arg1, arg2)
     * @public
     * @param {Object}      the SVG element,
     * @param {String}      the class name,
     * @returns {}          -,
     * @since 0.0.0
     */
    addClass: function(target, className) {
      var list = target.getAttributeNS(null, 'class');
      list = list ? list + ' ' + className : className;
      target.setAttributeNS(null, 'class', list);
    },

    /**
     * Removes an attribute of class from the SVG element.
     *
     * @method (arg1, arg2)
     * @public
     * @param {Object}      the SVG element,
     * @param {String}      the class name,
     * @returns {}          -,
     * @since 0.0.0
     */
    removeClass: function(target, className) {
      var list = target.getAttributeNS(null, 'class');

      // Remove the class and the extra leading and trailing white spaces if any:
      list = list.replace(className, '').replace(/(^\s+|\s+$)/g, '');
      target.setAttributeNS(null, 'class', list);
    },

    /**
     * Converts a SVG transform attributes string to an object.
     *
     * @method (arg1)
     * @public
     * @param {String}      the SVG transform atributes string,
     * @returns {Object}    returns the transform attributes,
     * @since 0.0.0
     */
    transformAttrToObj: function(transform) {
      return _transformAttrToObj(transform);
    },

    /**
     * Converts a SVG transform attributes string to an object.
     *
     * @function (arg1)
     * @public
     * @param {String}      the SVG transform atributes string,
     * @returns {Object}    returns the transform attributes,
     * @since 0.0.0
     */
    transformAttrToStr: function(tr) {
      return _transformAttrToStr(tr);
    }
  };
}());
/* eslint-enable one-var, semi-style, no-underscore-dangle */
