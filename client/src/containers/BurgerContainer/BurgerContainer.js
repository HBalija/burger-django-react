import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-order';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {

  state = {
    inPurchaseMode: false,
    loading: false,
    error: false
  }

  // componentDidMount() {
  //   axios.get('/ingredients/')
  //     .then(response => {
  //       this.setState({ ingredients: response.data });
  //     }).catch(error => {
  //       console.log(error); // eslint-disable-line no-console
  //       this.setState({ error: true });
  //     });
  // }

  purchaseHandler = () => {
    this.setState(prevState => ({ inPurchaseMode: !prevState.inPurchaseMode }));
  }

  updatePurchaseState = () => {
    // return true or false depending if ingredients have been added
    let sum = 0;
    for (let property in this.props.ings) {
      sum += this.props.ings[property];
    }
    return sum > 0;
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  }

  render() {
    // use spinner while fetching ingredients
    let burger = this.state.error ? <p>Ingrediants can't be loaded!</p> : <Spinner />;
    if (this.props.ings) {
      burger = (
        <>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            handlePurchase={this.purchaseHandler}
            total_price={this.props.total_price}
            purchasable={this.updatePurchaseState()}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            // will use boolean value to check if "less" button should be disabled
            ingredients={this.props.ings} />
        </>
      );
    }

    // use spinner if loading on post request
    let orderSummary = (
      <OrderSummary
        total_price={this.props.total_price}
        ingredients={this.props.ings}
        onContinue={this.purchaseContinueHandler}
        onCancel={this.purchaseHandler} />
    );
    if (this.state.loading) orderSummary = <Spinner />;

    return (
      <>
        <Modal show={this.state.inPurchaseMode}  modalClosed={this.purchaseHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    total_price: state.total_price
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch({ type: actionTypes.ADD_INGREDIENT, ingName }),
    onIngredientRemoved: ingName => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingName })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
