import React, { Component } from 'react';

import axios from '../../../axios-order';
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
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: ''
      },
      order_address: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your address'
        },
        value: ''
      },
      delivery_method: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ],
        },
        value: 'fastest'
      }
    },

    loading: false
  }

  orderHandler = event => {
    event.preventDefault();

    this.setState({ loading: true });

    const order = {
      ...this.props.ingredients,
      price: this.props.price.toFixed(1),
      order_address: this.state.orderForm.order_address.value,
      delivery_method: this.state.orderForm.delivery_method.value
    };

    axios.post('/orders/', order)
      .then(response => {
        console.log(response); // eslint-disable-line no-console
        this.setState({ loading:false });
        this.props.history.push('/'); // redirect after sending request
      })
      .catch(error => {
        console.log(error); // eslint-disable-line no-console
        this.setState({ loading:false });
      });
  }

  inputChangedHandler = (event, inputIdentifier) => {
    // create deep copies of nested objects (we need to access value property)
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    this.setState(() => ({ orderForm: updatedOrderForm }));
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
            changed={event => this.inputChangedHandler(event, formElement.id)}
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value} />
        ))}
        <Button btnType="success">ORDER</Button>
      </form>
    );
    if (this.state.loading) form = <Spinner />;

    return (
      <div className="contact-data">
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
