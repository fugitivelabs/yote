/**
 * This is a helper class that extends the base React.Component with some
 * boilerplate reduction. For example, it auto-binds each method passed into the
 * construcer via this._bind();
 *
 * So, instead of writing this:
 *
 * class MyComponent extends React.Component {
 *   constructor(props) {
 *     super(props);
 *     this._openThing = this._openThing.bind(this);
 *     this._closeThing = this._closeThing.bind(this);
 *   }
 * }
 *
 *
 * We write:
 *
 * class MyComponent extends Binder {
 *   constructor(props) {
 *     super(props);
 *     this._bind('_openThing', '_closeThing'); // auto-bind these methods
 *   }
 * }
 *
 * source: http://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes
 *
 * TODO: add more functionality to this base component
 */

import React from 'react';

class Binder extends React.Component {

  // auto-bind all methods passed into this._bind()
  _bind(...methods) {
    methods.forEach( (method) => this[method] = this[method].bind(this) );
  }

  constructor(props, context) {
    super(props);
  }
}

export default Binder;
