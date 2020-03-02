import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const DealItem = (props, { _id, title, amountRequired, createdAt }) => (
  <tr>
    <td>{props._id}</td>
    <td>{props.title}</td>
    <td>{props.amountRequired}</td>
    <td>{props.createdAt}</td>
    <td>
      <Button
        variant="link"
        onClick={() => {
          props.edit(props);
        }}
      >
        Edit
      </Button>
      <Button
        variant="link"
        onClick={() => {
          props.delete(props._id);
        }}
      >
        Delete
      </Button>
    </td>
  </tr>
);

DealItem.propTypes = {
  title: PropTypes.string.isRequired
};

export default DealItem;
