import classes from './CommentsItem.module.css';
import useHttp from '../http-hook/useHttp';
import { removeSingleComment } from '../lib-api/APIs';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorNotification from '../ui/ErrorNotification';
const CommentsItem = props => {
  const { sendRequest: removeComment, store: remove } =
    useHttp(removeSingleComment);
  const removeComentHandler = () => {
    props.remove({ id: props.commentsId, commentId: props.id });
    console.log(props.commentsId, props.id, 'Comment');
  };
  if (remove.status === 'sending') {
    return <LoadingSpinner />;
  }
  if (remove.error != null) {
    return <ErrorNotification message={remove.error} />;
  }
  if (true) {
    return (
      <div className={classes.commentsItem}>
        <h3>{props.text}</h3> <p onClick={removeComentHandler}>Remove</p>
      </div>
    );
  }
};
export default CommentsItem;
