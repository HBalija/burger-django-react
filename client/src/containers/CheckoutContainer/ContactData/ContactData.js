import React, { Component } from 'react';

import axios from '../../../axios-order';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import './ContactData.scss';


class ContactData extends Component {
  state = {
    name: '',
    email: '',
    order_address: 'Some address',
    loading: false
  }

  orderHandler = event => {
    event.preventDefault();

    this.setState({ loading: true });

    const order = {
      ...this.props.ingredients,
      price: this.props.price.toFixed(1),
      order_address: this.state.order_address
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

  render () {
    let form = (
      <form>
        <input type="text" name="name" placeholder="Your name" />
        <input type="text" name="email" placeholder="Your email" />
        <input type="text" name="order_address" placeholder="Your address" />
        <Button btnType="success" clicked={this.orderHandler}>ORDER</Button>
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
