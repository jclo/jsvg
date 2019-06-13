# Getting Started

## Quick Startup

You can create an SVG node inside a `div` by typing:

```javascript
// JSVG is built upon the prototypal pattern, you don't need the operator 'new'.
var svg = JSVG('#svg');
```

If you have a look to the DOM, you will see:

```html
<div id="svg">
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>
</div>
```

Then, you can fill your `SVG` node:

```Javascript
var svg = JSVG('#svg');

// Append a rectangle:
svg
  .append('rect')
  .attr('x', 100)
  .attr('y', 100)
  .attr('width', 100)
  .attr('height', 100)
;
```

You get:

```html
<div id="svg">
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <rect x="100" y="100" width="100" height="100"></rect>
  </svg>
</div>
```


## API

## Static methods

JSVG provides a set of static methods. You can use by typing:

```javascript
JSVG.noConflict();
```

| Static Methods       | Description |
|:---------------------|:------------|
| noConflict           | returns the JSVG variable to its previous owner |
| addClass             | adds an attribute of class to the SVG element |
| removeClass          | removes an attribute of class to the SVG element |
| transformAttrToObj   | converts an SVG transform attributes string to an object |
| transformAttrToStr   | converts an SVG transform attributes string to an object |
| draw.arc             | draws an arc |
| draw.line            | draws polygonal lines (deprecated) |
| draw.multipolyline   | draws a set of polylines |



## Create an SVG object:

| Constructor | Description |
|:------------|:------------|
| JSVG('#id') | creates the SVG object and insert an SVG node inside a DIV |


## Chaining Methods

| Chaining Methods  | Description |
|:------------------|:------------|
| select            | selects an SVG element |
| parent            | moves to parent SVG element |
| firstParent       | moves to the first parent |
| append            | appends an SVG element and selects it |
| appendBefore      | appends an SVG element before the reference SVG element and selects it |
| appendAfter       | appends an SVG element after the reference SVG element and selects it |
| appendHTML        | appends a foreignObject to svg and selects it |
| replace           | replaces the current SVG element |
| remove            | removes the given SVG element |
| removeAllChilds   | removes all the children of the selected element |
| animate           | sets animation transition parameters |
| listen            | attaches an event listener to the SVG element |
| listenOnce        | attaches a fired once event listener to the SVG element |
| unlisten          | removes an event listener to the SVG element |
| alink             | adds a link attribute to the SVG selected element |
| attr              | adds attributes to the selected SVG element |
| rmattr            | removes the given attribute from the selected SVG element |
| text              | adds text to the selected SVG element |
| addClass          | adds a class value to the selected SVG element |
| removeClass       | removes a class value to the selected SVG element |
| toggleClass       | toggles a class value to the selected SVG element |

*chaining methods return **this***.


## Non Chaining Methods

| Non Chaining Methods  | Description |
|:----------------------|:------------|
|  createEvent          | returns 'animationOver' event |
|  query                | returns the first matching element or null |
|  getElement           | returns the selected SVG element |
|  getAttribute         | returns the attribute value |
|  getComputedStyle     | returns the style applied to this element |
|  getPropertyValue     | returns the value of the specified property |
|  getSize              | returns the width and height of this element |
|  getAnimationStatus   | returns the animation status w.r.t. this SVG element (deprecated) |
|  stopAnimation        | sets isAnimationOn to false (deprecated) |
|  getAttachedEvent     | returns the non native event attached to this SVG element |
|  trigger              | triggers the event attached to this SVG element |
|  setMessage           | attaches or set a message to this SVG element |
|  getMessage           | returns the message value attached to this SVG element |


## License

MIT.
