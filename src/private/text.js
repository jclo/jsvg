/** **************************************************************************
 *
 * A ...
 *
 * xxx.js is just a literal object that contains a set of functions.
 * it can't be intantiated.
 *
 * Private Functions:
 *  . _text                       adds a text to the selected SVG element,
 *
 *
 * Public Static Methods:
 *  . _text                       adds a text to the selected SVG element,
 *
 *
 *
 * @namespace    JG.Methods.Text.Public
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
  var Anim = JG.Anim.Public
    ;


  // -- Local constants


  // -- Local variables


  // -- Private Functions ----------------------------------------------------

  /**
   * Adds a text to the selected SVG element.
   *
   * @function (arg1, arg2)
   * @private
   * @param {Object}      the SVG object,
   * @param {Object}      the text or the the params for the animation,
   * @returns {}          -,
   * @since 0.0.0
   */
  function _text(that, value) {
    switch (typeof value) {
      case 'number':
      case 'string':
        /* eslint-disable-next-line no-param-reassign */
        that[0].textContent = value;
        break;

      case 'object':
        Anim.textAnimationRun(that, value);
        break;

      default:
        break;
    }
  }


  // -- Public Static Methods ------------------------------------------------

  JG.Methods.Text.Public = {

    /**
     * Adds a text to the selected SVG element.
     *
     * @method (arg1, arg2)
     * @public
     * @param {Object}      the SVG object,
     * @param {Object}      the text or the the params for the animation,
     * @returns {}          -,
     * @since 0.0.0
     */
    text: function(that, value) {
      _text(that, value);
    }
  };
}());
/* eslint-enable one-var, semi-style, no-underscore-dangle */
