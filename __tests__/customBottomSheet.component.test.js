import React from 'react';
import renderer from 'react-test-renderer';
import ActionButton from '../src/components/common/actionButton';

describe('Custom bottom sheet component', () => {
  it('renders Custom bottom sheet correctly', () => {
    const tree = renderer.create(<ActionButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
