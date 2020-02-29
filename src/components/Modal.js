import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import { Button, Modal, Form, Alert } from 'react-bootstrap'

import { connect } from 'react-redux';
import { addDealAction, editDealAction } from '../redux/actions'


class ModalDeal extends Component {
    
    constructor(props) {
		super(props);
		this.state = {
			type: '',
            title: '',
            amountRequired: '',
            alert: {
                show: false,
                type: '',
                message: ''
            }
		}
    }
    
    saveAndUpdateDealData = (type) => {
        if(this.state.title === '' || this.state.amountRequired === ''){
            this.setState({
                alert:{
                    show: true,
                    type: 'danger',
                    message: 'You must required'
                }
            });
            return false; 
        }
        if(type === 'add'){
            this.props.addDealAction({title: this.state.title, amountRequired: this.state.amountRequired })
        }else{
            this.props.editDealAction({title: this.state.title, amountRequired: this.state.amountRequired })
        }
        this.setState({
            alert:{
                show: true,
                type: 'success',
                message: 'Data added!'
            },
			type: '',
            title: '',
            amountRequired: ''
        });
        this.props.onShow(false);
        console.log(this.state);
	} 

    render() {
        const { show, type } = this.props;
        const { title, amountRequired, alert } = this.state;
        return (
            
            <Modal
                show={show}
                onHide={() => this.props.onShow(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        { type === 'add' ? 'Add New Deal' : ' Edit Deal'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        alert.show ?
                            <Alert variant={alert.type}>
                                {alert.message}
                            </Alert>
                            :
                            null
                    }
                    
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={title} onChange={(e) => {this.setState({title:e.target.value})}} />
                        </Form.Group>
                        
                        <Form.Group controlId="exampleForm.ControlInput2">
                            <Form.Label>Amount Required</Form.Label>
                            <Form.Control type="text" value={amountRequired} onChange={(e) => {this.setState({amountRequired:e.target.value})}} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.props.onShow(false)}>Close</Button>
                    <Button variant="primary" onClick={this.saveAndUpdateDealData.bind(this,type)}>{ type === 'add' ? 'Save' : 'Update'}</Button>
                </Modal.Footer>
            </Modal>
        
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    return { message: state.message, };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addDealAction: (model) => { dispatch(addDealAction(model)) },
        editDealAction: (model,id) => { dispatch(editDealAction(model,id)) },
    }
}
const ModalDealData = connect(mapStateToProps,mapDispatchToProps)(ModalDeal);

export default ModalDealData
