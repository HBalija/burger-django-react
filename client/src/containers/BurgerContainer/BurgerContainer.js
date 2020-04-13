import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios';
import * as actions from '../../store/actions/actionIndex';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


export const BurgerBuilder = props => {
  const { onIngredientsInit } = props;

  const [inPurchaseMode, setInPurchaseMode] = useState(false);

  useEffect(() => {
    onIngredientsInit();
  }, [onIngredientsInit]);

  const purchaseHandler = () => {
    if (props.email) {
      setInPurchaseMode(prevState => !prevState);
    } else {
      props.history.push('/auth');
    }
  };

  const updatePurchaseState = () => {
    // return true or false depending if ingredients have been added
    let sum = 0;
    for (let property in props.ings) {
      sum += props.ings[property];
    }
    return sum > 0;
  };

  const purchaseContinueHandler = () => {
    props.history.push('/checkout');
  };

  // use spinner while fetching ingredients
  let burger = props.error ? <p>Ingrediants can't be loaded!</p> : <Spinner />;
  if (props.ings) {
    burger = (
      <>
        <Burger ingredients={props.ings} />
        <BuildControls
          handlePurchase={purchaseHandler}
          total_price={props.total_price}
          purchasable={updatePurchaseState()}
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          // will use boolean value to check if "less" button should be disabled
          ingredients={props.ings}
          // check if user is authenticated
          isAuth={props.email !== null} />
      </>
    );
  }

  return (
    <>
      <Modal show={inPurchaseMode} modalClosed={purchaseHandler}>
        <OrderSummary
          total_price={props.total_price}
          ingredients={props.ings}
          onContinue={purchaseContinueHandler}
          onCancel={purchaseHandler} />
      </Modal>
      {burger}
    </>
  );
};

const mapStateToProps = state => {
  return {
    ings: state.burger.ingredients,
    total_price: state.burger.total_price,
    error: state.burger.error,
    email: state.auth.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
    onIngredientsInit: () => dispatch(actions.fetchIngredients())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
