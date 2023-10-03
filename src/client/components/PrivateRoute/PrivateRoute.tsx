import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

const PrivateRoute = ({ route }: { route: JSX.Element}): JSX.Element => {
  const user = useAppSelector(state => state.user);

  if (user.userId !== '') {
    return route;
  } else {
    return <Navigate to='/' />
  }
};

export default PrivateRoute;