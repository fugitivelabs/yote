import React from 'react';
import { Router, Route, Link } from 'react-router';

class Landing extends React.Component{
	constructor(props, context) {
		super(props);
	}

	render() {
		return(
			<h1> Welcome to Yote! </h1>
		)
	}

}

export default Landing;