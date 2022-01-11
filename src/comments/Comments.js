import CommentsForm from './CommentsForm';
import useHttp from '../http-hook/useHttp';
import { addNewComment } from '../lib-api/APIs';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorNotification from '../ui/ErrorNotification';
import classes from './Comments.module.css';
import CommentsList from './CommentsList';
const Comments = props => {
  const { sendRequest: sendComments, store } = useHttp(addNewComment, true);
  const sendComment = requestData => {
    sendComments(requestData);
  };
  if (store.status === 'sending') {
    <LoadingSpinner />;
  }
  if (store.error != null) {
    return <ErrorNotification message={store.error} />;
  }
  return (
    <div className={classes.comments}>
      <CommentsForm sendComment={sendComment} id={props.id} />
    </div>
  );
};
export default Comments;
