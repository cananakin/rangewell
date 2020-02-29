import React, { Component } from "react";
import fetch from "isomorphic-fetch";
import { Container, Row, Col, Button } from 'react-bootstrap';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Table from './components/Table'
import Modal from './components/Modal'

// Redux
import { Provider } from 'react-redux'
import { store } from './redux/store'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deals: [],
			show: false, 
			type: ''
		}
	}

	componentDidMount() {
		fetch(`http://localhost:3001/api/deals`)
			.then(response => response.json())
			.then(response => {
				this.setState({ deals: response });
			});
			console.log(store.getState());
			//store.dispatch(getDealsAction())
	}

	render() {
		const { deals, show, type } = this.state;
		
		return (
			<div className="App">
				<Provider store={store}>
					<Container>
						<Row>
							<Col sm={12} align="left"><h1>Deals</h1><hr/></Col>
							<Col sm={12} align="left">
								<Button onClick={() => this.setState({show:true, type: "add"})}>Add New Deal</Button>
								<hr/>
							</Col>
							<Col sm={12}>
								<Table mainDeals={deals} show={show} />
								<Modal type={type} show={show} onShow={(show) => this.setState({show: show})}/>
							</Col>
						</Row>
					</Container>
				</Provider>
			</div>
		);
	}
}
export default App;
