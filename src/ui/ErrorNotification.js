import classes from './ErrorNotification.module.css';

const ErrorNotification = props => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.notification}>
        <h2>{props.message}</h2>
      </div>
    </div>
  );
};
export default ErrorNotification;
