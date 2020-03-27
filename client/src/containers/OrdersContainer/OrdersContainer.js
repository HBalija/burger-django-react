import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-order';
import * as actions from '../../store/actions/index';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class OrdersContainer extends Component {

  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {

    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => <Order key={order.id} {...order} />);
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch =>{
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(OrdersContainer, axios));
