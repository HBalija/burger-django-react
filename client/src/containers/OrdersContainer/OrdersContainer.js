import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios';
import * as actions from '../../store/actions/actionIndex';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class OrdersContainer extends Component {

  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
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
    loading: state.order.loading,
    token: state.auth.accessToken
  };
};

const mapDispatchToProps = dispatch =>{
  return {
    onFetchOrders: token => dispatch(actions.fetchOrders(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(OrdersContainer, axios));
