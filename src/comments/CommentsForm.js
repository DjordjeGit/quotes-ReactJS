import { useState, useEffect, useRef } from 'react';
import CommentsList from './CommentsList';
import useHttp from '../http-hook/useHttp';
import { getAllComments } from '../lib-api/APIs';
import classes from './CommentsForm.module.css';
import ErrorNotification from '../ui/ErrorNotification';
const CommentsForm = props => {
  const { sendRequest, store } = useHttp(getAllComments);
  const [isfocused, setIsFocused] = useState(true);
  const [sent, setIsSent] = useState(false);
  const refComment = useRef();

  /////////////////focuse and blure handlers////////////////
  const handleBlur = () => {
    if (refComment.current.value == '') {
      setIsFocused(false);
    } else {
      setIsFocused(true);
    }
    if (sent) {
      setIsSent(false);
    }
  };
  const handleFocus = () => {
    setIsFocused(true);
  };

  ///////////////////////////////////////////SEND comment function//////////////////////////////////////
  const handleSendComment = e => {
    e.preventDefault();
    const comment = refComment.current.value;
    if (refComment.current.value === '') {
      return;
    }
    props.sendComment({ id: props.id, text: comment });
    sendRequest(props.id);
    setIsSent(true);
    refComment.current.value = '';
  };
  const validInput = isfocused;
  if (store.status === 'sending') {
    return true;
  }
  /////////////////////////////Error handling/////////////////////////
  if (store.error != null) {
    return <ErrorNotification message={store.error} />;
  }
  return (
    <div>
      <div className={classes.commentsForm}>
        <form onSubmit={handleSendComment}>
          <input
            type="text"
            ref={refComment}
            placeholder="Comment"
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          <button type="submit">
            <p>Send</p>
          </button>
        </form>
        <div className={classes.notification}>
          {!validInput && !sent && <h3>Enter your's comment!</h3>}
        </div>
      </div>
      <CommentsList id={props.id} />
    </div>
  );
};
export default CommentsForm;
