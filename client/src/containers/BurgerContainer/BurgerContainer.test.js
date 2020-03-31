import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerContainer';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onIngredientsInit={() => {}} />);
  });

  it('should not render <BuildControls /> without ings prop', () => {
    expect(wrapper.find(BuildControls)).toHaveLength(0);
  });

  it('should render <BuildControls /> when receiving ingredients', () => {
    wrapper.setProps({ ings: { salad: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
