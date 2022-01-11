import CommentsItem from './CommentsItem';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorNotification from '../ui/ErrorNotification';
import classes from './CommentsList.module.css';
import { useEffect } from 'react';
import useHttp from '../http-hook/useHttp';
import { getAllComments, removeSingleComment } from '../lib-api/APIs';
const CommentsList = props => {
  const { sendRequest, store } = useHttp(getAllComments);
  const { sendRequest: removeComment, store: remove } =
    useHttp(removeSingleComment);
  useEffect(() => {
    sendRequest(props.id, true);
  }, [remove.status]);
  ///////////////////////////////////////////////handle states of HTTP process////////////////////////////////////
  if (store.status === 'sending') {
    return <LoadingSpinner />;
  }
  if (remove.status === 'sending') {
    return <LoadingSpinner />;
  }
  if (store.error != null) {
    return <ErrorNotification message={store.error} />;
  }

  const removeCommentHandler = requestData => {
    removeComment(requestData);
  };
  let comments;
  const ListCss =
    store.status === 'sent' && store.data.length > 0
      ? `${classes.commentList}`
      : '';
  if (store.status === 'sent' || remove.status === 'sent') {
    comments = store.data.map(el => {
      return (
        <li key={el.id}>
          <CommentsItem
            text={el.text}
            id={el.id}
            commentsId={props.id}
            remove={removeCommentHandler}
          />
        </li>
      );
    });
  }
  /////////////////////////////////////////////////////////////HTTP PROCESS//////////////////////////////////////////////////////////////////
  return (
    <div className={ListCss}>
      <ul>{comments}</ul>
    </div>
  );
};
export default CommentsList;
