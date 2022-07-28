import React from 'react';
import renderer from 'react-test-renderer';
import Footer from '../src/components/common/footer';

describe('footer component', () => {
  it('renders footer correctly', () => {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
