import {
  useParams,
  useRouteMatch,
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';
import { useEffect, useState, useStates } from 'react';
import useHttp from '../http-hook/useHttp';
import { getSingleQoute } from '../lib-api/APIs';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorNotification from '../ui/ErrorNotification';
import classes from './QuoteDetail.module.css';
import Comments from '../comments/Comments';
const QuoteDitail = props => {
  const match = useRouteMatch();
  const params = useParams();
  const [toggle, setToggle] = useState(false);
  const { sendRequest, store } = useHttp(getSingleQoute);
  const toggleComment = () => {
    setToggle(prev => !prev);
  };
  useEffect(() => {
    sendRequest(params.paramsId);
  }, []);
  //////////////////////////////////////////sanding and ger error notification
  if (store.status === 'sending') {
    return <LoadingSpinner />;
  }
  if (store.error != null) {
    return <ErrorNotification message={store.error} />;
  }
  ////////////////////////////////////////////////////////////
  if (store.status === 'sent') {
    return (
      <div className={classes.wrapper}>
        <div className={classes.textContent}>
          <h1>{store.data.text}</h1>
          <div className={classes.author}>
            <p>Author: </p>
            <h3>{store.data.name}</h3>
          </div>
        </div>
        <NavLink to={`${match.url}/comments`} onClick={toggleComment}>
          Comments
        </NavLink>
        <Route path={`${match.url}/comments`} exact>
          {toggle && <Comments id={params.paramsId} />}
        </Route>
      </div>
    );
  }
  return null;
};
export default QuoteDitail;
