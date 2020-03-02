import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import { findDealId } from '../actions';

export class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    let titleFilter;
    //let createdAtFilter;

    const onSubmit = e => {
      e.preventDefault();
      console.log(titleFilter.value.trim());
      const filter = titleFilter.value.trim() === '' ? false : true;
      const value = { title: titleFilter.value };
      return fetch(`http://localhost:3001/api/deals?title=${value.title}`)
        .then(response => response.json())
        .then(response => {
          this.props.filterDeals(response, filter);
        })
        .catch(error => ({ error }));

      //this.props.findDealId(value)

      //this.props.onSubmit(value, 'add',null)
    };
    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Title"
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
