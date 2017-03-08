import React from 'react';

class BaseComponent extends React.Component {

  //source: http://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes
  //TODO: add more functionality to this base component

  _bind(...methods) {
    methods.forEach( (method) => this[method] = this[method].bind(this) );
  }

  constructor(props, context) {
    super(props);
  }
}

export default BaseComponent;
