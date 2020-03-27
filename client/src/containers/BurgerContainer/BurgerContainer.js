import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-order';
import * as burgerActions from '../../store/actions/index';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class BurgerBuilder extends Component {

  state = {
    inPurchaseMode: false,
  }

  componentDidMount() {
    this.props.onIngredientsInit();
  }

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
    let burger = this.props.error ? <p>Ingrediants can't be loaded!</p> : <Spinner />;
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

    return (
      <>
        <Modal show={this.state.inPurchaseMode}  modalClosed={this.purchaseHandler}>
          <OrderSummary
            total_price={this.props.total_price}
            ingredients={this.props.ings}
            onContinue={this.purchaseContinueHandler}
            onCancel={this.purchaseHandler} />
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    total_price: state.total_price,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(burgerActions.addIngredient(ingName)),
    onIngredientRemoved: ingName => dispatch(burgerActions.removeIngredient(ingName)),
    onIngredientsInit: () => dispatch(burgerActions.fetchIngredients())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
