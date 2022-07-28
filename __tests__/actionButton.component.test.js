import React from 'react';
import renderer from 'react-test-renderer';
import ActionButton from '../src/components/common/actionButton';

describe('ActionButton component', () => {
  it('renders ActionButton correctly', () => {
    const tree = renderer.create(<ActionButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
