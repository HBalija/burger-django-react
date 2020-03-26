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


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {

  state = {
    total_price: 4,
    purchasable: false,
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

  updatePurchaseState = ingredients => {
    // return true or false depending if ingredients have been added
    let sum = 0;
    for (let property in ingredients) {
      sum += ingredients[property];
    }
    this.setState({ purchasable: sum > 0 });
  }

  // addIngredientHandler = type => {
  //   const ingredients = { ...this.props.ings };
  //   ingredients[type] = this.props.ings[type] + 1;

  //   const total_price = this.state.total_price + INGREDIENT_PRICES[type];
  //   this.setState({ total_price, ingredients });
  //   this.updatePurchaseState(ingredients);
  // }

  // removeIngredientHandler = type => {
  //   const ingredients = { ...this.props.ings };
  //   if (ingredients[type] > 0) {
  //     ingredients[type] = this.props.ings[type] - 1;

  //     const total_price = this.state.total_price - INGREDIENT_PRICES[type];
  //     this.setState({ total_price, ingredients });
  //     this.updatePurchaseState(ingredients);
  //   }
  // }

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.props.ings) {
      queryParams.push(
        encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i])
      );
    }
    queryParams.push(`price=${this.state.total_price}`);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`
    });
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
            total_price={this.state.total_price}
            purchasable={this.state.purchasable}
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
        total_price={this.state.total_price}
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
    ings: state.ingredients
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch({ type: actionTypes.ADD_INGREDIENT, ingName }),
    onIngredientRemoved: ingName => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingName })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
