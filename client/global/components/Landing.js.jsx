import React from 'react';
import { Router, Route, Link } from 'react-router';

export default class Landing extends React.Component{
  constructor(props, context) {
    super(props);
  }

  render() {
    return(
      <h1> Welcome to Yote! </h1>
    )
  }

}
