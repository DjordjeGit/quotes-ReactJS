import classes from './Quotes.module.css';
import React from 'react';
import QuotesList from './QuotesList';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorNotification from '../ui/ErrorNotification';
import { useEffect } from 'react';
import useHttp from '../http-hook/useHttp';
import { getAllQuotes } from '../lib-api/APIs';
const Quotes = props => {
  const { sendRequest, store } = useHttp(getAllQuotes, true);
  useEffect(() => {
    const timer = setTimeout(() => {
      sendRequest();
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, [sendRequest]);
  ////////////////////////////////////Errror and Loading notification///////////////////////////////
  if (store.status === 'sending') {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }
  if (store.error != null) {
    return <ErrorNotification message={store.error} />;
  }
  /////////////////////////////////////////////////////////
  if (store.data.length == 0 && store.error == null) {
    return <h1 className={classes.emptyQuotes}>Leave your first quote!</h1>;
  }

  let quotesCss = store.data.length == 0 ? null : `${classes.quotes}`;
  return (
    <div className={quotesCss}>
      <QuotesList data={store.data} />
    </div>
  );
};
export default Quotes;
