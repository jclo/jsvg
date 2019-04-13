/* eslint */

'use strict';

module.exports = {
  dist: './_dist',
  libdir: './lib',
  libname: 'JSVG',
  parent: 'this',
  noparent: '-noparent',
  index: './index.js',
  // These are the Javascript files required to build the library.
  src: [
    './src/_header',
    './src/tree.js',
    './src/private/animation.js',
    './src/private/attributes.js',
    './src/private/draw.js',
    './src/private/event.js',
    './src/private/jsvgu.js',
    './src/private/staticmethods.js',
    './src/private/text.js',
    './src/jsvg.js',
    './src/_footer',
  ],
  license: ['/*! ****************************************************************************',
    ' * {{lib:name}} v{{lib:version}}',
    ' *',
    ' * {{lib:description}}.',
    ' * (you can download it from npm or github repositories)',
    ' * Copyright (c) 2019 {{lib:author}} <{{lib:email}}> ({{lib:url}}).',
    ' * Released under the MIT license. You may obtain a copy of the License',
    ' * at: http://www.opensource.org/licenses/mit-license.php).',
    ' * ************************************************************************** */',
    ''].join('\n'),
};
