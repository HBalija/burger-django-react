import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/actionIndex';
import { checkValidity } from '../../shared/utility';

import './AuthContainer.scss';


const Auth = props => {

  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your email'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });
  const [isSignup, setIsSignup] = useState(true);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: event.target.value,
        valid: checkValidity(event.target.value, controls[controlName].validation),
        touched: true
      }
    };
    setControls(updatedControls);
  };

  const submitHandler = event => {
    event.preventDefault();

    const authData = {
      email: controls.email.value,
      password: controls.password.value
    };
    const method = isSignup ? 'signup' : 'signin';
    props.onAuth(authData, method);
    // redirect to "/" after login
    // .then(data => {
    //   if (data && data === 'SUCCESS') props.history.push('/');
    // });
  };

  const switchAuthModeHandler = () => {
    setIsSignup(prevState => !prevState);
  };

  const formElements = [];
  for (let key in controls) {
    formElements.push({
      id: key,
      config: controls[key]
    });
  }

  let form = formElements.map(formElement => (
    <Input
      invalid={!formElement.config.valid}
      touched={formElement.config.touched}
      changed={event => inputChangedHandler(event, formElement.id)}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      key={formElement.id} />
  ));
  if (props.loading) form = <Spinner />;

  let errorMessage = null;
  if (props.error) {
    const errorObj = props.error.response.data;
    errorMessage = <p>{errorObj[Object.keys(errorObj)[0]]}</p>;
  }

  let redirectTo = null;
  if (props.email) {
    // redirect to '/' on authentication
    redirectTo = '/';
    if (props.burgerBuilding) {
      // redirect to '/' on authentication while purchasing burger
      redirectTo = '/checkout';
    }
  }

  return (
    <div className="auth">
      {redirectTo && <Redirect to={redirectTo} />}

      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="success">SUBMIT</Button>
      </form>
      <Button clicked={switchAuthModeHandler} btnType="danger">
      SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}
      </Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    email: state.auth.email,
    burgerBuilding: state.burger.building
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (authData, method) => dispatch(actions.auth(authData, method))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
