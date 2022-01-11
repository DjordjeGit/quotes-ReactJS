import React from 'react';

const reducerFuction = (state, action) => {
  if (action.type === 'sending') {
    return {
      data: null,
      status: 'sending',
      error: null,
    };
  }
  if (action.type === 'sent') {
    return {
      data: action.data,
      status: 'sent',
      error: null,
    };
  }
  if (action.type === 'error') {
    return {
      data: null,
      status: 'error',
      error: action.error,
    };
  }
  return state;
};

const useHttp = (requestFunction, isPanding = false) => {
  const [store, dispatch] = React.useReducer(reducerFuction, {
    data: null,
    status: isPanding ? 'sending' : '',
    error: null,
  });
  const sendRequest = React.useCallback(
    async function (requestData) {
      dispatch({ type: 'sending' });
      try {
        const data = await requestFunction(requestData);
        if (!data) {
          throw new Error('Faild to fetch data');
        }
        dispatch({ type: 'sent', data: data });
      } catch (error) {
        dispatch({ type: 'error', error: error.message });
      }
    },
    [requestFunction]
  );
  return {
    sendRequest,
    store,
  };
};

export default useHttp;
