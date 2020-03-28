import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/actionIndex';

import './AuthContainer.scss';


class Auth extends Component {
  state = {
    controls: {
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
    },
    isSignup: true
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };
    this.setState(() => ({ controls: updatedControls }));
  }

  checkValidity ( value, rules ) {
    let isValid = true;

    if (!rules) return true;

    if (rules.required) isValid = value.trim() !== '' && isValid;

    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;

    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; // eslint-disable-line max-len
      isValid = pattern.test( value ) && isValid;
    }

    if ( rules.isNumeric ) {
      const pattern = /^\d+$/;
      isValid = pattern.test( value ) && isValid;
    }
    return isValid;
  }

  submitHandler = event => {
    event.preventDefault();

    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    const method = this.state.isSignup ? 'signup' : 'signin';
    this.props.onAuth(authData, method)
      .then(() => this.props.history.push('/'));
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => ({ isSignup: !prevState.isSignup }));
  }

  render() {

    const formElements = [];
    for (let key in this.state.controls) {
      formElements.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    const form = formElements.map(formElement => (
      <Input
        invalid={!formElement.config.valid}
        touched={formElement.config.touched}
        changed={event => this.inputChangedHandler(event, formElement.id)}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        key={formElement.id} />
    ));

    return (
      <div className="auth">
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="success">SUBMIT</Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="danger">
          SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (authData, method) => dispatch(actions.Auth(authData, method))
  };
};

export default connect(null, mapDispatchToProps)(Auth);
