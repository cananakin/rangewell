import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import DealListContainer from './containers/DealListContainer';
import DealStatsContainer from './containers/DealStatsContainer';
import DealForm from './components/DealForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formEdit: false,
      deal: null
    };
  }

  render() {
    const editData = data => {
      console.log(data);
      this.setState({
        formEdit: true,
        deal: data
      });
    };
    return (
      <Container>
        <Row>
          <Col sm={12} align="left">
            <h1>Deals</h1> <DealStatsContainer />
            <hr />
          </Col>

          <Col sm={12}>
            <DealForm formEdit={this.state.formEdit} deal={this.state.deal} />
            <DealListContainer edit={editData} />
          </Col>
        </Row>
      </Container>
    );
  }
}
export default App;
