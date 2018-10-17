/* // __mocks__/request.js
import { fetchReportsData } from './__mockData__';

export default function fetchReports(url) {
  return new Promise((resolve, reject) => {
    process.nextTick(
      () =>
        url === 'reporting'
          ? resolve(fetchReportsData)
          : reject({
              error: 'Status 404 Not Found',
            }),
    );
  });
} */

export default {
  get: jest.fn(() => Promise.resolve({ data: {} }))
};