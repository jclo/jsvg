// Based on UMDLib template v0.8.4
// ESLint declarations
/* global define */
/* eslint strict: ["error", "function"] */
(function(root, factory) {
  'use strict';

  /* istanbul ignore next */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([''], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(root);
    // This is a hack to attach the lib to the browser root when this lib is
    // included inside another lib and the whole is browserifyied:
    /* eslint-disable-next-line no-param-reassign */
    if (root.JSVG === null) root.JSVG = factory(root);
  } else {
    // Browser globals.
    /* eslint-disable-next-line no-param-reassign */
    root.JSVG = factory(root);
  }
}({{lib:parent}}, function(root) {
  'use strict';

  // These are the global variables accessible everywhere inside this module.
  // 'JSVG' is the variable that defines this library and it is the only variable
  // accessible outside this module.
  // 'JG' is an object that exports public methods from the IIFE modules
  // in which they are defined.
  /* eslint-disable one-var, semi-style */
  var SVG_NS   = 'http://www.w3.org/2000/svg'
    , XLINK_NS = 'http://www.w3.org/1999/xlink'
    , JSVG
    , JG
    ;

  /* eslint-enable one-var, semi-style */

  /** **************************************************************************
   *
   * JG is an internal object that links all the internal modules.
   *
   * tree.js is just a literal object that contains a set of functions. It
   * can't be intantiated.
   *
   *
   * @namespace JG
   * @exports   -
   * @author    -
   * @since     0.0.0
   * @version   -
   * ************************************************************************ */

  JG = {
    JSVGU: {
      Public: {}
    },
    Anim: {
      Public: {}
    },
    Event: {
      Public: {}
    },
    Methods: {
      Static: {
        Public: {},
        Draw: {
          Public: {}
        }
      },
      Attr: {
        Public: {}
      },
      Text: {
        Public: {}
      }
    }
  };


  /** **************************************************************************
   *
   * Performs the animations.
   *
   * animation.js is just a literal object that contains a set of functions.
   * it can't be intantiated.
   *
   * Private Functions:
   *  . _dAnimationRun              performs the animation,
   *  . _rotateAnimationRun         rotates the SVG element,
   *  . _scaleAnimationRun          scales the SVG element,
   *  . _translateAnimationRun      translates the SVG element,
   *  . _textAnimationRun           updates the text value from initial to final value,
   *
   *
   * Public Static Methods:
   *  . easingLinear                computes the values according to the linear progression,
   *  . dAnimationRun               performs the animation,
   *  . rotateAnimationRun          rotates the SVG element,
   *  . scaleAnimationRun           scales the SVG element,
   *  . translateAnimationRun       translates the SVG element,
   *  . textAnimationRun            updates the text value from initial to final value,
   *
   *
   *
   * @namespace    JG.Anim.Public
   * @dependencies none
   * @exports      -
   * @author       -
   * @since        0.0.0
   * @version      -
   * ************************************************************************ */
  /* eslint-disable one-var, semi-style, no-underscore-dangle */

  (function() {
    // IIFE

    // -- Module path


    // -- Local modules


    // -- Local constants


    // -- Local variables


    // -- Private Functions ----------------------------------------------------

    /**
     * Performs the animation.
     *
     * object: { type: '', start: '', stop: '', d: '', fn: '' }
     *   type is equal to 'd',
     *   start is equal to the starting point,
     *   stop is equal to the end point,
     *   and d is equal to the duration in ms,
     *   fn is the transfert function that produces the 'd' value.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}        the SVG object,
     * @param {Object}        the animation to perform,
     * @returns {}            -,
     * @since 0.0.0
     */
    /* istanbul ignore next */
    function _dAnimationRun(that, anim) {
      var el     = that[0]
        , easing = el.easing
        , d
        , timer
        ;

      // Set event:
      el.event = that.createEvent();

      // Set animation params:
      d = {
        value: 0,
        start: typeof anim.start === 'number' ? anim.start : 0,
        stop: typeof anim.start === 'number' ? anim.stop : 180,
        t: 0,
        duration: typeof anim.d === 'number' ? anim.d : 2000,
        fn: function(val) {
          return JSVG.draw.arc(0, val, 100, 80);
        }
      };
      if (typeof anim.fn === 'function') {
        d.fn = anim.fn;
      }

      // Run:
      el.isAnimationOn = true; // deprecated
      that.setMessage('isAnimationOn', true);

      timer = setInterval(function() {
        // Compute the next step:
        d.t += el.frequency;
        // Abort if overflow or if no change in the position:
        if (d.t > d.duration || d.stop === d.start) { d.t = d.duration; }
        d.value = easing(d.t, d.start, (d.stop - d.start), d.duration);
        if (d.duration === 0) { d.value = d.start; }

        // Display arc.
        el.setAttributeNS(null, 'd', d.fn(d.value));

        // Is animation over?
        if (d.t === d.duration) {
          clearInterval(timer);
          el.isAnimationOn = false; // deprecated
          that.setMessage('isAnimationOn', false);
          el.dispatchEvent(el.event);
        }
      }, el.frequency);
    }

    /**
     * Rotates the SVG element.
     *
     * object: { type: '', start: '', stop: '', d: '' }
     *   type is equal to 'rotate',
     *   start is equal to the starting point in degrees,
     *   stop is equal to the end point in degrees,
     *   and d is equal to the duration in ms.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}        the SVG object,
     * @param {Object}        the rotation to perform,
     * @returns {}            -,
     * @since 0.0.0
     */
    /* istanbul ignore next */
    function _rotateAnimationRun(that, anim) {
      var el     = that[0]
        , easing = el.easing
        , arc
        , timer
        , transform
        ;

      // Set event:
      el.event = that.createEvent();

      // Set animation params:
      arc = {
        a: 0,
        start: typeof anim.start === 'number' ? anim.start : 0,
        stop: typeof anim.stop === 'number' ? anim.stop : 180,
        t: 0,
        duration: typeof anim.d === 'number' ? anim.d : 2000
      };

      // Run:
      el.isAnimationOn = true; // deprecated.
      that.setMessage('isAnimationOn', true);
      timer = setInterval(function() {
        // Compute the next step.
        arc.t += el.frequency;
        // Abort if overflow or if no change in the position.
        if (arc.t > arc.duration || arc.stop === arc.start) { arc.t = arc.duration; }
        arc.a = easing(arc.t, arc.start, (arc.stop - arc.start), arc.duration);

        // Retrieve transform attributes, set new rotation value and update.
        transform = JSVG.transformAttrToObj(el.getAttribute('transform'));
        transform.rotate.a = arc.a;
        el.setAttributeNS(null, 'transform', JSVG.transformAttrToStr(transform));

        if (arc.t === arc.duration) {
          clearInterval(timer);
          el.isAnimationOn = false; // deprecated.
          that.setMessage('isAnimationOn', false);
          el.dispatchEvent(el.event);
        }
      }, el.frequency);
    }

    /**
     * Scales the SVG element.
     *
     * object: { type: '', x0: '', y0: '', x1: '', y1: '', d: '' }
     *   type is equal to scale,
     *   x0 & y0 are the initial values,
     *   x1 & y1 are the final values,
     *   and d is equal to the duration in ms.
     *   scaleAnimationRun: function(that, anim) {
     *     //
     *   },
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}        the SVG object,
     * @param {Object}        the scaling to perform,
     * @returns {}            -,
     * @since 0.0.0
     */
    /* istanbul ignore next */
    function _scaleAnimationRun(that, anim) {
      var el     = that[0]
        , easing = el.easing
        , scale
        , timer
        , transform
        ;

      scale = {
        x0: typeof anim.x0 === 'number' ? anim.x0 : 0,
        y0: typeof anim.y0 === 'number' ? anim.y0 : 0,
        x1: typeof anim.x1 === 'number' ? anim.x1 : 1,
        y1: typeof anim.y1 === 'number' ? anim.y1 : 1,
        x: 0,
        y: 0,
        t: 0,
        duration: typeof anim.d === 'number' ? anim.d : 2000
      };

      // Run:
      timer = setInterval(function() {
        // Compute the next step:
        scale.t += el.frequency;
        if (scale.t > scale.duration) { scale.t = scale.duration; }
        scale.x = easing(scale.t, scale.x0, (scale.x1 - scale.x0), scale.duration);
        scale.y = easing(scale.t, scale.y0, (scale.y1 - scale.y0), scale.duration);

        // Retrieve transform attributes, set new scale value and update.
        transform = JSVG.transformAttrToObj(el.getAttribute('transform'));
        transform.scale.x = scale.x;
        transform.scale.y = scale.y;
        el.setAttributeNS(null, 'transform', JSVG.transformAttrToStr(transform));

        if (scale.t === scale.duration) {
          clearInterval(timer);
        }
      }, el.frequency);
    }

    /**
     * Translates the SVG element.
     *
     * object = { type: '', x: '', y: '', d: '' }
     *  type is equal to 'translate',
     *  x & y are the destination values,
     *  and d is equal to the duration in ms.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}        the SVG object,
     * @param {Object}        the translation to perform,
     * @returns {}            -,
     * @since 0.0.0
     */
    /* eslint-disable max-len */
    /* istanbul ignore next */
    function _translateAnimationRun(that, anim) {
      var el     = that[0]
        , easing = el.easing
        , transform
        , translate
        , vector
        , timer
        ;

      // Set event:
      el.event = that.createEvent();

      // Retrieve transform attributes to get original translate position.
      transform = JSVG.transformAttrToObj(that[0].getAttribute('transform'));
      translate = {
        x0: transform.translate.x,
        y0: transform.translate.y
      };

      vector = {
        x: 0,
        y: 0,
        length: Math.sqrt(Math.pow((anim.x - translate.x0), 2) + Math.pow((anim.y - translate.y0), 2)),
        arc: Math.atan((anim.y - translate.y0) / (anim.x - translate.x0)),
        t: 0,
        duration: 2000
        // Be careful, the arc value is infinite if the selected element
        // is the same.
      };
      if (anim.x - translate.x0 < 0) { vector.arc += -Math.PI; }
      if (vector.length === 0) { vector.arc = 0; }
      if (typeof anim.d === 'number') { vector.duration = anim.d; }

      // Run:
      // Another element is selected. Start moving tooltip.
      el.isAnimationOn = true; // deprecated.
      that.setMessage('isAnimationOn', true);

      timer = setInterval(function() {
        // Compute the next step:
        vector.t += el.frequency;
        if (vector.t > vector.duration) { vector.t = vector.duration; }
        vector.x = (easing(vector.t, 0, vector.length, vector.duration) * Math.cos(vector.arc)) + translate.x0;
        vector.y = (easing(vector.t, 0, vector.length, vector.duration) * Math.sin(vector.arc)) + translate.y0;

        // Retrieve the transform attributes, set the new position value and update:
        transform = JSVG.transformAttrToObj(el.getAttribute('transform'));
        transform.translate.x = vector.x;
        transform.translate.y = vector.y;
        el.setAttributeNS(null, 'transform', JSVG.transformAttrToStr(transform));

        // Stop the timer if 'isAnimationOn' is turned false
        // or if destination point reached.
        if (el.isAnimationOn === false || that.getMessage('isAnimationOn') === false) {
          clearInterval(timer);
        } else if (vector.t === vector.duration) {
          // Destination point is reached. Stop the animation:
          clearInterval(timer);
          el.isAnimationOn = false; // deprecated.
          that.setMessage('isAnimationOn', false);
          el.dispatchEvent(el.event);
        }
      }, el.frequency);
    }
    /* eslint-enable max-len */

    /**
     * Updates dynamically the text value from the initial to the final value.
     *
     * anim = { type: '', start: '', stop: '', d: '' }
     * @function (arg1, arg2)
     * @private
     * @param {Object}        the SVG object,
     * @param {Object}        the animation parameters,
     * @returns {}            -,
     * @since 0.0.0
     */
    function _textAnimationRun(that, anim) {
      var el = that[0]
        , easing = el.easing
        , digit = {
          value: 0,
          start: typeof anim.start === 'number' ? anim.start : 0,
          stop: typeof anim.stop === 'number' ? anim.stop : 0,
          t: 0,
          duration: typeof anim.d === 'number' ? anim.d : 2000
        }
        , timer
        ;

      // Run:
      timer = setInterval(function() {
        // Compute the next step:
        digit.t += el.frequency;
        // Abort if overflow or if no change in the position.
        if (digit.t > digit.duration || digit.stop === digit.start) {
          digit.t = digit.duration;
        }
        digit.value = easing(digit.t, digit.start, (digit.stop - digit.start), digit.duration);
        if (digit.duration === 0) {
          digit.value = digit.start;
        }

        // Display the new digit value:
        el.textContent = digit.value.toFixed(0);

        // is animation over?
        if (digit.t === digit.duration) {
          clearInterval(timer);
        }
      }, el.frequency);
    }


    // -- Public Static Methods ------------------------------------------------

    JG.Anim.Public = {

      /**
       * Computes the intermediate values according to a linear progression.
       *
       * @method (arg1, arg2, arg3, arg4)
       * @public
       * @param {Number}      the current time,
       * @param {Number}      the beginning value,
       * @param {Number}      the change in value,
       * @param {Number}      the duration,
       * @returns {Number}    returns the computed value,
       */
      easingLinear: function(t, b, c, d) {
        return ((c * t) / d) + b;
      },

      /**
       * Performs the animation.
       *
       * @method (arg1, arg2)
       * @public
       * @param {Object}        the SVG object,
       * @param {Object}        the animation to perform,
       * @returns {}            -,
       * @since 0.0.0
       */
      dAnimationRun: /* istanbul ignore next */ function(that, anim) {
        _dAnimationRun(that, anim);
      },

      /**
       * Rotates the SVG element.
       *
       * @method (arg1, arg2)
       * @public
       * @param {Object}        the SVG object,
       * @param {Object}        the rotation to perform,
       * @returns {}            -,
       * @since 0.0.0
       */
      rotateAnimationRun: /* istanbul ignore next */ function(that, anim) {
        _rotateAnimationRun(that, anim);
      },

      /**
       * Scales the SVG element;
       *
       * @method (arg1, arg2)
       * @public
       * @param {Object}        the SVG object,
       * @param {Object}        the scaling to perform,
       * @returns {}            -,
       * @since 0.0.0
       */
      scaleAnimationRun: /* istanbul ignore next */ function(that, anim) {
        _scaleAnimationRun(that, anim);
      },

      /**
       * Translates the SVG Element.
       *
       * @method (arg1, arg2)
       * @public
       * @param {Object}        the SVG object,
       * @param {Object}        the translation to perform,
       * @returns {}            -,
       * @since 0.0.0
       */
      translateAnimationRun: /* istanbul ignore next */ function(that, anim) {
        _translateAnimationRun(that, anim);
      },

      /**
       * Updates dynamically the text value from the initial to the final value.
       *
       * @method (arg1, arg2)
       * @public
       * @param {Object}        the SVG object,
       * @param {Object}        the animation parameters,
       * @returns {}            -,
       * @since 0.0.0
       */
      textAnimationRun: function(that, anim) {
        _textAnimationRun(that, anim);
      }
    };
  }());
  /* eslint-enable one-var, semi-style, no-underscore-dangle */


  /** **************************************************************************
   *
   * Adds or Updates the SVG node attributes.
   *
   * attributes.js is just a literal object that contains a set of functions.
   * it can't be intantiated.
   *
   * Private Functions:
   *  . _attr                       Adds an attribute to the selected SVG element,
   *
   *
   * Public Static Methods:
   *  . _attr                       Adds an attribute to the selected SVG element,
   *
   *
   *
   * @namespace    JG.Methods.Attr.Public
   * @dependencies none
   * @exports      -
   * @author       -
   * @since        0.0.0
   * @version      -
   * ************************************************************************ */
  /* eslint-disable one-var, semi-style, no-underscore-dangle */

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
     * Adds an attribute to the selected SVG element.
     *
     * @function (arg1, arg2, arg3)
     * @private
     * @param {Object}        the SVG object,
     * @param {String}        the name of the attribute,
     * @param {Object}        the value of the attribute or the params for the animation,
     * @returns {}            -,
     * @since 0.0.0
     */
    /* istanbul ignore next */
    function _attr(that, attr, value) {
      switch (typeof value) {
        // Add the requested attribute to this element:
        case 'string':
        case 'number':
          that[0].setAttributeNS(null, attr, value);
          break;

        case 'object':
          // Proceed with an animation:
          switch (attr) {
            // ...
            case 'd':
              Anim.dAnimationRun(that, value);
              break;

            // Transform animations:
            case 'transform':
              switch (value.type) {
                // Rotate animation:
                case 'rotate':
                  Anim.rotateAnimationRun(that, value);
                  break;

                // Scale animation:
                case 'scale':
                  Anim.scaleAnimationRun(that, value);
                  break;

                // Smooth linear animation:
                case 'translate':
                  Anim.translateAnimationRun(that, value);
                  break;

                default:
                  throw new Error('The animation is not supported for the transform ' + value.type + '!');
              }
              break;

            default:
              throw new Error('The animation is not supported for the attribute ' + attr + '!');
          }
          break;

        default:
          // Ignore!
      }
    }

    // -- Public Static Methods ------------------------------------------------

    JG.Methods.Attr.Public = {

      /**
       * Adds an attribute to the selected SVG element.
       *
       * @method (arg1, arg2, arg3)
       * @public
       * @param {Object}        the SVG object,
       * @param {String}        the name of the attribute,
       * @param {Object}        the value of the attribute or the params for the animation,
       * @returns {}            -,
       * @since 0.0.0
       */
      attr: function(that, attr, value) {
        _attr(that, attr, value);
      }
    };
  }());
  /* eslint-enable one-var, semi-style, no-underscore-dangle */


  /** **************************************************************************
   *
   * Implements JSVG.draw methods.
   *
   * draw.js is just a literal object that contains a set of functions.
   * it can't be intantiated.
   *
   * Private Functions:
   *  . _arc                        draws an arc,
   *  . _line                       draws polygonal lines (deprecated),
   *  . _multipolyline              draws a set of polylines,
   *
   *
   * Public Static Methods:
   *  . arc                         draws an arc,
   *  . line                        draws polygonal lines (deprecated),
   *  . multipolyline               draws a set of polylines,
   *
   *
   *
   * @namespace    JG.Methods.Static.Draw.Public
   * @dependencies none
   * @exports      -
   * @author       -
   * @since        0.0.0
   * @version      -
   * ************************************************************************ */
  /* eslint-disable one-var, semi-style, no-underscore-dangle */

  (function() {
    // IIFE

    // -- Module path


    // -- Local modules


    // -- Local constants


    // -- Local variables


    // -- Private Functions ----------------------------------------------------

    /**
     * Draws an arc.
     *
     * The returned path has the following format:
     *   'Mx0,y0 Arx,ry 0 sweepflag x1,y1 L x1,y1 Arx,ry 0 sweepflag x0,y0 Z'
     *
     * @function (arg1, arg2, arg3, arg4)
     * @private
     * @param {Number}      start angle in radius,
     * @param {Number}      Stop angle,
     * @param {Number}      external radius,
     * @param {Number}      internal radius,
     * @returns {String}    returns the SVG path,
     * @since 0.0.0
     */
    /* eslint-disable no-param-reassign, operator-assignment, vars-on-top */
    /* istanbul ignore next */
    function _arc(startAngle, stopAngle, outerRadius, innerRadius) {
      startAngle = startAngle !== undefined ? startAngle : 0;
      stopAngle = stopAngle !== undefined ? stopAngle : 0;
      outerRadius = outerRadius !== undefined ? outerRadius : 0;
      startAngle = startAngle % (2 * Math.PI);
      if (startAngle > (2 * Math.PI)) { startAngle = startAngle % (2 * Math.PI); }
      if (stopAngle > (2 * Math.PI)) { stopAngle = stopAngle % (2 * Math.PI); }

      var sweepflag = 0;
      if (Math.abs(stopAngle - startAngle) > Math.PI) { sweepflag = 1; }
      var x0 = Math.cos(startAngle);
      var y0 = Math.sin(startAngle);
      var x1 = Math.cos(stopAngle);
      var y1 = Math.sin(stopAngle);

      var outerArc = 'M' + (x0 * outerRadius) + ',' + (y0 * outerRadius) + 'A' + outerRadius + ',' + outerRadius + ' ' + 0 + ' ' + sweepflag + ',' + 1 + ' ' + (x1 * outerRadius) + ',' + (y1 * outerRadius);
      var innerArc = '';
      if (innerRadius !== undefined) {
        innerArc = 'L' + (x1 * innerRadius) + ',' + (y1 * innerRadius) + 'A' + innerRadius + ',' + innerRadius + ' ' + 0 + ' ' + sweepflag + ',' + 0 + ' ' + (x0 * innerRadius) + ',' + (y0 * innerRadius) + 'Z';
      }
      return outerArc + innerArc;
    }
    /* eslint-enable no-param-reassign, operator-assignment, vars-on-top */

    /**
     * Draws polygonal lines (deprecated, use multipolyline instead).
     *
     * The returned path has the following format:
     *   'Mx0,y0 Lx1,y1 .... Lxn,yn'
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      a set of points (x, y) defining the polygonal line,
     * @param {Boolean}     true if it is a polygon (closed path),
     * @returns {String}    returns the SVG path,
     * @since 0.0.0
     */
    /* istanbul ignore next */
    function _line(shape, closed) {
      var path = '';
      shape.forEach(function(obj) {
        if (obj.x !== null && obj.y !== null) {
          if (path === '') {
            path = 'M' + obj.x + ',' + obj.y;
          } else {
            path += 'L' + obj.x + ',' + obj.y;
          }
        }
      });
      if (closed === true) { path += 'Z'; }
      return path;
    }

    /**
     * Draws a set of polylines.
     *
     * The polylines array looks like:
     *   [ [{x: n, y: n}, {}, {}, ... {}], [{...}], [{...}] ]
     * The returned path has the following format:
     *   'Mx0,y0 Lx1,y1 .... Lxn,yn Mx0,y0 ...'
     *
     * @method (arg1, arg2)
     * @public
     * @param {Object}      a set of array of points (x, y) defining
     *                      the polygonal line,
     * @param {Boolean}     true if it is a polygon (closed path),
     * @returns {String}    returns the SVG path,
     * @since 0.0.0
     */
    /* istanbul ignore next */
    function _multipolyline(shape, closed) {
      var path
        , subpath
        , i
        , j
        ;

      path = '';
      for (i = 0; i < shape.length; i++) {
        subpath = '';
        for (j = 0; j < shape[i].length; j++) {
          if (shape[i][j].x !== null && shape[i][j].y !== null) {
            if (subpath === '') {
              subpath = 'M' + shape[i][j].x + ',' + shape[i][j].y;
            } else {
              subpath += 'L' + shape[i][j].x + ',' + shape[i][j].y;
            }
          }
        }
        if (closed === true) { subpath += 'z'; }
        path += subpath;
      }
      return path;
    }


    // -- Public Static Methods ------------------------------------------------

    JG.Methods.Static.Draw.Public = {

      /**
       * Draws an arc.
       *
       * @method (arg1, arg2, arg3, arg4)
       * @public
       * @param {Number}      start angle in radius,
       * @param {Number}      Stop angle,
       * @param {Number}      external radius,
       * @param {Number}      internal radius,
       * @returns {String}    returns the SVG path,
       * @since 0.0.0
       */
      arc: /* istanbul ignore next */ function(startAngle, stopAngle, outerRadius, innerRadius) {
        return _arc(startAngle, stopAngle, outerRadius, innerRadius);
      },

      /**
       * Draws polygonal lines (deprecated, use multipolyline instead).
       *
       * @method (arg1, arg2)
       * @public
       * @param {Object}      a set of points (x, y) defining the polygonal line,
       * @param {Boolean}     true if it is a polygon (closed path),
       * @returns {String}    returns the SVG path,
       * @since 0.0.0
       */
      line: /* istanbul ignore next */ function(shape, closed) {
        return _line(shape, closed);
      },

      /**
       * Draws a set of polylines.
       *
       * @function (arg1, arg2)
       * @public
       * @param {Object}    a set of points (x, y) defining the polygonal line,
       * @param {Boolean}   true if it is a polygon (closed path),
       * @returns {String}  returns the SVG path,
       * @since 0.0.0
       */
      multipolyline: /* istanbul ignore next */ function(shape, closed) {
        return _multipolyline(shape, closed);
      }
    };
  }());
  /* eslint-enable one-var, semi-style, no-underscore-dangle */


  /** **************************************************************************
   *
   * Creates an Event.
   *
   * event.js is just a literal object that contains a set of functions.
   * it can't be intantiated.
   *
   * Private Functions:
   *  . _create                     creates the event 'animationOver',
   *
   *
   * Public Static Methods:
   *  . create                      creates the event 'animationOver',
   *
   *
   *
   * @namespace    JG.Event.Public
   * @dependencies none
   * @exports      -
   * @author       -
   * @since        0.0.0
   * @version      -
   * ************************************************************************ */
  /* eslint-disable one-var, semi-style, no-underscore-dangle */

  (function() {
    // IIFE

    // -- Module path


    // -- Local modules


    // -- Local constants


    // -- Local variables


    // -- Private Functions ----------------------------------------------------

    /**
     * Creates the event 'animationOver'.
     *
     * @function (arg1)
     * @private
     * @param {Object}        the SVG object,
     * @returns {Object}      returns the event object,
     * @since 0.0.0
     */
    /* istanbul ignore next */
    function _create(that) {
      var event = {}
        , eventType = 'animationOver'
        ;

      // Check it is new:
      if (!that[0].event) {
        // New event:
        switch (that.browser) {
          case 'modern':
            event = new Event(eventType);
            break;

          case 'old':
            event = document.createEvent('Event');
            event.initEvent(eventType, true, true);
            break;

          default:
            throw new Error('This type of browser is not supported!');
        }
        return event;
      }
      // Event already attached:
      return that[0].event;
    }


    // -- Public Static Methods ------------------------------------------------

    JG.Event.Public = {

      /**
       * Creates the event 'animationOver'.
       *
       * @method (arg1)
       * @public
       * @param {Object}      the SVG object,
       * @returns {Object}    returns the event object,
       * @since 0.0.0
       */
      create: /* istanbul ignore next */ function(that) {
        return _create(that);
      }
    };
  }());
  /* eslint-enable one-var, semi-style, no-underscore-dangle */


  /** **************************************************************************
   *
   * Utilities functions used by jsvg.js
   *
   * jsvgu.js is just a literal object that contains a set of functions.
   * it can't be intantiated.
   *
   * Private Functions:
   *  . _getBrowser                 finds the browser type,
   *  . _create                     creates the SVG Node in the DOM,
   *
   *
   * Public Static Methods:
   *  . getBrowser                  finds the browser type,
   *  . create                      creates the SVG Node in the DOM,
   *
   *
   *
   * @namespace    JG.JSVGU.Public
   * @dependencies none
   * @exports      -
   * @author       -
   * @since        0.0.0
   * @version      -
   * ************************************************************************ */
  /* eslint-disable one-var, semi-style, no-underscore-dangle */

  (function() {
    // IIFE

    // -- Module path


    // -- Local modules


    // -- Local constants


    // -- Local variables


    // -- Private Functions ----------------------------------------------------

    /**
     * Finds the browser type.
     *
     * @function ()
     * @private
     * @param {}            -,
     * @returns {String}    returns the type of browser (modern or old),
     * @throws {Object}     throws an error if the browser doesn't support neither
     *                      the 'Event' constructor nor the 'createEvent' method,
     * @since 0.0.0
     */
    /* eslint-disable no-unused-vars */
    function _getBrowser() {
      var browser
        , event
        ;

      // Check if the browser supports the 'Event' constructor:
      try {
        browser = 'modern';
        event = new Event('event');
      } catch (e) {
        browser = 'old';
        // Check if the browser supports the 'createEvent' method:
        try {
          event = document.createEvent('Event');
        } catch (ev) {
          // This browser doesn't support never the 'Event' constructor, nor
          // the 'createEvent' method:
          browser = 'not supported';
          throw new Error('This type of browser is not supported!');
        }
      }
      return browser;
    }
    /* eslint-enable no-unused-vars */

    /**
     * Creates the SVG Node in the DOM if it doesn't exist.
     *
     * Nota:
     * Mutates this.svgRootNode and this.svgElement.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}        the SVG element,
     * @param {String}        the ID of the node parent surrounding the SVG node,
     * @returns {}            -,
     * @since 0.0.0
     */
    /* eslint-disable no-param-reassign */
    function _create(that, id) {
      var isSVG
        , svg
        ;

      // First, check that is selector is real and attached to an DOM node:
      if (typeof id !== 'string' || document.getElementById(id) === null) {
        that[0] = null;
        that.svgRoot = null;
        return;
      }

      // Then, check that this SVG node doesn't exist:
      isSVG = document.getElementById(id).getElementsByTagNameNS(SVG_NS, 'svg')[0];
      if (!isSVG || isSVG.length === 0) {
        // Ok, it doesn't exist, we can create it:
        svg = document.createElementNS(SVG_NS, 'svg');
        svg.setAttributeNS(null, 'version', '1.1');
        svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns', SVG_NS);
        svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', XLINK_NS);
        that[0] = document.getElementById(id).appendChild(svg);
        that.svgRoot = that[0];
      } else {
        // It already exists, do not overwrite it!
        that[0] = isSVG;
        that.svgRoot = that[0];
      }
    }
    /* eslint-enable no-param-reassign */


    // -- Public Static Methods ------------------------------------------------

    JG.JSVGU.Public = {

      /**
       * Finds the browser type.
       *
       * @method ()
       * @public
       * @param {}            -,
       * @returns {String}    returns the type of browser (modern or old),
       * @since 0.0.0
       */
      getBrowser: function() {
        return _getBrowser();
      },

      /**
       * Creates the SVG Node in the DOM if it doesn't exist.
       *
       * @method (arg1, arg2)
       * @public
       * @param {Object}      the SVG element,
       * @param {String}      the ID of the node parent surrounding the SVG node,
       * @returns {}          -,
       * @since 0.0.0
       */
      create: function(that, id) {
        return _create(that, id);
      }
    };
  }());
  /* eslint-enable one-var, semi-style, no-underscore-dangle */


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


  /** **************************************************************************
   *
   * Defines the JSVG library.
   *
   * jsvg.js is built upon the Prototypal Instantiation pattern. It
   * returns an object by calling its constructor. It doesn't use the new
   * keyword.
   *
   * Private Functions:
   *  . none
   *
   *
   * Public Static Methods:
   *  . noConflict           returns the JSVG variable to its previous owner,
   *  . addClass             adds an attribute of class to the SVG element,
   *  . removeClass          removes an attribute of class to the SVG element,
   *  . transformAttrToObj   converts a SVG transform attributes string to an object,
   *  . transformAttrToStr   converts a SVG transform attributes string to an object,
   *  . draw.arc             draws an arc,
   *  . draw.line            draws polygonal lines (deprecated),
   *  . draw.multipolyline   draws a set of polylines,
   *
   *
   * Public Chaining methods:
   *  . select               selects an SVG element,
   *  . parent               moves to parent SVG element,
   *  . firstParent          moves to the first parent,
   *  . append               appends an SVG element and selects it,
   *  . appendBefore         appends a new SVG el. before the reference SVG el.,
   *  . appendAfter          appends a new SVG el. after the reference SVG el.,
   *  . appendHTML           appends a foreignObject to svg and selects it,
   *  . replace              replaces the current SVG element,
   *  . remove               removes the given SVG element,
   *  . removeAllChilds      removes all the childs of the selected element,
   *  . animate              sets animation transition parameters,
   *  . listen               attaches an event listener to the SVG element,
   *  . listenOnce           attaches a fired once event listener to the SVG element,
   *  . unlisten             removes an event listener to the SVG element,
   *  . alink                adds a link attribute to the SVG selected element,
   *  . attr                 adds attributes to the selected SVG element,
   *  . rmattr               removes the given attribute from the selected SVG element,
   *  . text                 adds text to the selected SVG element,
   *  . addClass             adds a class value to the selected SVG element,
   *  . removeClass          removes a class value to the selected SVG element,
   *  . toggleClass          toggles a class value to the selected SVG element,
   *
   *
   * Public Non Chaining Methods:
   *  . createEvent          returns 'animationOver' event,
   *  . query                returns the first matching element or null,
   *  . getElement           returns the selected SVG element,
   *  . getAttribute         returns the attribute value,
   *  . getComputedStyle     returns the style applied to this element,
   *  . getPropertyValue     returns the value of the specified property,
   *  . getSize              returns the width and height of this element,
   *  . getAnimationStatus   returns the animation status w.r.t. this SVG element (deprecated),
   *  . stopAnimation        sets isAnimationOn to false (deprecated),
   *  . getAttachedEvent     returns the non native event attached to this SVG element,
   *  . trigger              triggers the event attached to this SVG element,
   *  . setMessage           attachs or set a message to this SVG element,
   *  . getMessage           returns the message value attached to this SVG element,
   *
   *
   *
   * @namespace    JSVG
   * @dependencies none
   * @exports      -
   * @author       -
   * @since        0.0.0
   * @version      -
   * ************************************************************************ */
  /* eslint-disable one-var, semi-style */

  (function() {
    // IIFE

    // -- Module path


    // -- Local modules
    var StaticM = JG.Methods.Static.Public
      , Draw    = JG.Methods.Static.Draw.Public
      , Util    = JG.JSVGU.Public
      , Attr    = JG.Methods.Attr.Public
      , Text    = JG.Methods.Text.Public
      , Anim    = JG.Anim.Public
      , Event   = JG.Event.Public
      ;


    // -- Local constants
    var methods
      , previousJSVG
      ;


    // -- Local variables


    // -- Public ---------------------------------------------------------------

    /**
     * Creates and returns the object JSVG.
     * (Prototypal Instantiation Pattern)
     *
     * @constructor ()
     * @public
     * @param {arg1}          -,
     * @returns {Object}  returns the JSVG object,
     * @since 0.0.0
     */
    /* eslint-disable no-multi-spaces */
    JSVG = function(selector) {
      var obj = Object.create(methods);
      obj.browser = Util.getBrowser();   // Find type of browser (support Event or not),
      obj.id = null;                     // the id of the node surrounding the SVG node,
      obj[0] = null;                     // the selected svg element,
      obj.svgRoot = null;                // the svg root node,
      if (selector) {
        obj.id = selector.slice(1);
        Util.create(obj, obj.id);
      }

      return obj;
    };
    /* eslint-enable no-multi-spaces */

    // Saves the previous value of the library variable, so that it can be
    // restored later on, if noConflict is used.
    previousJSVG = root.JSVG;

    // Runs JSVG in noConflict mode, returning the JSVG variable to its
    // previous owner. Returns a reference to this JSVG object.
    /* istanbul ignore next */
    JSVG.noConflict = function() {
      /* eslint-disable-next-line no-param-reassign */
      root.JSVG = previousJSVG;
      return this;
    };

    // Current version of the library:
    JSVG.VERSION = '{{lib:version}}';


    // -- Public Static Methods ------------------------------------------------

    /**
     * Adds an attribute of class to the SVG element.
     *
     * @method (arg1, arg2)
     * @public
     * @param {Object}        the SVG element,
     * @param {String}        the class name,
     * @returns {}            -,
     * @since 0.0.0
     */
    JSVG.addClass = function(target, className) {
      StaticM.addClass(target, className);
    };

    /**
     * Removes an attribute of class to the SVG element.
     *
     * @method (arg1, arg2)
     * @public
     * @param {Object}        the SVG element,
     * @param {String}        the class name,
     * @returns {}            -,
     * @since 0.0.0
     */
    JSVG.removeClass = function(target, className) {
      StaticM.removeClass(target, className);
    };

    /**
     * Converts a SVG transform attributes string to an object.
     *
     * @method (arg1)
     * @public
     * @param {String}        the SVG transform atributes string,
     * @returns {Object}      returns the transform attributes,
     * @since 0.0.0
     */
    JSVG.transformAttrToObj = function(transform) {
      return StaticM.transformAttrToObj(transform);
    };

    /**
     * Converts a SVG transform attributes string to an object.
     *
     * @method (arg1)
     * @public
     * @param {String}    the SVG transform atributes string,
     * @returns {Object}  returns the transform attributes,
     * @since 0.0.0
     */
    JSVG.transformAttrToStr = function(tr) {
      return StaticM.transformAttrToStr(tr);
    };

    JSVG.draw = {

      /**
       * Draws an arc.
       *
       * The returned path has the following format:
       *   'Mx0,y0 Arx,ry 0 sweepflag x1,y1 L x1,y1 Arx,ry 0 sweepflag x0,y0 Z'
       *
       * @method (arg1, arg2, arg3, arg4)
       * @public
       * @param {Number}      start angle in radius,
       * @param {Number}      Stop angle,
       * @param {Number}      external radius,
       * @param {Number}      internal radius,
       * @returns {String}    returns the SVG path,
       * @since 0.0.0
       */
      arc: /* istanbul ignore next */ function(startAngle, stopAngle, outerRadius, innerRadius) {
        return Draw.arc(startAngle, stopAngle, outerRadius, innerRadius);
      },

      /**
       * Draws polygonal lines (deprecated, use multipolyline instead).
       *
       * The returned path has the following format:
       *   'Mx0,y0 Lx1,y1 .... Lxn,yn'
       *
       * @method (arg1, arg2)
       * @public
       * @param {Object}      a set of points (x, y) defining the polygonal line,
       * @param {Boolean}     true if it is a polygon (closed path),
       * @returns {String}    returns the SVG path,
       * @since 0.0.0
       */
      line: /* istanbul ignore next */ function(shape, closed) {
        return Draw.line(shape, closed);
      },

      /**
       * Draws a set of polylines.
       *
       * The polylines array looks like:
       *   [ [{x: n, y: n}, {}, {}, ... {}], [{...}], [{...}] ]
       * The returned path has the following format:
       *   'Mx0,y0 Lx1,y1 .... Lxn,yn Mx0,y0 ...'
       *
       * @method (arg1, arg2)
       * @public
       * @param {Object}      a set of array of points (x, y) defining
       *                      the polygonal line,
       * @param {Boolean}     true if it is a polygon (closed path),
       * @returns {String}    returns the SVG path,
       * @since 0.0.0
       */
      multipolyline: /* istanbul ignore next */ function(shape, closed) {
        return Draw.multipolyline(shape, closed);
      }
    };


    // -- Public Methods -------------------------------------------------------

    methods = {

      /**
       * Selects the given SVG Element,
       *
       * @method (arg1, arg2)
       * @public
       * @param {Object}      the SVG element to select,
       * @param {Boolean}     'true' if selected element should become the 'root',
       * @returns {Object}    returns this,
       * @since 0.0.0
       */
      select: function(element) {
        this[0] = this[0].querySelector(element);
        return this;
      },

      /**
       * Returns to parent node.
       *
       * @method ()
       * @public
       * @returns {Object}    returns this,
       * @since 0.0.0
       */
      parent: function() {
        if (this[0].parentNode) {
          this[0] = this[0].parentNode;
          return this;
        }
        /* istanbul ignore next */
        throw new Error('This SVG element has no parent!');
      },

      /**
       * Returns to the first parent node.
       *
       * @method ()
       * @public
       * @returns {Object}    returns this,
       * @since 0.0.0
       */
      firstParent: /* istanbul ignore next */ function() {
        this[0] = this.svgRoot;
        return this;
      },

      /**
       * Appends a new SVG element and selects it.
       *
       * @method (arg1)
       * @public
       * @param {Object}      the SVG element to add,
       * @returns {Object}    returns this,
       * @since 0.0.0
       */
      append: function(svgElement) {
        var el = document.createElementNS(SVG_NS, svgElement);
        this[0] = this[0].appendChild(el);
        return this;
      },

      /**
       * Appends a new SVG element before the passed-in SVG element.
       *
       * @method (arg1, arg2)
       * @public
       * @param {Object}      the SVG element to add,
       * @param {Object}      the reference SVG element,
       * @returns {Object}    returns this,
       * @since 0.0.0
       */
      appendBefore: function(newSvgElement, svgElement) {
        var newChild = document.createElementNS(SVG_NS, newSvgElement)
          , child = this[0].querySelector(svgElement)
          ;

        this[0].insertBefore(newChild, child);
        this[0] = newChild;
        return this;
      },

      /**
       * Appends a new SVG element after the passed-in SVG element.
       *
       * @method (arg1, arg2)
       * @public
       * @param {Object}      the SVG element to add,
       * @param {Object}      the reference SVG element,
       * @returns {Object}    returns this,
       * @since 0.0.0
       */
      appendAfter: function(newSvgElement, svgElement) {
        var newChild = document.createElementNS(SVG_NS, newSvgElement)
          , child = this[0].querySelector(svgElement).nextElementSibling
          ;

        this[0].insertBefore(newChild, child);
        this[0] = newChild;
        return this;
      },

      /**
       * Appends a foreignObject to svg and selects it.
       *
       * @method (arg1)
       * @public
       * @param {String}      the serialized html block,
       * @returns {Object}    returns this,
       * @since 0.0.0
       */
      appendHTML: function(xmlString) {
        var body;
        if (typeof xmlString !== 'string') return this;

        body = document.createElementNS('http://www.w3.org/1999/xhtml', 'body');
        body.innerHTML = xmlString;
        this[0] = this[0].appendChild(body);
        return this;
      },

      /**
       * Replaces the selected SVG element.
       *
       * @method (arg1)
       * @public
       * @param {Object}      the new SVG element,
       * @returns {Object}    returns this,
       * @since 0.0.0
       */
      replace: function(svgElement) {
        var el = document.createElementNS(SVG_NS, svgElement);
        this[0].parentNode.replaceChild(el, this[0]);
        this[0] = el;
        return this;
      },

      /**
       * Removes the selected SVG element.
       *
       * @method ()
       * @public
       * @param {}            -,
       * @returns {Object}    returns this,
       * @since 0.0.0
       */
      remove: function() {
        var parent;
        if (this[0]) {
          parent = this[0].parentNode;
          parent.removeChild(this[0]);
          this[0] = parent;
        }
        return this;
      },

      /**
       * Removes all the childs of the selected SVG element.
       *
       * @method ()
       * @public
       * @param {}            -,
       * @returns {Object}    returns this,
       * @since 0.0.0
       */
      removeAllChilds: function() {
        while (this[0].firstChild) {
          this[0].removeChild(this[0].firstChild);
        }
        return this;
      },

      /**
       * Associates the animation attributes to the selected SVG element.
       *
       * @method (arg1, arg2)
       * @public
       * @param {String}      the animation 'method',
       * @param {Number}      the number of frames per second,
       * @returns {Object}    returns this,
       * since 0.0.0
       */
      animate: function(easing, framesPerSecond) {
        if (typeof easing === 'function') {
          this[0].easing = easing;
        } else {
          this[0].easing = Anim.easingLinear;
        }
        this[0].frequency = (1000 / framesPerSecond) || 40;
        return this;
      },


      /**
       * Attachs a listen handler to the selected SVG element.
       *
       * @method (arg1, arg2)
       * @public
       * @param {String}      the 'event',
       * @param {Object}      the handler,
       * @returns {Object}    returns this,
       * @since 0.0.0
       */
      listen: /* istanbul ignore next */ function(event, handler) {
        if (typeof event === 'string' && typeof handler === 'function') {
          this[0].addEventListener(event, handler);
        }
        return this;
      },

      /**
       * Attachs a listen handler to the selected SVG element.
       *
       * @method (arg1, arg2)
       * @public
       * @param {String}      the 'event',
       * @param {Object}      the handler,
       * @returns {Object}    returns this,
       * @since 0.0.0
       */
      listenOnce: /* istanbul ignore next */ function(event, handler) {
        var el = this[0];
        function localHandler(e) {
          el.removeEventListener(event, localHandler);
          handler(e);
        }
        if (typeof event === 'string' && typeof handler === 'function') {
          el.addEventListener(event, localHandler);
        }
        return this;
      },

      /**
       * Remove a listen handler to the selected SVG element.
       *
       * @method (arg1, arg2)
       * @public
       * @param {String}    the 'event',
       * @param {Object}    the handler,
       * @returns {Object}  returns this,
       * @since 0.0.0
       */
      unlisten: /* istanbul ignore next */ function(event, handler) {
        if (typeof event === 'string' && typeof handler === 'function') {
          this[0].removeEventListener(event, handler);
        }
        return this;
      },

      /**
       * Adds a link attribute to the selected element,
       *
       * @method (arg1, arg2)
       * @public
       * @param {String}      the type of link attribute,
       * @param {String}      the url,
       * @returns {Object}    returns this,
       * @since 0.0.0
       */
      alink: function(attr, url) {
        this[0].setAttributeNS(XLINK_NS, 'xlink:' + attr, url);
        return this;
      },

      /**
       * Adds an attribute to the selected SVG element.
       *
       * @method (arg1, arg2)
       * @public
       * @param {String}      the name of the attribute,
       * @param {Object}      the value of the attribute or the params for the animation,
       * @returns {Object}    returns this,
       * @since 0.0.0
       */
      attr: function(attr, value) {
        if (!this[0]) {
          console.log('warning: this.svgElement is null!');
          return this;
        }
        Attr.attr(this, attr, value);
        return this;
      },

      /**
       * Removes the given attribute to the selected SVG element.
       *
       * @method (arg1)
       * @public
       * @param {String}      the attribute to remove,
       * @returns {Object}    returns this,
       * @since 0.0.0
       */
      rmattr: function(attr) {
        this[0].removeAttributeNS(null, attr);
        return this;
      },

      /**
       * Adds a text to the selected SVG element.
       *
       * @method (arg1)
       * @public
       * @param {Object}      the text or the the params for the animation,
       * @returns {Object}    returns this,
       * @since 0.0.0
       */
      text: function(value) {
        Text.text(this, value);
        return this;
      },

      /**
       * Adds a class value to the selected SVG element.
       *
       * @method (arg1)
       * @public
       * @param {String}      the value of the class attribute,
       * @returns {Object}    returns this,
       * @since 0.0.0
       */
      addClass: function(className) {
        var list = this[0].getAttributeNS(null, 'class');
        list = list ? list + ' ' + className : className;
        this[0].setAttributeNS(null, 'class', list);
        return this;
      },

      /**
       * Removes a class value from the selected SVG element.
       *
       * @method (arg1)
       * @public
       * @param {String}      the value of the class attribute,
       * @returns {Object}    returns this,
       * @since 0.0.0
       */
      removeClass: function(className) {
        var list = this[0].getAttributeNS(null, 'class');

        if (list) {
          // Remove the class and the extra leading and trailing white spaces if any:
          list = list.replace(className, '').replace(/(^\s+|\s+$)/g, '');
          this[0].setAttributeNS(null, 'class', list);
        }
        return this;
      },

      /**
       * Adds/Removes a class name to the selected SVG element.
       *
       * @method (arg1)
       * @public
       * @param {String}      the value of the class attribute,
       * @returns {Object}    returns this,
       * @since 0.0.0
       */
      toggleClass: function(className) {
        var list = this[0].getAttributeNS(null, 'class');

        if (list && list.match(className)) {
          this.removeClass(className);
          return this;
        }
        this.addClass(className);
        return this;
      },

      /**
       * Creates the event 'animationOver'.
       *
       * @method ()
       * @public
       * @param {}   -
       * @returns {Object}    returns the event object,
       * @since 0.0.0
       */
      createEvent: /* istanbul ignore next */ function() {
        return Event.create(this);
      },

      /**
       * Returns the first element that matches or null.
       *
       * @method (arg1)
       * @public
       * @param {String}      the css selector,
       * @returns {Object}    the selected SVG element or null,
       * @since 0.0.0
       */
      query: function(css) {
        return this[0].querySelector(css);
      },

      /**
       * Returns the selected SVG element.
       *
       * @method ()
       * @public
       * @param {}            -,
       * @returns {Object}    the selected SVG element,
       * @since 0.0.0
       */
      getElement: function() {
        return this[0];
      },

      /**
       * Returns the attribute of the selected SVG element.
       *
       * @method (arg1)
       * @public
       * @param {String}      the name of the attribute,
       * @returns {Object}    returns the attribute value or null,
       * @since 0.0.0
       */
      getAttribute: function(attribute) {
        return this[0] ? this[0].getAttribute(attribute) : null;
      },

      /**
       * Returns the computed style of the selected SVG element.
       *
       * @method ()
       * @public
       * @param {}   -
       * @returns {Object}    returns the object computed style,
       * @since 0.0.0
       */
      getComputedStyle: function() {
        return window.getComputedStyle(this[0]);
      },

      /**
       * Returns the property value of the style object.
       *
       * @method (arg1)
       * @public
       * @param {Object}      the style property,
       * @returns {String}    returns the style value,
       * @since 0.0.0
       */
      getPropertyValue: /* istanbul ignore next */ function(css) {
        return this.getPropertyValue(css);
      },

      /**
       * Returns the size (bounding boxes) of the selected SVG element.
       *
       * @method ()
       * @public
       * @param {}   -
       * @returns {Object}  returns the width and height of the SVG element,
       * @since 0.0.0
       */
      getSize: function() {
        return {
          width: this[0].getBoundingClientRect().width,
          height: this[0].getBoundingClientRect().height
        };
      },

      /**
       * Returns the animation status of the selected SVG element,
       * (deprecated)
       * @method ()
       * @public
       * @param {}   -
       * @returns {Boolean} returns true or false,
       * @since 0.0.0
       */
      getAnimationStatus: function() {
        return this[0].isAnimationOn;
      },

      /**
       * Set the animation status of the selected element to false.
       * (deprecated)
       * @method ()
       * @public
       * @param {}   -
       * @returns {Boolean}   returns true or false,
       * @since 0.0.0
       */
      stopAnimation: /* istanbul ignore next */ function() {
        if (this[0].isAnimationOn) {
          this[0].isAnimationOn = false;
          return true;
        }
        return false;
      },

      /**
       * Returns the event attached to the selected SVG element.
       *
       * @method ()
       * @public
       * @param {}   -
       * @returns {Object}   returns the attached event,
       * @since 0.0.0
       */
      getAttachedEvent: function() {
        return this[0].event;
      },

      /**
       * Dispatches the event.
       *
       * @method (arg1)
       * @public
       * @param {Object}      the 'event' object,
       * @returns {}          -,
       * @since 0.0.0
       */
      trigger: /* istanbul ignore next */ function(event) {
        this[0].dispatchEvent(event);
      },

      /**
       * Attachs or sets a message to this element.
       *
       * @method (arg1, arg2)
       * @public
       * @param {String}      the message name,
       * @param {Boolean}     the message value,
       * @returns {}          -,
       * @since 0.0.0
       */
      setMessage: function(msg, status) {
        var array = this[0].message
          , obj
          ;

        if (array === undefined || !array.isArray) {
          this[0].message = [];
          array = this[0].message;
        }

        if (array[0] === undefined || array[0][msg] === undefined) {
          obj = {};
          obj[msg] = status;
          array.push(obj);
        } else {
          array[0][msg] = status;
        }
        return this;
      },

      /**
       * Returns the message value,
       *
       * @method (arg1)
       * @public
       * @param {String}      the message name,
       * @returns {Boolean}   the message value,
       * @since 0.0.0
       */
      getMessage: function(msg) {
        var array = this[0].message;
        if (array === undefined || array[0] === undefined || array[0][msg] === undefined) {
          return null;
        }
        return this[0].message[0][msg];
      }
    };
  }());
  /* eslint-enable one-var, semi-style */


  // Returns the library name:
  return JSVG;
}));
