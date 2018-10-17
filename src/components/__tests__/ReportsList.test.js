
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ShallowRenderer from 'react-test-renderer/shallow';
import Enzyme from 'enzyme';
import React from 'react';
import ReportsList from '../Reports/ReportsList';
import { fetchReportsData } from '../../__mocks__/__mockData__';
// This sets up the adapter to be used by Enzyme
Enzyme.configure({ adapter: new EnzymeAdapter() });

// Test Reports Component Render
// It should render an unordered list with the given data drray
it('renders reports list correctly', async () => {
  const renderer = new ShallowRenderer();
  renderer.render(<ReportsList data={fetchReportsData} />);
  const tree = renderer.getRenderOutput();
  expect(tree).toMatchSnapshot();
});
