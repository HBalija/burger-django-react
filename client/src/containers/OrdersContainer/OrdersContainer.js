import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios';
import * as actions from '../../store/actions/actionIndex';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const OrdersContainer = props => {
  const { orders, loading, token, onFetchOrders } = props;

  useEffect(() => {
    onFetchOrders(token);
  }, []) // eslint-disable-line

  let jsx = <Spinner />;
  if (!loading) {
    jsx = orders.map(order => <Order key={order.id} {...order} />);
  }

  return (
    <div>
      {jsx}
    </div>
  );
};

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
