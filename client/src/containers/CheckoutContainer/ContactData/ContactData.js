import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/actionIndex';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import './ContactData.scss';


class ContactData extends Component {

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      order_address: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      delivery_method: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ],
        },
        value: 'fastest',
        valid: true, // add valid and validation to simplfify validation checks
        validation: {} // empty object and true pass all validations
      }
    },
    formIsValid: false
  }

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) isValid = value.trim() !== '' && isValid;
    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    // create deep copies of nested objects (we need to access value property)
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

    updatedFormElement.value = event.target.value;

    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value, updatedFormElement.validation);

    updatedOrderForm[inputIdentifier] = updatedFormElement;

    // check if whole form is valid
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState(() => ({ orderForm: updatedOrderForm, formIsValid }));
  }

  orderHandler = event => {
    event.preventDefault();

    const order = {
      ...this.props.ings,
      price: this.props.price.toFixed(1),
      order_address: this.state.orderForm.order_address.value,
      delivery_method: this.state.orderForm.delivery_method.value
    };
    this.props.onOrderBurger(order)
      .then(() => {
        this.props.history.push('/');
      });
  }

  render () {
    const formElements = [];
    for (let key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements.map(formElement => (
          <Input
            // check if input is valid
            invalid={!formElement.config.valid}
            // check if user touched input (apply invalid classes only if did)
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value} />
        ))}
        <Button disabled={!this.state.formIsValid} btnType="success">ORDER</Button>
      </form>
    );
    if (this.props.loading) form = <Spinner />;

    return (
      <div className="contact-data">
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burger.ingredients,
    price: state.burger.total_price,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: orderData => dispatch(actions.purchaseBurger(orderData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
