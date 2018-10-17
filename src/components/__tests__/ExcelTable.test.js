import EnzymeAdapter from 'enzyme-adapter-react-16';
import ShallowRenderer from 'react-test-renderer/shallow';
import Enzyme from 'enzyme';
import React from 'react';
import ExcelTable from '../ExcelTable/ExcelTable';
import { excelTableData } from '../../__mocks__/__mockData__';
// This sets up the adapter to be used by Enzyme
Enzyme.configure({ adapter: new EnzymeAdapter() });

// Test Reports Component Render
// It should render an unordered list with the given data drray
it('renders reports list correctly', async () => {
  const renderer = new ShallowRenderer();
  renderer.render(<ExcelTable data={excelTableData['headers']} cols={excelTableData['data']} />);
  const tree = renderer.getRenderOutput();
  expect(tree).toMatchSnapshot();
});
