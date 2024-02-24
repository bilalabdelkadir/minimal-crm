import App from '@/App';
import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './constant';
import SignUp from '@/pages/Auth/signup';
import WorkSpace from '@/pages/workspace';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: ROUTES.SIGN_UP,
    element: <SignUp />,
  },
  {
    path: ROUTES.WORKSPACE,
    element: <WorkSpace />,
  },
]);

export default Router;
