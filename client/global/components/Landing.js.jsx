import React from 'react';
import Base from './BaseComponent.js.jsx';
import { Router, Route, Link } from 'react-router';

export default class Landing extends Base {
  constructor(props, context) {
    super(props);
  }

  render() {
    return(
      <h1> Welcome to Yote! </h1>
    )
  }

}
