
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ShallowRenderer from 'react-test-renderer/shallow';
import Enzyme from 'enzyme';
import React from 'react';
import ReportingBar from '../Reports/ReportsList';
// This sets up the adapter to be used by Enzyme
Enzyme.configure({ adapter: new EnzymeAdapter() });

// Test Reports Component Render
// It should render an unordered list with the given data drray
it('it should render ReportingBar component', async () => {
  const renderer = new ShallowRenderer();
  renderer.render(<ReportingBar />);
  const tree = renderer.getRenderOutput();
  expect(tree).toMatchSnapshot();
});
