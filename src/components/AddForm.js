import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let title;
    let amountRequired;
    const onSubmit = e => {
      e.preventDefault();
      if (!title.value.trim() || !amountRequired.value.trim()) {
        return;
      }
      const value = {
        title: title.value,
        amountRequired: amountRequired.value
      };
      this.props.onSubmit(value, 'add', null);

      title.value = '';
      amountRequired.value = '';
    };
    return (
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Enter an title"
          ref={node => {
            title = node;
          }}
        />
        <Form.Control
          type="text"
          placeholder="Enter an amount required"
          ref={node => {
            amountRequired = node;
          }}
        />
        <InputGroup.Append>
          <Button type="submit" onClick={onSubmit}>
            Add Deal
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
