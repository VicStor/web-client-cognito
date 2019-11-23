import React, { Component } from 'react';
import { PageHeader, ListGroup, Button } from 'react-bootstrap';
import { API } from 'aws-amplify';
import './Home.css';

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			testApiCall: []
		};
	}

	componentDidMount() {
		if (this.props.isAuthenticated) this.testApiCall();
	}

	testApiCall = () => {
		this.setState({ isLoading: true }, () => {
			API.get('testApiCall', '/hello')
			.then(testApiCall => {
				this.setState({ testApiCall })
			})
			.catch(e => {
				this.setState({ testApiCall: JSON.stringify(e, null, 2) })
			})
			.then(() => {
				this.setState({ isLoading: false })
			})
		})
	}

	renderTestAPI(testApiCall) {
		console.log(testApiCall);
		return testApiCall.message;
	}

	renderLander() {
		return (
			<div className="lander">
				<h1>Test web app</h1>
				<p>A simple react test app</p>
			</div>
		);
	}

	renderTest() {
		return (
			<div className="test">
				<PageHeader>Test API call</PageHeader>
				<Button variant="primary" onClick={this.testApiCall}>Make call</Button>
				<ListGroup>
					{
						this.state.isLoading
						? 'Fetching...'
						: this.renderTestAPI(this.state.testApiCall)
					}
				</ListGroup>
			</div>
		);
	}

	render() {
		return <div className="Home">{this.props.isAuthenticated ? this.renderTest() : this.renderLander()}</div>;
	}
}
