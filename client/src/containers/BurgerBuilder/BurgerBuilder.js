import React, { Component } from 'react';

import BuildControls from '../../components/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

export default class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    inPurchaseMode: false
  }

  purchaseHandler = () => {
    this.setState(prevState => ({ inPurchaseMode: !prevState.inPurchaseMode }));
  }

  updatePurchaseState = ingredients => {
    // return true or false depending if ingredients have been added
    let sum = 0;
    for (let property in ingredients) {
      sum += ingredients[property];
    }
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = type => {
    const ingredients = { ...this.state.ingredients };
    ingredients[type] = this.state.ingredients[type] + 1;

    const totalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ totalPrice, ingredients });
    this.updatePurchaseState(ingredients);
  }

  removeIngredientHandler = type => {
    const ingredients = { ...this.state.ingredients };
    if (ingredients[type] > 0) {
      ingredients[type] = this.state.ingredients[type] - 1;

      const totalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
      this.setState({ totalPrice, ingredients });
      this.updatePurchaseState(ingredients);
    }
  }

  render() {
    return (
      <>
        <Modal show={this.state.inPurchaseMode}  exitPurchaseMode={this.purchaseHandler}>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          handlePurchase={this.purchaseHandler}
          totalPrice={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          // will use boolean value to check if "less" button should be disabled
          ingredients={this.state.ingredients} />
      </>
    );
  }
}
