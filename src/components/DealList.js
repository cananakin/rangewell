import React from 'react';

import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

import DealItem from './DealItem';

const DealList = props => {
  const deleteData = id => {
    props.delete(id);
  };
  const editData = data => {
    props.edit(data);
  };
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Amount Required </th>
          <th>Created At</th>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {props.deals.map((deal, index) => (
          <DealItem edit={editData} delete={deleteData} key={index} {...deal} />
        ))}
      </tbody>
    </Table>
  );
};

DealList.propTypes = {
  deals: PropTypes.arrayOf(
    PropTypes.shape({
      //_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default DealList;
