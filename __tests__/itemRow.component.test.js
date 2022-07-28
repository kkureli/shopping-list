import React from 'react';
import renderer from 'react-test-renderer';
import ItemRow from '../src/components/newItem/itemRow';

describe('itemRow component', () => {
  it('renders itemRow correctly', () => {
    const tree = renderer
      .create(
        <ItemRow
          item={{
            status: '',
          }}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
