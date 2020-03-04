import React from 'react';
import { connect } from 'react-redux';
import { addDealAction, editDealAction } from '../actions';

import Form from 'react-bootstrap/Form';

import AddForm from './AddForm';
import EditForm from './EditForm';

let DealForm = props => {
  const onSubmitForm = (value, type, id) => {
    type === 'add'
      ? props.dispatch(addDealAction(value))
      : props.dispatch(editDealAction(value, id));
    if (type === 'edit') {
      onCloseEdit();
    }
  };
  const onCloseEdit = () => {
    props.editFormClose();
  };
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        {props.editForm ? (
          <EditForm
            id={props.deal._id}
            deal={props.deal}
            onSubmit={onSubmitForm}
            onClose={onCloseEdit}
          />
        ) : (
          <AddForm onSubmit={onSubmitForm} />
        )}
      </Form.Group>
    </Form>
  );
};
DealForm = connect()(DealForm);

export default DealForm;
