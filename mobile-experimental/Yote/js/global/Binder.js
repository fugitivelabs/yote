import React from 'react';

class Binder extends React.Component {

  //source: http://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes
  //todo: add more functionality to this base component

  _bind(...methods) {
    methods.forEach( (method) => this[method] = this[method].bind(this) );
  }

  constructor(props, context) {
    super(props);
  }
}

export default Binder;
