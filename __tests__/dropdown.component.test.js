import React from 'react';
import renderer from 'react-test-renderer';
import Dropdown from '../src/components/common/dropdown';

describe('dropdown component', () => {
  it('renders dropdown correctly', () => {
    const tree = renderer.create(<Dropdown />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
