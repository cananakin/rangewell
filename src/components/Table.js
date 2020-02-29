import React, { Component } from 'react'

import { Table, Button } from 'react-bootstrap';

import { connect } from "react-redux";
import { getDealsAction } from '../redux/actions'

class TableDeal extends Component {
    render() {
        const deals = this.props.deals.lenght > 0 ? this.props.deals : this.props.mainDeals;
        const list = deals.map(deal => <tr key={deal._id}> 
			<td>{deal._id}</td>  
			<td>{deal.title}</td> 
			<td>{deal.amountRequired}</td>
			<td>{deal.createdAt}</td>
			<td><Button variant="link" onClick={() => this.setState({show:true, type: "edit"})}>Edit</Button></td>
		</tr>);

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
                    {list}
                </tbody>
            </Table>
        )
    }
}
const mapStateToProps = state => {
    console.log(state)
    console.log(this)
    return { deals : state.deals  };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getDealsAction: () => { dispatch(getDealsAction()) },
    }
}
const TableDealData = connect(mapStateToProps,mapDispatchToProps)(TableDeal);

export default TableDealData;
