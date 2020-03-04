import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';

import { findDealId } from '../actions';

export class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let titleFilter;
    //let createdAtFilter;

    const onSubmit = e => {
      e.preventDefault();
      const filter = titleFilter.value.trim() === '' ? false : true;
      const value = { title: titleFilter.value };
      return fetch(`http://localhost:3001/api/deals?title=${value.title}`)
        .then(response => response.json())
        .then(response => {
          this.props.filterDeals(response, filter);
        })
        .catch(error => ({ error }));
    };
    return (
      <Row>
        <Col sm={12} md={5}>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search Title or Id"
                  ref={node => {
                    titleFilter = node;
                  }}
                />

                <InputGroup.Append>
                  <Button type="submit" onClick={onSubmit}>
                    Search
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  deals: state.deals
});

const mapDispatchToProps = dispatch => {
  return {
    findDealId: payload => {
      dispatch(findDealId(payload));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
