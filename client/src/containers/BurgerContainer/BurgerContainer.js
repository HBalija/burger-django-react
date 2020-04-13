import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from '../../axios';
import * as actions from '../../store/actions/actionIndex';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


export const BurgerBuilder = props => {

  const [inPurchaseMode, setInPurchaseMode] = useState(false);

  const dispatch = useDispatch();
  const onIngredientAdded = ingName => dispatch(actions.addIngredient(ingName));
  const onIngredientRemoved = ingName => dispatch(actions.removeIngredient(ingName));
  const onIngredientsInit = useCallback(() => dispatch(actions.fetchIngredients()), [dispatch]);

  const ings = useSelector(state => state.burger.ingredients);
  const total_price = useSelector(state => state.burger.total_price);
  const error = useSelector(state => state.burger.error);
  const email = useSelector(state => state.auth.email);

  useEffect(() => {
    onIngredientsInit();
  }, [onIngredientsInit]);

  const purchaseHandler = () => {
    if (email) {
      setInPurchaseMode(prevState => !prevState);
    } else {
      props.history.push('/auth');
    }
  };

  const updatePurchaseState = () => {
    // return true or false depending if ingredients have been added
    let sum = 0;
    for (let property in ings) {
      sum += ings[property];
    }
    return sum > 0;
  };

  const purchaseContinueHandler = () => {
    props.history.push('/checkout');
  };

  // use spinner while fetching ingredients
  let burger = error ? <p>Ingrediants can't be loaded!</p> : <Spinner />;
  if (ings) {
    burger = (
      <>
        <Burger ingredients={ings} />
        <BuildControls
          handlePurchase={purchaseHandler}
          total_price={total_price}
          purchasable={updatePurchaseState()}
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          // will use boolean value to check if "less" button should be disabled
          ingredients={ings}
          // check if user is authenticated
          isAuth={email !== null} />
      </>
    );
  }

  return (
    <>
      <Modal show={inPurchaseMode} modalClosed={purchaseHandler}>
        <OrderSummary
          total_price={total_price}
          ingredients={ings}
          onContinue={purchaseContinueHandler}
          onCancel={purchaseHandler} />
      </Modal>
      {burger}
    </>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
