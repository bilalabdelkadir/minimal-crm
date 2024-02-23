import { createBrowserRouter } from 'react-router-dom';
import App from '../App';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/about',
    element: <h1>About</h1>,
  },
]);

export default Router;
