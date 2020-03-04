import React, { Component } from 'react';
import { connect } from 'react-redux';
import DealList from '../components/DealList';
import { deleteDealAction } from '../actions';
import Filter from '../components/Filter';

export class DealListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deals: [],
      filter: false
    };
  }

  render() {
    const deleteData = id => {
      this.props.deleteDealAction(id);
    };
    const editData = data => {
      this.props.edit(data);
    };
    const filterData = (deals, filter) => {
      if (filter) {
        this.setState({
          filter: true,
          deals: deals
        });
      } else {
        this.setState({
          filter: false,
          deals: []
        });
      }
    };
    return (
      <div>
        <Filter filterDeals={filterData} />
        <DealList
          edit={editData}
          delete={deleteData}
          deals={this.state.filter ? this.state.deals : this.props.deals}
        />
      </div>
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
