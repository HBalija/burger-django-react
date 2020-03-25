import React, { Component } from 'react';

import axios from '../../axios-order';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class OrdersContainer extends Component {

  state = {
    loading: true,
    orders: []
  }

  componentDidMount() {
    axios.get('/orders')
      .then(response => {
        this.setState(() => ({ orders: response.data, loading: false }));
      })
      .catch(error => {
        console.log(error);  // eslint-disable-line no-console
        this.setState(() => ({ loading: false }));
      });
  }

  render() {

    let orders = <Spinner />;
    if (this.state.orders && !this.state.loading) {
      orders = this.state.orders.map(order => <Order key={order.id} {...order} />);
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}

export default withErrorHandler(OrdersContainer, axios);
