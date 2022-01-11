import classes from './AddQuote.module.css';
import { useRef, useState } from 'react';
import { Prompt, useHistory } from 'react-router-dom';
import useHttp from '../http-hook/useHttp';
import { addNewQuote } from '../lib-api/APIs';
import ErrorNotification from '../ui/ErrorNotification';
import LoadingSpinner from '../ui/LoadingSpinner';
const AddQuotes = props => {
  const { sendRequest, store } = useHttp(addNewQuote);
  const [focus, setFocus] = useState(false);
  const history = useHistory();
  const refName = useRef();
  const refText = useRef();
  const handleFocus = () => {
    setFocus(true);
  };

  const sendQuote = e => {
    e.preventDefault();
    const name = refName.current.value;
    const text = refText.current.value;
    if (!name || !text) return;
    sendRequest({ name, text });
    refName.current.value = '';
    refText.current.value = '';
  };
  //////////////////handle store status //////////
  if (store.status === 'sending') {
    return <LoadingSpinner />;
  }
  if (store.status === 'sent') {
    history.push('/allquotes');
  }
  if (store.error != null) {
    return <ErrorNotification message={store.error} />;
  }
  /////////////////////////////////////////////////////////////

  const propmptWhen = focus;
  return (
    <div className={classes.AddQuotes}>
      <Prompt when={propmptWhen} message={`Do you whant to leave!`} />
      <form onSubmit={sendQuote} onFocus={handleFocus}>
        <input type="text" ref={refName} placeholder="Author Name"></input>
        <textarea
          type="text"
          ref={refText}
          placeholder="Quote Text"
          cols="4"
        ></textarea>
        <button type="submit">
          <p>Submit</p>
        </button>
      </form>
    </div>
  );
};
export default AddQuotes;
