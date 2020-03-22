import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';

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
    totalPrice: 4
  }

  addIngredientHandler = type => {
    const ingredients = { ...this.state.ingredients };
    ingredients[type] = this.state.ingredients[type] + 1;

    const totalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ totalPrice, ingredients });

  }

  removeIngredientHandler = type => {
    const ingredients = { ...this.state.ingredients };
    if (ingredients[type] > 0) {
      ingredients[type] = this.state.ingredients[type] - 1;

      const totalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
      this.setState({ totalPrice, ingredients });
    }
  }

  render() {
    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          totalPrice={this.state.totalPrice}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          // will use boolean value to check if "less" button should be disabled
          ingredients={this.state.ingredients} />
      </>
    );
  }
}
