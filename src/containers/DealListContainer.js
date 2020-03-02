import React, { Component } from 'react';
import { connect } from 'react-redux';
import DealList from '../components/DealList';
import { deleteDealAction } from '../actions';

export class DealListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const deleteData = id => {
      this.props.deleteDealAction(id);
    };
    const editData = data => {
      this.props.edit(data);
    };
    return (
      <DealList edit={editData} delete={deleteData} deals={this.props.deals} />
    );
  }
}

const mapStateToProps = state => ({
  deals: state.deals
});

const mapDispatchToProps = dispatch => {
  return {
    deleteDealAction: id => {
      dispatch(deleteDealAction(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DealListContainer);
