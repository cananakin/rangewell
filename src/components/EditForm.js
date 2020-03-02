import React, { Component } from 'react';
//import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.deal.title,
      amountRequired: props.deal.amountRequired
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.id !== nextProps.id) {
      this.onChangeDeal(nextProps.deal);
      return true;
    }
    return false;
  }

  onChangeDeal = deal => {
    this.setState({
      title: deal.title,
      amountRequired: deal.amountRequired
    });
  };

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
      this.props.onSubmit(value, 'edit', this.props.deal._id);

      title.value = '';
      amountRequired.value = '';
      this.setState({
        title: '',
        amountRequired: ''
      });
    };

    const onClose = e => {
      e.preventDefault();
      this.props.onClose();
      title.value = '';
      amountRequired.value = '';
      this.setState({
        title: '',
        amountRequired: ''
      });
    };

    const onChangeTitle = e => {
      this.setState({ title: e.target.value });
    };

    const onChangeAmountRequired = e => {
      this.setState({ amountRequired: e.target.value });
    };

    return (
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Enter an title"
          value={this.state.title}
          onChange={onChangeTitle}
          ref={node => {
            title = node;
          }}
        />
        <Form.Control
          type="text"
          placeholder="Enter an amount required"
          value={this.state.amountRequired}
          onChange={onChangeAmountRequired}
          ref={node => {
            amountRequired = node;
          }}
        />
        <InputGroup.Append>
          <Button type="submit" onClick={onSubmit}>
            Update
          </Button>
          <Button variant="dark" onClick={onClose}>
            X
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
