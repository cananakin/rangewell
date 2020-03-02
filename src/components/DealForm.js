import React from 'react';
import { connect } from 'react-redux';
import { addDealAction } from '../actions';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

let DealForm = ({ editForm, deal, dispatch }) => {
  let title;
  let amountRequired;
  console.log(deal);
  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        if (!title.value.trim() || !amountRequired.value.trim()) {
          return;
        }
        const value = {
          title: title.value,
          amountRequired: amountRequired.value
        };
        dispatch(addDealAction(value));
        title.value = '';
        amountRequired.value = '';
      }}
    >
      <Form.Group controlId="formBasicEmail">
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
            <Button type="submit">Add Deal</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>
    </Form>
  );
};
DealForm = connect()(DealForm);

export default DealForm;
